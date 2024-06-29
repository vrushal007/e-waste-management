import { BadRequestException, ConflictException, Injectable, NotFoundException, Res } from '@nestjs/common';
import { LoginAuthDto, RequestAdminDto, SignUpUserDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import * as bcrypt from 'bcrypt'
import { InjectRepository } from '@nestjs/typeorm';
import { Auth, RequestStatus, Status } from './entities/auth.entity';
import { Repository } from 'typeorm';
import { ResponseBody } from 'src/common/utils/helper';
import { JwtService } from '@nestjs/jwt';
import { Role } from 'src/role/entities/role.entity';
import { RoleEnum } from 'src/common/decorators/roles.decorator';
import { ChangePasswordDto, VerifyAuthDto } from './dto/verify-auth.dto';
import * as crypto from 'crypto'
import moment from 'moment'
import generator from 'generate-password'
import { User } from 'src/users/entities/user.entity';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private readonly authRepository: Repository<Auth>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly mailService : MailService

  ) { }
  // async signUp(payload: SignUpUserDto) {
  //   try {
  //     const { email, password } = payload
  //     const existsUser = await this.authRepository.findOne({ where: { email, status: Status.ACTIVE } })
  //     if (existsUser) throw new ConflictException('User already exists')

  //     // if user don't exists we will create a new user
  //     const hashedPassword = await bcrypt.hash(password, 10)
  //     const newUser = this.authRepository.create({ password: hashedPassword, ...payload })

  //     // find user role
  //     const role = await this.roleRepository.findOne({
  //       where: {
  //         name: RolesEnum.USER
  //       }
  //     })

  //     // assign user role
  //     newUser.roles.push(role)

  //     await this.authRepository.save(newUser)
  //     const response = {
  //       id: newUser.id,
  //       email: newUser.email,
  //       name: newUser.name
  //     }
  //     return new ResponseBody(201, "User Signup successfully", response, true)

  //   } catch (error) {
  //     throw error
  //   }
  // }

  async login(payload: LoginAuthDto) {
    try {
      const { email, password } = payload
      // check if the user exist
      const user = await this.authRepository.findOne({ where: { email, requestStatus: RequestStatus.ACCEPTED } })
      if (!user) throw new NotFoundException('User not found')
      // check if the password is correct
      const isPasswordMatch = await bcrypt.compare(password, user.password)
      if (!isPasswordMatch) throw new BadRequestException('Invalid Credentials')
      // if the password is correct generate tokens
      const { accessToken, refreshToken } = await this.generateJwtTokens({ userId: user.id })
      // update the user wit refresh token
      await this.authRepository.update({ id: user.id }, { refreshToken, isVerified: true })
      const response = {
        ...user,
        accessToken,
        refreshToken
      }
      return new ResponseBody(200, "Login successfully", response, true)

    } catch (error) {
      throw error
    }
  }

  async requestSignUp(payload: RequestAdminDto) {
    try {
      const { email, role } = payload
      const existsUser = await this.authRepository.findOne({ where: { email, status: Status.ACTIVE, isVerified: true } })
      if (existsUser) throw new ConflictException('User already exists')

      // if user don't exits we will send mail to admin for verification
      const generatePassword = this.generateRandomPassword()
      const newUser = this.authRepository.create({ ...payload, password : generatePassword })

      await this.authRepository.save(newUser)
      // send mail to admin
      await this.mailService.sendPasswordMail(email, generatePassword, "")
    } catch (error) {
      console.log(error)
      throw error
    }
  }

  async requestUpadte(id: string, payload: UpdateAuthDto) {
    try {
      const { status } = payload
      // find user
      const user = await this.authRepository.findOne({ where: { id } })
      if (!user) throw new NotFoundException('User not found')
      // update the user
      // check the status
      if (status == RequestStatus.ACCEPTED) {
        
        const { hashedToken, tokenExpiry, unHashedToken } = this.generateVerificationToken()
        const password = this.generateRandomPassword()
        await this.authRepository.update({ id }, { verificationToken: hashedToken, verificationTokenExpires: tokenExpiry, password })
        return new ResponseBody(200, "User request accepted", null, true)
      }


      await this.authRepository.update({ id }, { requestStatus: status })
      return new ResponseBody(200, "User request rejected", null, true)

    } catch (error) {
      throw error
    }
  }

  async verifyToken(token: string, payload: VerifyAuthDto) {
    try {
      const { email } = payload
      // find the user
      const user = await this.authRepository.findOne({ where: { email } })
      if (!user) throw new NotFoundException('User not found')
      // verify the token
      const hashedToken = crypto.createHash('sha256').update(token).digest('hex')
      if (hashedToken !== user.verificationToken) throw new BadRequestException('Invalid token')
      // check the expiry
      if (user.verificationTokenExpires < moment().toDate()) throw new BadRequestException('Token expired')
      // update the user
      await this.authRepository.update({ email }, { isVerified: true, verificationToken: null, verificationTokenExpires: null })
      return new ResponseBody(200, "User verified successfully", null, true)
    } catch (error) {
      throw error
    }
  }

  async changePassword(id: string, payload: ChangePasswordDto) {
    try {
      const { email, oldPassword, password } = payload
      // find the user
      const user = await this.authRepository.findOne({ where: { email } })
      if (!user) throw new NotFoundException('User not found')
      // check the old password
      if (user.password !== oldPassword) throw new BadRequestException('Invalid old password')
      // update the password
      const hashedPassword = await bcrypt.hash(password, 10)
      await this.authRepository.update({ id }, { password: hashedPassword })
      const authUser = await this.authRepository.findOne({
        where: { id: user.id }
      })
      return new ResponseBody(200, "Password changed successfully", authUser, true)

    } catch (error) {
      throw error
    }
  }
  /*---------auth user apis---------*/

  async signUp(payload: SignUpUserDto) {
    try {
      const { password, email, } = payload;

      // Check if the user already exists
      const existingUser = await this.userRepository.findOne({ where: { email } });
      if (existingUser) {
        throw new Error('User with this username or email already exists');
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create the user
      const newUser = this.userRepository.create({
        password: hashedPassword,
        email,
      });

      // Save the user to the database
      await this.userRepository.save(newUser);

      return new ResponseBody(201, "User Signup successfully", null, true);
    } catch (error) {
      console.log(error);
      // Handle errors appropriately
      throw new Error(`Error during sign up: ${error.message}`);
    }

  }

  async userLogin(payload: LoginAuthDto) {
    try {
      const { email, password } = payload;
      // Check if the user exists
      const user = await this.userRepository.findOne({ where: { email }, select: ['password', 'contactDetails', 'id', 'createdAt', 'email'] });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      console.log(user);
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        throw new BadRequestException('Invalid credentials');
      }

      // Generate the tokens
      const { accessToken, refreshToken } = await this.generateJwtTokens({ userId: user.id });
      await this.userRepository.update({ id: user.id }, { refreshToken })
      const response = {
        id: user.id,
        email: user.email,
        contactDetails: user.contactDetails,
        accessToken,
        refreshToken
      }
      return new ResponseBody(200, "Login successfully", response, true);

    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async refreshToken(payload: { refreshToken: string }, userId: string) {
    try {
      const { refreshToken } = payload
      const findUser = await this.userRepository.findOne({ where: { id: userId } })
      if (!findUser) throw new NotFoundException('User not found')
      if (findUser.refreshToken !== refreshToken) throw new BadRequestException('Invalid refresh token')
      const { accessToken } = await this.generateJwtTokens({ userId })
      return new ResponseBody(200, "Token refreshed successfully", { accessToken }, true)
    } catch (error) {
      throw error
    }
  }


  private async generateJwtTokens(payload: { userId: string }) {
    const accessToken = await this.jwtService.signAsync({
      ...payload
    }, { expiresIn: process.env.JWT_ACCESS_EXPIRY, secret: process.env.ACCESS_TOKEN_SECRET })

    const refreshToken = await this.jwtService.signAsync({
      ...payload
    }, { expiresIn: process.env.JWT_REFRESH_EXPIRY, secret: process.env.REFRESH_TOKEN_SECRET })

    return { accessToken, refreshToken }
  }

  private generateVerificationToken() {
    const unHashedToken = crypto.randomBytes(20).toString('hex')
    const hashedToken = crypto.createHash('sha256').update(unHashedToken).digest('hex')
    const tokenExpiry = moment().add(1, 'hours').toDate()
    return { hashedToken, tokenExpiry, unHashedToken }
  }

  private generateRandomPassword(length: number = 12) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';
    let password = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      password += characters[randomIndex];
    }
    return password;
  }
}

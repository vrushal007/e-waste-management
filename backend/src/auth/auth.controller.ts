import { Controller, Get, Post, Body, Patch, Param, Delete, UseFilters, Query, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto, RequestAdminDto, SignUpUserDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { ExceptionHandling } from 'src/common/utils/helper';
import { ApiTags } from '@nestjs/swagger';
import { ChangePasswordDto, VerifyAuthDto } from './dto/verify-auth.dto';

@UseFilters(ExceptionHandling)
@Controller('auth-user')
@ApiTags('auth user apis')
export class AuthUserController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  login(@Body() payload: LoginAuthDto) {
    return this.authService.login(payload);
  }

  // @Get()
  // findAll() {
  //   return this.authService.findAll();
  // }

  // request admin as recycler or collector for admin
  @Post('request-signup')
  requestSignUp(@Body() payload: RequestAdminDto) {
    return this.authService.requestSignUp(payload);
  }

  @Patch('request/:id')
  requestUpdate(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.requestUpadte(id, updateAuthDto);
  }
  // create auth user api
  @Get('verify-token')
  create(@Query('token') token: string, @Body() payload: VerifyAuthDto) {
    return this.authService.verifyToken(token, payload);
  }

  @Patch('change-password/:id')
  changePassword(@Param('id') id: string, @Body() payload: ChangePasswordDto) {
    return this.authService.changePassword(id, payload);
  }
  
  @Post('refresh-token')
  refreshToken(@Body() payload : { refreshToken : string}, @Req() request : Request) {
    return this.authService.refreshToken(payload, request['user'].userId);
  }
}

// for users
@ApiTags('auth apis')
@UseFilters(ExceptionHandling)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('sign-up')
  signUp(@Body() payload: SignUpUserDto) {
    return this.authService.signUp(payload);
  }

  @Post('login')
  login(@Body() payload: LoginAuthDto) {
    return this.authService.userLogin(payload);
  }

  @Post('refresh-token')
  refreshToken(@Body() payload : { refreshToken : string}, @Req() request : Request) {
    return this.authService.refreshToken(payload, request['user'].userId);
  }
}

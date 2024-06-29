// mail.service.ts
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.your-email-provider.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: '', // your email address
        pass: '', // your email password
      },
    });
  }

  async sendPasswordMail(to: string, password: string, frontendLink: string): Promise<void> {
    const mailOptions = {
      from: '"Your App Name" <your-email@example.com>',
      to,
      subject: 'Your Auto-Generated Password',
      html: `<p>Dear User,</p>
             <p>Your account has been created. Here is your auto-generated password:</p>
             <p><strong>${password}</strong></p>
             <p>You can login using the following link: <a href="${frontendLink}">${frontendLink}</a></p>
             <p>Best regards,<br>Your App Team</p>`,
    };

    await this.transporter.sendMail(mailOptions);
  }
}

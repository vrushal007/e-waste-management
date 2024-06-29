import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports : [AuthModule],
  providers: [MailService],
  exports : [MailService]
})
export class MailModule {}

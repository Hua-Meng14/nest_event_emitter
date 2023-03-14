import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

class RegisterDto {
  email: string;
  password: string;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/register')
  async register(@Body() registerBody: RegisterDto): Promise<void> {
    return this.appService.register(registerBody);
  }
}

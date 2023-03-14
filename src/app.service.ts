import { Injectable, Logger } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';

class RegisterDto {
  email: string;
  password: string;
}

class UserRegisteredEvent {
  constructor(public readonly userId: string, public readonly email: string) { }
}

@Injectable()
export class AppService {

  constructor(private readonly eventEmitter: EventEmitter2) { }
  private readonly logger = new Logger(AppService.name);

  getHello(): string {
    return 'Hello World!';
  }

  async register(payload: RegisterDto): Promise<void> {
    this.logger.log('Registering user ...', payload);
    await new Promise<void>((resolve) => setTimeout(() => resolve(), 5000));
    this.eventEmitter.emit(
      'new_registered_user',
      new UserRegisteredEvent('12345', payload.email),
    );
  }

  @OnEvent('new_registered_user', { async: true })
  async sendWWelcomeEmail(payload: UserRegisteredEvent) {
    this.logger.log('Sending mail to welcome new user', payload.email);
    await new Promise<void>((resolve) => setTimeout(() => resolve(), 3000));
    this.logger.log('Mail sent to new user', payload.email);
  }
}

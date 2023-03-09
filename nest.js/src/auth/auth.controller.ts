import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { registerDto } from './dto';
import { JoiValidationPipe } from './validation/joi.validation.pipe';
import { registerValidation } from './validation/register.validation';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/register')
  @HttpCode(HttpStatus.CREATED)
  async registerUser(
    @Body(new JoiValidationPipe(registerValidation)) body: registerDto,
  ) {
    return await this.authService.registerUser(body);
  }
  @Post('login')
  async loginUser(@Body() body) {
    return this.authService.loginUser(body);
  }
}

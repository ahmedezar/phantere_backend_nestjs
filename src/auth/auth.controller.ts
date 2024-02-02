import {
  Body,
  Controller,
  Get,
  Param,
  Delete,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() signUpDto: SignUpDto): Promise<{ token: string }> {
    return this.authService.signUp(signUpDto);
  }

  @Post('/login')
  login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
    return this.authService.login(loginDto);
  }
  @Get('/user/:id')
  getUserById(@Param('id', ParseIntPipe) id: number): Promise<any> {
    // Your logic to fetch user by ID from the AuthService
    return this.authService.getUserById(id);
  }

  @Get('/users')
  getAllUsers(): Promise<any[]> {
    // Your logic to fetch all users from the AuthService
    return this.authService.getAllUsers();
  }
  @Delete('/user/:id')
  deleteUserById(@Param('id') id: string): Promise<void> {
    // Your logic to delete the user by ID from the AuthService
    return this.authService.deleteUserById(id);
  }
}

import {
  Body,
  Controller,
  Get,
  Param,
  Delete,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';
import { UpdateUserDto } from './dto/update-user.dto';

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
  getUserById(@Param('id', ParseIntPipe) id: string): Promise<any> {
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

  @Put('/user/:id') // Use the PUT HTTP method for updating
  updateUserById(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateUserDto: UpdateUserDto, // Use your DTO for updating a user
  ): Promise<void> {
    // Your logic to update the user by ID from the AuthService
    return this.authService.updateUserById(id, updateUserDto);
  }
}

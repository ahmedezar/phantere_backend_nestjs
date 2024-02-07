import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { User } from './schemas/user.schema';

import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { UpdateUserDto } from './dto/update-user.dto';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<{ token: string }> {
    const { name, surname, email, password } = signUpDto;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userModel.create({
      name,
      surname,
      email,
      password: hashedPassword,
    });

    const token = this.jwtService.sign({ id: user._id });

    return { token };
  }

  async login(loginDto: LoginDto): Promise<{ token: string }> {
    const { email, password } = loginDto;

    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const token = this.jwtService.sign({ id: user._id });

    return { token };
  }

  async getUserById(id: string): Promise<any> {
    // Your logic to fetch the user by ID from the database or any other source
    // For example, you might have a UserRepository or a database service to handle this
    const user = await this.userModel.findById(id);

    // Return the user data or handle the case where the user is not found
    if (user) {
      return user;
    } else {
      throw new NotFoundException('User not found');
    }
  }
  async getAllUsers(): Promise<any[]> {
    const users = await this.userModel.find();

    // Return the array of users
    return users;
  }

  async deleteUserById(id: string): Promise<void> {
    // Ensure id is defined and valid ObjectId before proceeding
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid user id');
    }
    try {
      // Use the id in your MongoDB query
      await this.userModel.findByIdAndDelete(id).exec();
    } catch (error) {
      // Handle any other errors
      throw new InternalServerErrorException('Error deleting user');
    }
  }

  async updateUserById(id: string, updateUserDto: UpdateUserDto): Promise<any> {
    // Your logic to update the user by ID
    const user = await this.userModel.findById(id);
    return user;
    // Use the provided DTO fields to update the user's information
  }
}

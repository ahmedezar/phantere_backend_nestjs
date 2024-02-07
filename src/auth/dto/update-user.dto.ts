import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;
  @IsNotEmpty()
  @IsString()
  readonly surname: string;
  @IsNotEmpty()
  @IsEmail({}, { message: 'Please enter correct email' })
  readonly email: string;
  @IsString()
  @IsOptional()
  readonly adresse: string;
  @IsString()
  @IsOptional()
  readonly city: string;
  @IsString()
  @IsOptional()
  readonly country: string;
  @IsString()
  @IsOptional()
  readonly postalcode?: string;

  @IsString()
  @IsOptional()
  readonly about: string;
}

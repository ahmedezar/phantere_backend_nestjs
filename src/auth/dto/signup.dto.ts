import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignUpDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly surname: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'Please enter correct email' })
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  readonly password: string;
  @IsString()
  readonly adresse: string;
  @IsString()
  readonly city: string;
  @IsString()
  readonly country: string;
  @IsString()
  readonly postalcode: string;
  @IsString()
  readonly about: string;
}

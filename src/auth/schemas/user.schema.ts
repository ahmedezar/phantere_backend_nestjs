import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
})
export class User extends Document {
  @Prop()
  name: string;
  @Prop()
  surname: string;
  @Prop({ unique: [true, 'Duplicate email entered'] })
  email: string;

  @Prop()
  password: string;
  @Prop()
  adresse: string;
  @Prop()
  city: string;
  @Prop()
  country: string;
  @Prop()
  postalcode: string;
  @Prop()
  about: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

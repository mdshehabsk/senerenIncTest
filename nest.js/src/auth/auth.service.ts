import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schema/user.schema';
import { registerDto } from './dto';
import { sign } from 'jsonwebtoken';
@Injectable()
export class AuthService {
  constructor(@InjectModel('User') private readonly User: Model<User>) {}

  async registerUser(body: registerDto) {
    const { name, email, password, cpassword } = body;
    const exist = await this.User.findOne({ email });
    if (exist) {
      throw new BadRequestException('user is already exist');
    }
    await new this.User({
      name,
      email,
      password,
    }).save();
    return {
      message: 'register successfull',
    };
  }
  async loginUser(body: { email: string; password: string }) {
    const { email, password } = body;
    if (!email || !password) {
      throw new BadRequestException('please fill all field');
    }
    const exist = await this.User.findOne({ email });
    if (!exist) {
      throw new BadRequestException('Credential wrong');
    }
    const match = exist.password === password;
    if (!match) {
      throw new BadRequestException('Credential wrong');
    }
    const token = sign(
      { id: exist._id, name: exist.name, email: exist.email, role: exist.role },
      process.env.JWT_SECRET,
      { expiresIn: '4d' },
    );
    return {
      message: 'login successfull',
      token,
    };
  }
  async userInfo(userId) {
    return await this.User.findById(userId);
  }
}

/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ResetPasswordDto } from './dto/resetPassword.dto';
import { SignInDto } from './dto/auth.dto';
import {
  ConflictException,
  HttpException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateAuthDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { Users } from './../users/interfaces/user.interface';
import { MailerService } from '@nestjs-modules/mailer';
import { Model } from 'mongoose';
import { ForgetPasswordDto } from './dto/forgetPassword.dto';
import { htmlMessage } from '../utils/htmlMessage';
@Injectable()
export class AuthService {
  constructor(
    @Inject('USERS_MODEL')
    private readonly usersModel: Model<Users>,
    private readonly jwtService: JwtService,
    private readonly mailService: MailerService,
  ) {}
  async signup(createAuthDto: CreateAuthDto, res: any) {
    try {
      const user = await this.usersModel.create({
        ...createAuthDto,
        role: 'User',
      });

      const { password, ...userWithoutPassword } = user.toObject();
      const payload = {
        _id: user._id,
        email: user.email,
        role: user.role,
      };
      const token = await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET,
      });
      res.cookie('token', token, {
        httpOnly: true,
        secure: false, // localhost
        sameSite: 'lax', // ✅ الصح
        maxAge: 7 * 24 * 60 * 60 * 1000,
        path: '/',
      });
      return {
        access_token: token,
        status: 200,
        message: 'User created successfully',
        data: userWithoutPassword,
      };
    } catch (err: any) {
      if (err?.code === 11000) {
        throw new ConflictException('Email already exists');
      }
      throw new InternalServerErrorException(err?.message);
    }
  }

  async login(signInDto: SignInDto, res: any) {
    const user: any = await this.usersModel
      .findOne({ email: signInDto.email })
      .select('+password');
    if (!user) {
      throw new HttpException(
        {
          status: 404,
          error: 'User not found',
        },
        404,
      );
    }
    const isMatch = await bcrypt.compare(signInDto.password, user.password);
    if (!isMatch) {
      throw new HttpException(
        {
          status: 404,
          error: 'Email or Password is uncorrect',
        },
        404,
      );
    }
    const { password, ...userWithoutPassword } = user._doc;
    const payload = {
      _id: user._id,
      email: user.email,
      role: user.role,
    };
    const token = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '90d',
    });

    res.cookie('token', token, {
      httpOnly: true,
      secure: false, // localhost
      sameSite: 'lax', // ✅ الصح
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: '/',
    });

    return {
      access_token: token,
      status: 200,
      data: userWithoutPassword,
    };
  }

  async forgetPassword(email: ForgetPasswordDto) {
    const user = await this.usersModel.findOne(email);
    if (!user) {
      throw new NotFoundException('Not found User with this mail');
    }
    const code = Math.floor(Math.random() * 1000000)
      .toString()
      .padStart(6, '0');
    const html = htmlMessage(code);
    await this.mailService.sendMail({
      from: 'Restaurant NestJS <abdoelsaeed290@gmail.com>',
      to: email.email,
      subject: 'Reset Password',
      html: html,
    });
    const hashedCode = await bcrypt.hash(code, 10);
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 10);
    await this.usersModel.findOneAndUpdate(
      { email: email.email },
      { verification_Code: hashedCode, codeExpiresAt: expiresAt },
    );
    return {
      status: 200,
      message: `Code sent successfully on your email < ${email.email} >`,
    };
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const { email, verification_Code, newPassword } = resetPasswordDto;
    const user = await this.usersModel
      .findOne({ email })
      .select('+verification_Code +codeExpiresAt +password');
    if (!user) throw new NotFoundException('Not found User with this mail');
    if (!user.codeExpiresAt) {
      throw new HttpException(
        'Verification code expiration date is missing',
        400,
      );
    }

    if (new Date() > user.codeExpiresAt) {
      throw new HttpException('Verification code has expired', 400);
    }
    if (!user.verification_Code) {
      throw new HttpException('Verification code is missing', 400);
    }
    const isCodeValid = await bcrypt.compare(
      verification_Code,
      user.verification_Code,
    );
    if (!isCodeValid) {
      throw new HttpException('Invalid verification code', 400);
    }
    // Set plain password - the pre-save hook in user.schema.ts will hash it automatically
    user.password = newPassword;
    user.verification_Code = undefined;
    user.codeExpiresAt = undefined;
    await user.save({ validateBeforeSave: false });
    return {
      status: 200,
      message: 'Password reset successfully',
    };
  }

  async getMe(payload: any) {
    const user = await this.usersModel
      .findById(payload._id)
      .select('-__v -password');
    if (!user) {
      throw new HttpException(
        {
          status: 401,
          error: 'User not found',
        },
        401,
      );
    }
    return {
      status: 200,
      message: 'User found successfully',
      data: user,
    };
  }
}

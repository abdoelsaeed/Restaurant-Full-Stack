/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Controller,
  Post,
  Body,
  HttpException,
  Patch,
  Get,
  Req,
  UseGuards,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto, SignInDto } from './dto/auth.dto';
import { ForgetPasswordDto } from './dto/forgetPassword.dto';
import { ResetPasswordDto } from './dto/resetPassword.dto';
import { AuthGuard } from 'src/guard/Auth.guard';
import { Roles } from 'src/guard/user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  create(
    @Body() createAuthDto: CreateAuthDto,
    @Res({ passthrough: true }) res: any,
  ) {
    if (!createAuthDto.password) {
      throw new HttpException(
        {
          status: 404,
          error: 'You must put password',
        },
        404,
      );
    }
    return this.authService.signup(createAuthDto, res);
  }

  @Post('login')
  login(@Body() signInDto: SignInDto, @Res({ passthrough: true }) res: any) {
    return this.authService.login(signInDto, res);
  }

  @Patch('forgetpassword')
  forgetPassword(@Body() email: ForgetPasswordDto) {
    return this.authService.forgetPassword(email);
  }

  @Patch('resetpassword')
  resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(resetPasswordDto);
  }

  @UseGuards(AuthGuard)
  @Roles(['User', 'Admin'])
  @Get('me')
  getMe(@Req() req: any) {
    return this.authService.getMe(req.user);
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) res: any) {
    res.clearCookie('token', {
      httpOnly: true,
      secure: false, // نفس القيمة اللي في login/signup
      sameSite: 'lax', // ✅ لازم نفس القيمة اللي في login/signup
      path: '/',
    });
    return {
      message: 'successfully Logout',
      status: 200,
    };
  }
}

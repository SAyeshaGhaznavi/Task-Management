import {Controller,Post,Body,Res,Req,UnauthorizedException, HttpCode, HttpStatus, BadRequestException} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response, Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() body: any, @Res() res: Response) {
    const { email, password } = body;
    const user = await this.authService.validateUser(email, password);
    console.log("User: ", user);

    const tokens = await this.authService.login(user);

    res.cookie('refresh_token', tokens.refresh_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({ refresh_token: tokens.refresh_token, user: user, access_token: tokens.access_token });
  }

    @Post('register')
    async register(@Body() body: any, @Res() res: Response) {
    const { user_name, email, password, phone } = body;

    if (!user_name || !email || !password) {
      throw new BadRequestException('Missing required fields');
    }

    const user = await this.authService.register({
      user_name,
      email,
      password,
      phone,
    });

    const tokens = await this.authService.login(user);

    res.cookie('refresh_token', tokens.refresh_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({ access_token: tokens.access_token, user });
  }

  @Post('refresh')
  async refresh(@Req() req: Request, @Res() res: Response) {
    const token = req.cookies?.refresh_token;
    if (!token) throw new UnauthorizedException('No refresh token found');

    const newAccessToken = await this.authService.refreshAccessToken(token);

    return res.json({ access_token: newAccessToken });
  }

  @Post('logout')
  async logout(@Res() res: Response) {
    res.clearCookie('refresh_token');
    return res.json({ message: 'Logged out' });
  }
}
import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    //const user_id=await this.usersService.findOne(email);
    const user = await this.usersService.findOne(email);
    if (user && user.password === password) {
      return user;
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.user_id };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: '15m',
    });

    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '7d',
    });

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

    async register(data: {
    user_name: string;
    email: string;
    password: string;
    phone: string;
  }) {
    const existingUser = await this.usersService.findOne(data.email);
    if (existingUser) {
      throw new BadRequestException('User with this email already exists');
    }

    const newUser = await this.usersService.create({
      user_name: data.user_name,
      email: data.email,
      password: data.password, // not hashed
      phone: data.phone,
    });

    return newUser;
  }

  async refreshAccessToken(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken);
      const user = await this.usersService.findOne(payload.sub);
      if (!user) throw new UnauthorizedException();

      const newAccessToken = this.jwtService.sign(
        { username: user.user_name, sub: user.user_id },
        { expiresIn: '15m' },
      );

      return newAccessToken;
    } catch (err) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }
  }
}

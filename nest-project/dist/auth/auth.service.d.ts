import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(email: string, password: string): Promise<{
        user_id: number;
        user_name: string | null;
        password: string | null;
        phone: string | null;
        email: string;
    }>;
    login(user: any): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    register(data: {
        user_name: string;
        email: string;
        password: string;
        phone: string;
    }): Promise<{
        user_id: number;
        user_name: string | null;
        password: string | null;
        phone: string | null;
        email: string;
    }>;
    refreshAccessToken(refreshToken: string): Promise<string>;
}

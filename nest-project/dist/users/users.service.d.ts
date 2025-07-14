import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createUserDto: CreateUserDto): Promise<{
        user_id: number;
        user_name: string | null;
        password: string | null;
        phone: string | null;
        email: string;
    }>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        user_id: number;
        user_name: string | null;
        password: string | null;
        phone: string | null;
        email: string;
    }[]>;
    findInvited(emailid: string): Promise<{
        user_id: number;
        user_name: string | null;
        password: string | null;
        phone: string | null;
        email: string;
    } | null | undefined>;
    findByEmail(email: string): import(".prisma/client").Prisma.Prisma__UsersClient<{
        user_id: number;
        user_name: string | null;
        password: string | null;
        phone: string | null;
        email: string;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    findOne(identifier: number | string): import(".prisma/client").Prisma.Prisma__UsersClient<{
        user_id: number;
        user_name: string | null;
        password: string | null;
        phone: string | null;
        email: string;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    update(id: number, updateUserDto: UpdateUserDto): import(".prisma/client").Prisma.Prisma__UsersClient<{
        user_id: number;
        user_name: string | null;
        password: string | null;
        phone: string | null;
        email: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    remove(id: number): import(".prisma/client").Prisma.Prisma__UsersClient<{
        user_id: number;
        user_name: string | null;
        password: string | null;
        phone: string | null;
        email: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
declare class invitedMember {
    email: string;
}
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<{
        user_id: number;
        user_name: string | null;
        password: string | null;
        phone: string | null;
        email: string;
    }>;
    findInvited(findId: invitedMember): Promise<{
        user_id: number;
        user_name: string | null;
        password: string | null;
        phone: string | null;
        email: string;
    } | null | undefined>;
    getUserByEmail(email: string): Promise<{
        user_id: number;
        user_name: string | null;
        password: string | null;
        phone: string | null;
        email: string;
    } | null>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        user_id: number;
        user_name: string | null;
        password: string | null;
        phone: string | null;
        email: string;
    }[]>;
    findOne(id: string): import(".prisma/client").Prisma.Prisma__UsersClient<{
        user_id: number;
        user_name: string | null;
        password: string | null;
        phone: string | null;
        email: string;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    update(id: string, updateUserDto: UpdateUserDto): import(".prisma/client").Prisma.Prisma__UsersClient<{
        user_id: number;
        user_name: string | null;
        password: string | null;
        phone: string | null;
        email: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__UsersClient<{
        user_id: number;
        user_name: string | null;
        password: string | null;
        phone: string | null;
        email: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
export {};

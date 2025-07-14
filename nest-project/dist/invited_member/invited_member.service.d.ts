import { PrismaService } from '../prisma/prisma.service';
import { CreateInvitedMemberDto } from './dto/create-invited_member.dto';
import { UpdateInvitedMemberDto } from './dto/update-invited_member.dto';
export declare class InvitedMemberService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createInvitedMemberDto: CreateInvitedMemberDto): Promise<{
        invited_id: number;
        invited_by_id: number;
        status: string;
        user_email: string;
    }>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        invited_id: number;
        invited_by_id: number;
        status: string;
        user_email: string;
    }[]>;
    findOne(id: number): import(".prisma/client").Prisma.Prisma__invited_memberClient<{
        invited_id: number;
        invited_by_id: number;
        status: string;
        user_email: string;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    update(id: number, updateInvitedMemberDto: UpdateInvitedMemberDto, user_id: number): import(".prisma/client").Prisma.Prisma__invited_memberClient<{
        invited_id: number;
        invited_by_id: number;
        status: string;
        user_email: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    remove(id: number): import(".prisma/client").Prisma.Prisma__invited_memberClient<{
        invited_id: number;
        invited_by_id: number;
        status: string;
        user_email: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}

import { InvitedMemberService } from './invited_member.service';
import { CreateInvitedMemberDto } from './dto/create-invited_member.dto';
import { UpdateInvitedMemberDto } from './dto/update-invited_member.dto';
import { Request } from 'express';
export declare class InvitedMemberController {
    private readonly invitedMemberService;
    constructor(invitedMemberService: InvitedMemberService);
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
    findOne(id: string): import(".prisma/client").Prisma.Prisma__invited_memberClient<{
        invited_id: number;
        invited_by_id: number;
        status: string;
        user_email: string;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    update(id: string, updateInvitedMemberDto: UpdateInvitedMemberDto, req: Request): import(".prisma/client").Prisma.Prisma__invited_memberClient<{
        invited_id: number;
        invited_by_id: number;
        status: string;
        user_email: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__invited_memberClient<{
        invited_id: number;
        invited_by_id: number;
        status: string;
        user_email: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}

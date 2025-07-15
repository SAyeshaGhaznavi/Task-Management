import { CompanyMembersService } from './company_members.service';
import { CreateCompanyMemberDto } from './dto/create-company_member.dto';
import { UpdateCompanyMemberDto } from './dto/update-company_member.dto';
import { Request } from 'express';
export declare class CompanyMembersController {
    private readonly companyMembersService;
    constructor(companyMembersService: CompanyMembersService);
    create(createCompanyMemberDto: CreateCompanyMemberDto): Promise<{
        company_id: number;
        user_id: number;
        user_role: string;
    }>;
    remove(company_id: string, user_id: string, req: Request): Promise<{
        company_id: number;
        user_id: number;
        user_role: string;
    }>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        company_id: number;
        user_id: number;
        user_role: string;
    }[]>;
    findByCompany(company_id: string): Promise<{
        user_id: number;
        user_name: string | null;
        password: string | null;
        phone: string | null;
        email: string;
    }[]>;
    findOne(company_id: string, user_id: string): import(".prisma/client").Prisma.Prisma__company_membersClient<{
        company_id: number;
        user_id: number;
        user_role: string;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    findCompany(user_id: string): Promise<{
        company_id: number;
        company_name: string;
        company_location: string | null;
        owner_id: number | null;
    }[]>;
    update(company_id: string, user_id: string, updateDto: UpdateCompanyMemberDto, req: Request): Promise<{
        company_id: number;
        user_id: number;
        user_role: string;
    }>;
}

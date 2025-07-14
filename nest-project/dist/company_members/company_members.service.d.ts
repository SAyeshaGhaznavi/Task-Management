import { PrismaService } from '../prisma/prisma.service';
import { CreateCompanyMemberDto } from './dto/create-company_member.dto';
import { UpdateCompanyMemberDto } from './dto/update-company_member.dto';
export declare class CompanyMembersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createCompanyDto: CreateCompanyMemberDto): Promise<{
        company_id: number;
        user_id: number;
        user_role: string;
    }>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        company_id: number;
        user_id: number;
        user_role: string;
    }[]>;
    findOne(company_id: number, user_id: number): import(".prisma/client").Prisma.Prisma__company_membersClient<{
        company_id: number;
        user_id: number;
        user_role: string;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    update(company_id: number, user_id: number, updateDto: UpdateCompanyMemberDto): import(".prisma/client").Prisma.Prisma__company_membersClient<{
        company_id: number;
        user_id: number;
        user_role: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    remove(company_id: number, user_id: number): import(".prisma/client").Prisma.Prisma__company_membersClient<{
        company_id: number;
        user_id: number;
        user_role: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    isAdminOfCompany(userId: number, companyId: number): Promise<boolean>;
    findByCompany(company_id: string): Promise<{
        user_id: number;
        user_name: string | null;
        password: string | null;
        phone: string | null;
        email: string;
    }[]>;
    findCompany(userId: number): Promise<{
        company_id: number;
        company_name: string;
        company_location: string | null;
        owner_id: number | null;
    }[]>;
}

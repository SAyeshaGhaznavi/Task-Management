import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
export declare class CompanyController {
    private readonly companyService;
    constructor(companyService: CompanyService);
    create(createCompanyDto: CreateCompanyDto): Promise<{
        company_id: number;
        company_name: string;
        company_location: string | null;
        owner_id: number | null;
    }>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        company_id: number;
        company_name: string;
        company_location: string | null;
        owner_id: number | null;
    }[]>;
    findOne(id: string): import(".prisma/client").Prisma.Prisma__CompanyClient<{
        company_id: number;
        company_name: string;
        company_location: string | null;
        owner_id: number | null;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    update(id: string, updateCompanyDto: UpdateCompanyDto): import(".prisma/client").Prisma.Prisma__CompanyClient<{
        company_id: number;
        company_name: string;
        company_location: string | null;
        owner_id: number | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__CompanyClient<{
        company_id: number;
        company_name: string;
        company_location: string | null;
        owner_id: number | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}

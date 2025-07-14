import { CreateCompanyDto } from './create-company.dto';
declare const UpdateCompanyDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateCompanyDto>>;
export declare class UpdateCompanyDto extends UpdateCompanyDto_base {
    company_name?: string | undefined;
    company_location?: string | undefined;
}
export {};

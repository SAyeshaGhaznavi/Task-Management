import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
//import { CreateCompanyMemberDto } from 'src/company_members/dto/create-company_member.dto';
import { CompanyMembersService } from 'src/company_members/company_members.service';
//import { CompanyMembersService } from './company_members.service';

class CreateCompanyMemberDto {
    company_id:number;
    user_id:number;
    user_role:string;
}


@Injectable()
export class CompanyService {
  constructor(private readonly prisma: PrismaService) {}

  // async create(createCompanyDto: CreateCompanyDto) {
  //   const company=await this.prisma.company.create({ 
  //     data: createCompanyDto,
  //   });
    
  //   const companymember:CreateCompanyMemberDto={company_id:company.company_id, user_id: company.owner_id, user_role: 'ADMIN'};
    
  //   this.prisma.company_members.create(companymember);

  //   return company;
  // }

  async create(createCompanyDto: CreateCompanyDto) {
    const company = await this.prisma.company.create({ 
      data: createCompanyDto,
    });
    const companyMembers: CreateCompanyMemberDto = {
      company_id: company.company_id,
      user_id: company.owner_id!,
      user_role: 'ADMIN',
    };

    try {
      await this.prisma.company_members.create({data : companyMembers});
    } catch (error) {
      console.log("Failed to post company member");
    }

    return company;
  }


  findAll() {
    return this.prisma.company.findMany();
  }

  findOne(id: number) {
    return this.prisma.company.findUnique({ where: { company_id:id } });
  }

  update(id: number, updateUserDto: UpdateCompanyDto) {
    return this.prisma.company.update({
      where: { company_id:id },
      data: updateUserDto,
    });
  }

  remove(id: number) {
    return this.prisma.company.delete({ where: { company_id:id } });
  }
}

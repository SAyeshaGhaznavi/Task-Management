import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCompanyMemberDto } from './dto/create-company_member.dto';
import { UpdateCompanyMemberDto } from './dto/update-company_member.dto';

@Injectable()
export class CompanyMembersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCompanyDto: CreateCompanyMemberDto) {
    return this.prisma.company_members.create({ 
      data: createCompanyDto,
    });
  }

  findAll() {
    return this.prisma.company_members.findMany();
  }

  findOne(company_id: number, user_id: number) {
  return this.prisma.company_members.findUnique({
    where: {
        company_id_user_id: {
        company_id,
        user_id,
      },
    },
  });
  
}

  update(company_id: number, user_id: number, updateDto: UpdateCompanyMemberDto) {
  return this.prisma.company_members.update({
    where: {
      company_id_user_id: {
        company_id,
        user_id,
      },
    },
    data: updateDto,
  });
}

  remove(company_id: number, user_id: number) {
    return this.prisma.company_members.delete({
    where: {
      company_id_user_id: {
        company_id,
        user_id,
      },
    },
  });
  }

  async isAdminOfCompany(userId: number, companyId: number): Promise<boolean> {
  const member = await this.prisma.company_members.findFirst({
    where: {
      user_id: userId,
      company_id: companyId,
      user_role: 'ADMIN', 
    },
  });
  //console.log("Member: ", member);
  return !!member;
}

  async findByCompany(company_id: string) {
    const userCompany = await this.prisma.company_members.findMany({
    where: {
      company_id: Number(company_id),
    },
  });

  const userIds = userCompany.map((up) => up.user_id);

  const users = await this.prisma.users.findMany({
    where: {
      user_id: { in: userIds },
    },
  });

  console.log('Users by company: ',users);

  return users;
  }


  async findCompany(userId: number) {
  const userCompany = await this.prisma.company_members.findMany({
    where: {
      user_id: userId,
    },
  });

  const companyIds = userCompany.map((up) => up.company_id);

  const companies = await this.prisma.company.findMany({
    where: {
      company_id: { in: companyIds },
    },
  });

  return companies;
}

}

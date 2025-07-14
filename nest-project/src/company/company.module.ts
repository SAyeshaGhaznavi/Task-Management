import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { CompanyMembersService } from 'src/company_members/company_members.service';

@Module({
  controllers: [CompanyController],
  providers: [CompanyService],
  //: [ CompanyMembersService ]
})
export class CompanyModule {}

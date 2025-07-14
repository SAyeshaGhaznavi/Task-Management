import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, Query } from '@nestjs/common';
import { InvitedMemberService } from './invited_member.service';
import { CreateInvitedMemberDto } from './dto/create-invited_member.dto';
import { UpdateInvitedMemberDto } from './dto/update-invited_member.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request } from 'express';

@Controller('invited-member')
export class InvitedMemberController {
  constructor(private readonly invitedMemberService: InvitedMemberService) {}

  @Post()
  create(@Body() createInvitedMemberDto: CreateInvitedMemberDto) {
    return this.invitedMemberService.create(createInvitedMemberDto);
  }

  
  @Get()
  findAll() {
    return this.invitedMemberService.findAll();
  }
  
  // @Get('/invited')
  // findInvited(@Query() email:string) {
  //   return this.invitedMemberService.findInvited(email);
  // }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.invitedMemberService.findOne(+id);
  }

  // @Get(':invited_id/:invited_by_id')
  // find(
  //   @Param('company_id') company_id: string,
  //   @Param('user_id') user_id: string,
  // ) {
  //   return this.companyMembersService.findOne(+company_id, +user_id);
  // }


  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateInvitedMemberDto: UpdateInvitedMemberDto,
    @Req() req: Request,
  ) {
    const user = req.user as any;
    return this.invitedMemberService.update(+id, updateInvitedMemberDto, user.userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.invitedMemberService.remove(+id);
  }
}

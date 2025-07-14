import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
//import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request } from 'express';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectService.create(createProjectDto);
  }

  @Get()
  findAll() {
    return this.projectService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectService.findOne(+id);
  }

  // @Get('find/by-company/:company_id')
  // findProjectsByCompany(
  //   @Param('project_id') project_id: string,
  //   @Param('company_id') company_id: string,
  // ) {
  //   return this.projectService.findProjects(+company_id);
  // }


  @Get(':project_id/:company_id')
  findProjects(
    @Param('project_id') project_id: string,
    @Param('company_id') company_id: string,
  ) {
    return this.projectService.findProjects(+company_id);
  }

  //@UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string, 
    @Body() updateProjectDto: UpdateProjectDto, 
    @Req() req: Request,
  ) 
    {
    const user = req.user as any;
    return this.projectService.update(+id, updateProjectDto, user.userId);
  }

  //@UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(
    @Param('id') id: string,
    @Req() req: Request,
  ) {
    const user = req.user as any;
    return this.projectService.remove(+id, user.userId);
  }
}

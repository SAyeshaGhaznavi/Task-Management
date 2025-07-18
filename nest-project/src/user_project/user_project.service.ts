import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserProjectDto } from './dto/create-user_project.dto';
import { UpdateUserProjectDto } from './dto/update-user_project.dto';

@Injectable()
export class UserProjectService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserProjectDto: CreateUserProjectDto) {
  const { user_id, project_id } = createUserProjectDto;

  const project = await this.prisma.project.findUnique({
    where: { project_id: project_id },
    select: { company_id: true },
  });

  if (!project) {
    throw new Error('Project not found');
  }

  const member = await this.prisma.company_members.findFirst({
    where: {
      user_id: user_id,
      company_id: project.company_id,
    },
  });

  if (!member) {
    throw new Error('User is not part of the same company as the project');
  }
  return this.prisma.user_project.create({ 
    data: createUserProjectDto,
  });
}


  findAll() {
    return this.prisma.user_project.findMany();
  }

  findOne(project_id: number, user_id: number) {
  return this.prisma.user_project.findUnique({
    where: {
      user_id_project_id: {
        project_id,
        user_id,
      },
    },
  });
}

//   findProject(userid: number) {
    
//   return this.prisma.user_project.findMany({
//     where: {
//       user_id: userid,
//     },
//   });
// }

  async findProject(userId: number) {
    const userProjects = await this.prisma.user_project.findMany({
      where: {
        user_id: userId,
      },
    });

    const projectIds = userProjects.map((up) => up.project_id);

    const projects = await this.prisma.project.findMany({
      where: {
        project_id: { in: projectIds },
      },
    });

    return projects;
  }


  update(project_id: number, user_id: number, updateUserProjectDto: UpdateUserProjectDto) {
  return this.prisma.user_project.update({
    where: {
      user_id_project_id: {
        project_id,
        user_id,
      },
    },
    data: updateUserProjectDto,
  });
}

  remove(project_id: number, user_id: number) {
    return this.prisma.user_project.delete({
    where: {
      user_id_project_id: {
        project_id,
        user_id,
      },
    },
  });
  }
}


import { Injectable, NotFoundException } from '@nestjs/common';
import EmployerEntity from 'src/db/entity/employer.entity';
import ProjectEntity from 'src/db/entity/project.entity';
import UserEntity from 'src/db/entity/user.entity';
import CreateProjectDto from 'src/jobseekers/dto/create-project.dto';

@Injectable()
export class ProjectService {

    async createProject(projectDetails: CreateProjectDto, userId: string): Promise<ProjectEntity> {
        const projectEntity: ProjectEntity = await ProjectEntity.create();
        projectEntity.title = projectDetails.title;
        if(projectDetails.description)
            projectEntity.description = projectDetails.description;
        projectEntity.price = projectDetails.price;
        projectEntity.isPublished = projectDetails.isPublished;
        if(projectDetails.isPublished) {
            projectEntity.publishedAt = new Date();
        }
        projectEntity.deadline = projectDetails.deadline;
        projectEntity.type = projectDetails.type;
        const user: UserEntity = await UserEntity.findOne({ where: { id: userId } });
        const employer: EmployerEntity = await EmployerEntity.findOne({ where: { user: user } });
        if(!employer)
            throw new NotFoundException("Employer Not Found.");
        projectEntity.employer = employer;
        if(projectDetails.attachment) {
            projectEntity.attachment = Buffer.from("\\x" + projectDetails.attachment.toString("hex"));
        }
        await ProjectEntity.save(projectEntity);
        return projectEntity;
    }

    async getAllEmployerProjects(userId: string): Promise<ProjectEntity[]> {
        const user: UserEntity = await UserEntity.findOne({ where: { id: userId } });
        const employer: EmployerEntity = await EmployerEntity.findOne({ where: { user: user } });
        if(!employer)
            throw new NotFoundException("Employer Not Found.");
        const projectEntities: ProjectEntity[] = await ProjectEntity.find({ where: { employer: employer } });
        return projectEntities;
    }

    async getProject(userId: string, projectId: string): Promise<ProjectEntity> {
        const user: UserEntity = await UserEntity.findOne({ where: { id: userId } });
        const employer: EmployerEntity = await EmployerEntity.findOne({ where: { user: user } });
        if(!employer)
            throw new NotFoundException("Employer Not Found.");
        const projectEntity: ProjectEntity = await ProjectEntity.findOne({ where: { id: projectId, employer: employer } });
        if(!projectEntity)
            throw new NotFoundException("Project Not Found.");
        return projectEntity;
    }

    async deleteOne(userId: string, projectId: string): Promise<Object> {
        const user: UserEntity = await UserEntity.findOne({ where: { id: userId } });
        const employer: EmployerEntity = await EmployerEntity.findOne({ where: { user: user } });
        if(!employer)
            throw new NotFoundException("Employer Not Found.");
        const projectEntity: ProjectEntity = await ProjectEntity.findOne({ where: { id: projectId, employer: employer } });
        if(!projectEntity)
            throw new NotFoundException("Project Not Found.");
        await ProjectEntity.delete({ id: projectId, employer: employer });
        return { "success": true };
    }

    async deleteAllEmployerProjects(userId: string): Promise<Object> {
        const user: UserEntity = await UserEntity.findOne({ where: { id: userId } });
        const employer: EmployerEntity = await EmployerEntity.findOne({ where: { user: user } });
        if(!employer)
            throw new NotFoundException("Employer Not Found.");
        const projectEntities: ProjectEntity[] = await ProjectEntity.find({ where: { employer: employer } });
        projectEntities.map(async (projectEntity: ProjectEntity) => {
            await ProjectEntity.delete({ id: projectEntity.id, employer: employer });
        });
        return { "success": true };
    }

    async update(projectDetails: CreateProjectDto, userId: string, projectId: string): Promise<ProjectEntity> {
        const user: UserEntity = await UserEntity.findOne({ where: { id: userId } });
        const employer: EmployerEntity = await EmployerEntity.findOne({ where: { user: user } });
        if(!employer)
            throw new NotFoundException("Employer Not Found.");
        const projectEntity: ProjectEntity = await ProjectEntity.findOne({ where: { id: projectId, employer: employer } });
        if(!projectEntity)
            throw new NotFoundException("Project Not Found.");
        projectEntity.title = projectDetails.title;
        if(projectDetails.description)
            projectEntity.description = projectDetails.description;
        projectEntity.price = projectDetails.price;
        if(projectDetails.isPublished && !projectEntity.isPublished) {
            projectEntity.publishedAt = new Date();
        } else if(!projectDetails.isPublished) {
            projectEntity.publishedAt = null;
        }
        projectEntity.isPublished = projectDetails.isPublished;
        projectEntity.deadline = projectDetails.deadline;
        projectEntity.type = projectDetails.type;
        if(projectDetails.attachment) {
            projectEntity.attachment = Buffer.from("\\x" + projectDetails.attachment.toString("hex"));
        }
        await ProjectEntity.save(projectEntity);
        return projectEntity;
    }

}

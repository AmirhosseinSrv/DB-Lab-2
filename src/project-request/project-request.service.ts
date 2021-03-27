import { Injectable, NotFoundException } from '@nestjs/common';
import FreelancerEntity from 'src/db/entity/freelancer.entity';
import ProjectRequestEntity from 'src/db/entity/project-request.entity';
import ProjectEntity from 'src/db/entity/project.entity';
import UserEntity from 'src/db/entity/user.entity';
import CreateProjectRequestDto from 'src/jobseekers/dto/create-project-request.dto';

@Injectable()
export class ProjectRequestService {

    async createProjectRequest(projectRequestDetails: CreateProjectRequestDto, userId: string): Promise<ProjectRequestEntity> {
        const projectRequestEntity: ProjectRequestEntity = await ProjectRequestEntity.create();
        if(projectRequestDetails.description)
            projectRequestEntity.description = projectRequestDetails.description;
        projectRequestEntity.price = projectRequestDetails.price;
        projectRequestEntity.deliveryTime = projectRequestDetails.deliveryTime;
        const user: UserEntity = await UserEntity.findOne({ where: { id: userId } });
        const freelancer: FreelancerEntity = await FreelancerEntity.findOne({ where: { user: user } });
        if(!freelancer)
            throw new NotFoundException("Freelancer Not Found.");
        projectRequestEntity.freelancer = freelancer;
        const project: ProjectEntity = await ProjectEntity.findOne(projectRequestDetails.projectId);
        if(!project || project.isPublished === false)
            throw new NotFoundException("Project Not Found.");
        projectRequestEntity.project = project;
        await ProjectRequestEntity.save(projectRequestEntity);
        return projectRequestEntity;
    }

    async getAllFreelancerProjectRequests(userId: string): Promise<ProjectRequestEntity[]> {
        const user: UserEntity = await UserEntity.findOne({ where: { id: userId } });
        const freelancer: FreelancerEntity = await FreelancerEntity.findOne({ where: { user: user } });
        if(!freelancer)
            throw new NotFoundException("Freelancer Not Found.");
        const projectEntities: ProjectRequestEntity[] = await ProjectRequestEntity.find({ where: { freelancer: freelancer } });
        return projectEntities;
    }

    async getProjectRequest(userId: string, projectRequestId: string): Promise<ProjectRequestEntity> {
        const user: UserEntity = await UserEntity.findOne({ where: { id: userId } });
        const freelancer: FreelancerEntity = await FreelancerEntity.findOne({ where: { user: user } });
        if(!freelancer)
            throw new NotFoundException("Freelancer Not Found.");
        const projectRequestEntity: ProjectRequestEntity = await ProjectRequestEntity.findOne({ where: { id: projectRequestId, freelancer: freelancer } });
        if(!projectRequestEntity)
            throw new NotFoundException("Project Request Not Found.");
        return projectRequestEntity;
    }

    async deleteOne(userId: string, projectRequestId: string): Promise<Object> {
        const user: UserEntity = await UserEntity.findOne({ where: { id: userId } });
        const freelancer: FreelancerEntity = await FreelancerEntity.findOne({ where: { user: user } });
        if(!freelancer)
            throw new NotFoundException("Freelancer Not Found.");
        const projectRequestEntity: ProjectRequestEntity = await ProjectRequestEntity.findOne({ where: { id: projectRequestId, freelancer: freelancer } });
            if(!projectRequestEntity)
                throw new NotFoundException("Project Request Not Found.");
        await ProjectRequestEntity.delete({ id: projectRequestId, freelancer: freelancer });
        return { "success": true };
    }

    async deleteAllFreelancerProjectRequests(userId: string): Promise<Object> {
        const user: UserEntity = await UserEntity.findOne({ where: { id: userId } });
        const freelancer: FreelancerEntity = await FreelancerEntity.findOne({ where: { user: user } });
        if(!freelancer)
            throw new NotFoundException("Freelancer Not Found.");
        const projectRequestEntities: ProjectRequestEntity[] = await ProjectRequestEntity.find({ where: { freelancer: freelancer } });
        projectRequestEntities.map(async (projectRequestEntity: ProjectRequestEntity) => {
            await ProjectRequestEntity.delete({ id: projectRequestEntity.id, freelancer: freelancer });
        });
        return { "success": true };
    }

    async update(projectRequestDetails: CreateProjectRequestDto, userId: string, projectRequestId: string): Promise<ProjectRequestEntity> {
        const user: UserEntity = await UserEntity.findOne({ where: { id: userId } });
        const freelancer: FreelancerEntity = await FreelancerEntity.findOne({ where: { user: user } });
        if(!freelancer)
            throw new NotFoundException("Freelancer Not Found.");
        const projectRequestEntity: ProjectRequestEntity = await ProjectRequestEntity.findOne({ where: { id: projectRequestId, freelancer: freelancer } });
        if(!projectRequestEntity)
            throw new NotFoundException("Project Request Not Found.");
        if(projectRequestDetails.description)
            projectRequestEntity.description = projectRequestDetails.description;
        projectRequestEntity.price = projectRequestDetails.price;
        projectRequestEntity.deliveryTime = projectRequestDetails.deliveryTime;
        await ProjectRequestEntity.save(projectRequestEntity);
        return projectRequestEntity;
    }

}

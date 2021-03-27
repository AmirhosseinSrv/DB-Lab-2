import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './User/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { JobseekersModule } from './jobseekers/jobseekers.module';
import { ProjectModule } from './project/project.module';
import { ProjectRequestModule } from './project-request/project-request.module';
import UserEntity from './db/entity/user.entity';
import ProjectEntity from './db/entity/project.entity';
import ProjectRequestEntity from './db/entity/project-request.entity';
import FreelancerEntity from './db/entity/freelancer.entity';
import EmployerEntity from './db/entity/employer.entity';

@Module({
  imports: [
    UserModule,
    JobseekersModule,
    ProjectModule,
    ProjectRequestModule,
    TypeOrmModule.forFeature(
      [UserEntity, FreelancerEntity, EmployerEntity, ProjectEntity , ProjectRequestEntity],
    ),
    TypeOrmModule.forRoot(),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
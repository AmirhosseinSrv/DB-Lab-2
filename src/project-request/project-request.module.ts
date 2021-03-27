import { Module } from '@nestjs/common';
import { ProjectRequestService } from './project-request.service';
import { ProjectRequestController } from './project-request.controller';

@Module({
  providers: [ProjectRequestService],
  controllers: [ProjectRequestController]
})
export class ProjectRequestModule {}

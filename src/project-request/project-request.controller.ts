import { Body, Controller, Delete, Get, Header, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ProjectRequestService } from './project-request.service';
import { ApiQuery, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import CreateProjectRequestDto from 'src/jobseekers/dto/create-project-request.dto';

@Controller()
export class ProjectRequestController {
    constructor(private readonly projectRequestService: ProjectRequestService) {}
    
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Header('Content-Type', 'application/json')
    @ApiResponse({ status: 200, description: 'Create Project Request.' })
    @ApiQuery({
        name: 'userId',
        required: true,
        type: String
    })
    @Post('project-requests')
    createProject( @Body() projectRequest: CreateProjectRequestDto, @Query('userId') userId: string ) {
        return this.projectRequestService.createProjectRequest(projectRequest, userId);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Header('Content-Type', 'application/json')
    @ApiResponse({ status: 200, description: 'Get All Freelance Project Requests.' })
    @ApiQuery({
        name: 'userId',
        required: true,
        type: String
    })
    @Get('project-requests')
    getAllEmployerProjects( @Query('userId') userId: string ) {
        return this.projectRequestService.getAllFreelancerProjectRequests(userId);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Header('Content-Type', 'application/json')
    @ApiResponse({ status: 200, description: 'Get Project Request.' })
    @ApiQuery({
        name: 'userId',
        required: true,
        type: String
    })
    @ApiQuery({
        name: 'projectRequestId',
        required: true,
        type: String
    })
    @Get('project-request')
    getProject( @Query('userId') userId: string, @Query('projectRequestId') projectRequestId: string ) {
        return this.projectRequestService.getProjectRequest(userId, projectRequestId);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Header('Content-Type', 'application/json')
    @ApiResponse({ status: 200, description: 'Delete All Freelancer Project Requests.' })
    @ApiQuery({
        name: 'userId',
        required: true,
        type: String
    })
    @Delete('project-requests')
    deleteAllEmployerProjects( @Query('userId') userId: string ) {
        return this.projectRequestService.deleteAllFreelancerProjectRequests(userId);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Header('Content-Type', 'application/json')
    @ApiResponse({ status: 200, description: 'Delete Project Request.' })
    @ApiQuery({
        name: 'userId',
        required: true,
        type: String
    })
    @ApiQuery({
        name: 'projectRequestId',
        required: true,
        type: String
    })
    @Delete('project-request')
    deleteOne( @Query('userId') userId: string, @Query('projectRequestId') projectRequestId: string ) {
        return this.projectRequestService.deleteOne(userId, projectRequestId);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Header('Content-Type', 'application/json')
    @ApiResponse({ status: 200, description: 'Update Project Request.' })
    @ApiQuery({
        name: 'userId',
        required: true,
        type: String
    })
    @ApiQuery({
        name: 'projectRequestId',
        required: true,
        type: String
    })
    @Put('project-request')
    update( @Body() projectRequest: CreateProjectRequestDto, @Query('userId') userId: string, @Query('projectRequestId') projectRequestId: string ) {
        return this.projectRequestService.update(projectRequest, userId, projectRequestId);
    }
}

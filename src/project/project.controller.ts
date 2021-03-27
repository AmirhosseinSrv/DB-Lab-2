import { Body, Controller, Delete, Get, Header, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ApiQuery, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import CreateProjectDto from 'src/jobseekers/dto/create-project.dto';

@Controller()
export class ProjectController {
    constructor(private readonly projectService: ProjectService) {}
    
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Header('Content-Type', 'application/json')
    @ApiResponse({ status: 200, description: 'Create Project.' })
    @ApiQuery({
        name: 'userId',
        required: true,
        type: String
    })
    @Post('projects')
    createProject( @Body() project: CreateProjectDto, @Query('userId') userId: string ) {
        return this.projectService.createProject(project, userId);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Header('Content-Type', 'application/json')
    @ApiResponse({ status: 200, description: 'Get All Employer Projects.' })
    @ApiQuery({
        name: 'userId',
        required: true,
        type: String
    })
    @Get('projects')
    getAllEmployerProjects( @Query('userId') userId: string ) {
        return this.projectService.getAllEmployerProjects(userId);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Header('Content-Type', 'application/json')
    @ApiResponse({ status: 200, description: 'Get Project.' })
    @ApiQuery({
        name: 'userId',
        required: true,
        type: String
    })
    @ApiQuery({
        name: 'projectId',
        required: true,
        type: String
    })
    @Get('project')
    getProject( @Query('userId') userId: string, @Query('projectId') projectId: string ) {
        return this.projectService.getProject(userId, projectId);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Header('Content-Type', 'application/json')
    @ApiResponse({ status: 200, description: 'Delete All Employer Projects.' })
    @ApiQuery({
        name: 'userId',
        required: true,
        type: String
    })
    @Delete('projects')
    deleteAllEmployerProjects( @Query('userId') userId: string ) {
        return this.projectService.deleteAllEmployerProjects(userId);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Header('Content-Type', 'application/json')
    @ApiResponse({ status: 200, description: 'Delete Project.' })
    @ApiQuery({
        name: 'userId',
        required: true,
        type: String
    })
    @ApiQuery({
        name: 'projectId',
        required: true,
        type: String
    })
    @Delete('project')
    deleteOne( @Query('userId') userId: string, @Query('projectId') projectId: string ) {
        return this.projectService.deleteOne(userId, projectId);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Header('Content-Type', 'application/json')
    @ApiResponse({ status: 200, description: 'Update Project.' })
    @ApiQuery({
        name: 'userId',
        required: true,
        type: String
    })
    @ApiQuery({
        name: 'projectId',
        required: true,
        type: String
    })
    @Put('project')
    update( @Body() project: CreateProjectDto, @Query('userId') userId: string, @Query('projectId') projectId: string ) {
        return this.projectService.update(project, userId, projectId);
    }
}

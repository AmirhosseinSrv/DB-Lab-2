import { Body, Controller, Delete, Get, Header, Post, Put, Query, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiQuery, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import CreateFreelancerDto from 'src/jobseekers/dto/create-freelancer.dto';
import CreateEmployerDto from 'src/jobseekers/dto/create-employer.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Header('Content-Type', 'application/json')
  @ApiResponse({ status: 200, description: 'Create Freelancer.' })
  @Post('freelancers')
  createFreelancer( @Body() freelancer: CreateFreelancerDto) {
    return this.userService.createFreelancer(freelancer);
  }

  @Header('Content-Type', 'application/json')
  @ApiResponse({ status: 200, description: 'Create Employer.' })
  @Post('employers')
  createEmployer( @Body() employer: CreateEmployerDto) {
    return this.userService.createEmployer(employer);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Header('Content-Type', 'application/json')
  @ApiResponse({ status: 200, description: 'Get All Freelancers.' })
  @Get('freelancers')
  getAllFreelancers() {
    return this.userService.getAllFreelancers();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Header('Content-Type', 'application/json')
  @ApiResponse({ status: 200, description: 'Get All Employers.' })
  @Get('employers')
  getAllEmployers() {
    return this.userService.getAllEmployers();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Header('Content-Type', 'application/json')
  @ApiResponse({ status: 200, description: 'Get Freelancer.' })
  @ApiQuery({
    name: 'userId',
    required: true,
    type: String
  })
  @Get('freelancer')
  getFreelancer(@Query('userId') userId: string) {
    return this.userService.getFreelancer(userId);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Header('Content-Type', 'application/json')
  @ApiResponse({ status: 200, description: 'Get Employer.' })
  @ApiQuery({
    name: 'userId',
    required: true,
    type: String
  })
  @Get('employer')
  getEmployer(@Query('userId') userId: string) {
    return this.userService.getEmployer(userId);
  }
  
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Header('Content-Type', 'application/json')
  @ApiResponse({ status: 200, description: 'Delete Freelancer.' })
  @ApiQuery({
    name: 'userId',
    required: true,
    type: String
  })
  @Delete('freelancer')
  deleteFreelancer( @Query('userId') userId: string) {
    return this.userService.deleteFreelancer(userId);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Header('Content-Type', 'application/json')
  @ApiResponse({ status: 200, description: 'Delete Employer.' })
  @ApiQuery({
    name: 'userId',
    required: true,
    type: String
  })
  @Delete('employer')
  deleteEmployer( @Query('userId') userId: string) {
    return this.userService.deleteEmployer(userId);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Header('Content-Type', 'application/json')
  @ApiResponse({ status: 200, description: 'Delete All Freelancers.' })
  @Delete('freelancers')
  deleteAllFreelancers() {
    return this.userService.deleteAllFreelancers();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Header('Content-Type', 'application/json')
  @ApiResponse({ status: 200, description: 'Delete All Employers.' })
  @Delete('employers')
  deleteAllEmployers() {
    return this.userService.deleteAllEmployers();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Header('Content-Type', 'application/json')
  @ApiResponse({ status: 200, description: 'Update Freelancer.' })
  @ApiQuery({
    name: 'userId',
    required: true,
    type: String
  })
  @Put('freelancer')
  updateFreelacer( @Body() freelancer: CreateFreelancerDto, @Query('userId') userId: string) {
    return this.userService.updateFreelancer(freelancer, userId);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Header('Content-Type', 'application/json')
  @ApiResponse({ status: 200, description: 'Update Employer.' })
  @ApiQuery({
    name: 'userId',
    required: true,
    type: String
  })
  @Put('employer')
  updateUser( @Body() employer: CreateEmployerDto, @Query('userId') userId: string) {
    return this.userService.updateEmployer(employer, userId);
  }
}
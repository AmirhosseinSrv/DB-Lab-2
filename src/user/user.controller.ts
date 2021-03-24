import { Body, Controller, Delete, Get, Header, Post, Put, Query, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import CreateUserDto from './dto/create-user.dto';
import { ApiQuery, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Header('Content-Type', 'application/json')
  @ApiResponse({ status: 200, description: 'Create User.' })
  @Post('post')
  postUser( @Body() user: CreateUserDto) {
    return this.usersService.insert(user);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Header('Content-Type', 'application/json')
  @ApiResponse({ status: 200, description: 'Get All User.' })
  @Get()
  getAll() {
    return this.usersService.getAllUsers();
  }
  
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Header('Content-Type', 'application/json')
  @ApiResponse({ status: 200, description: 'Delete User.' })
  @ApiQuery({
    name: 'userId',
    required: true,
    type: Number
  })
  @Delete('delete')
  deleteUser( @Query('userId') userID: number) {
    return this.usersService.delete(userID);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Header('Content-Type', 'application/json')
  @ApiResponse({ status: 200, description: 'Update User.' })
  @ApiQuery({
    name: 'userId',
    required: true,
    type: Number
  })
  @Put('put')
  updateUser( @Body() user: CreateUserDto, @Query('userId') userID: number) {
    return this.usersService.update(user, userID);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Header('Content-Type', 'application/json')
  @ApiResponse({ status: 200, description: 'Get All User\'s Books.' })
  @ApiQuery({
    name: 'userId',
    required: true,
    type: Number
  })
  @Get('books')
  getBooks( @Query('userId') userID: number ) {
    return this.usersService.getBooksOfUser(userID);
  }
}
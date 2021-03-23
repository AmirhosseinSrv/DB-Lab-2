import { Body, Controller, Get, Header, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';
import CreateUserDto from './dto/create-user.dto';
import { ApiQuery, ApiResponse } from '@nestjs/swagger';

@Controller('users')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Header('Content-Type', 'application/json')
  @ApiResponse({ status: 200, description: 'Create User.' })
  @Post('post')
  postUser( @Body() user: CreateUserDto) {
    return this.usersService.insert(user);
  }

  @Header('Content-Type', 'application/json')
  @ApiResponse({ status: 200, description: 'Get All User.' })
  @Get()
  getAll() {
    return this.usersService.getAllUsers();
  }

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
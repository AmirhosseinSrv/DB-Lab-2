
import { Body, Controller, Delete, Get, Header, Post, Put, Query, UseGuards } from '@nestjs/common';
import GenreService from './genre.service';
import CreateGenreDto from './dto/create-genre.dto';
import { ApiBearerAuth, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('genre')
export default class GenreController {
  constructor(private readonly genreService: GenreService) {}
  
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Header('Content-Type', 'application/json')
  @ApiResponse({ status: 200, description: 'Create Genre.' })
  @Post('post')
  postGenre( @Body() genre: CreateGenreDto) {
    return this.genreService.insert(genre);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Header('Content-Type', 'application/json')
  @ApiResponse({ status: 200, description: 'Delete Genre.' })
  @ApiQuery({
    name: 'genreId',
    required: true,
    type: Number
  })
  @Delete('delete')
  deleteGenre( @Query('genreId') genreID: number) {
    return this.genreService.delete(genreID);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Header('Content-Type', 'application/json')
  @ApiResponse({ status: 200, description: 'Update Genre.' })
  @ApiQuery({
    name: 'genreId',
    required: true,
    type: Number
  })
  @Put('put')
  updateGenre( @Body() genre: CreateGenreDto, @Query('genreId') genreID: number) {
    return this.genreService.update(genre, genreID);
  }
  
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Header('Content-Type', 'application/json')
  @ApiResponse({ status: 200, description: 'Get All Genres.' })
  @Get()
  getAll() {
    return this.genreService.getAllGenre();
  }
}
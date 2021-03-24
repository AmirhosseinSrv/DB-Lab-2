
import { Body, Controller, Delete, Get, Header, Post, Put, Query } from '@nestjs/common';
import GenreService from './genre.service';
import CreateGenreDto from './dto/create-genre.dto';
import { ApiQuery, ApiResponse } from '@nestjs/swagger';

@Controller('genre')
export default class GenreController {
  constructor(private readonly genreService: GenreService) {}
  
  @Header('Content-Type', 'application/json')
  @ApiResponse({ status: 200, description: 'Create Genre.' })
  @Post('post')
  postGenre( @Body() genre: CreateGenreDto) {
    return this.genreService.insert(genre);
  }

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
  
  @Header('Content-Type', 'application/json')
  @ApiResponse({ status: 200, description: 'Get All Genres.' })
  @Get()
  getAll() {
    return this.genreService.getAllGenre();
  }
}
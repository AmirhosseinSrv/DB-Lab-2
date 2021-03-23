
import { Body, Controller, Get, Header, Post } from '@nestjs/common';
import GenreService from './genre.service';
import CreateGenreDto from './dto/create-genre.dto';
import { ApiResponse } from '@nestjs/swagger';

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
  @ApiResponse({ status: 200, description: 'Get All Genres.' })
  @Get()
  getAll() {
    return this.genreService.getAllGenre();
  }
}
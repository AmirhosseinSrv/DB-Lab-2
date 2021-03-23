
import { Body, Controller, Get, Post, Header } from '@nestjs/common';
import BookService from './book.service';
import CreateBookDto from './dto/create-book.dto';
import { ApiResponse } from '@nestjs/swagger';

@Controller('book')
export default class BookController {
  constructor(private readonly bookService: BookService) {}
  
  @Header('Content-Type', 'application/json')
  @ApiResponse({ status: 200, description: 'Create Book.' })
  @Post('post')
  postGenre( @Body() book: CreateBookDto) {
    return this.bookService.insert(book);
  }
  
  @Header('Content-Type', 'application/json')
  @ApiResponse({ status: 200, description: 'Get All Books.' })
  @Get()
  getAll() {
    return this.bookService.getAllBooks();
  }
}
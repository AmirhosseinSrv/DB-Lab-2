
import { Body, Controller, Get, Post, Header, Delete, Query, Put } from '@nestjs/common';
import BookService from './book.service';
import CreateBookDto from './dto/create-book.dto';
import { ApiQuery, ApiResponse } from '@nestjs/swagger';

@Controller('book')
export default class BookController {
  constructor(private readonly bookService: BookService) {}
  
  @Header('Content-Type', 'application/json')
  @ApiResponse({ status: 200, description: 'Create Book.' })
  @Post('post')
  postBook( @Body() book: CreateBookDto) {
    return this.bookService.insert(book);
  }

  @Header('Content-Type', 'application/json')
  @ApiResponse({ status: 200, description: 'Delete Book.' })
  @ApiQuery({
    name: 'bookId',
    required: true,
    type: Number
  })
  @Delete('delete')
  deleteBook( @Query('bookId') bookID: number) {
    return this.bookService.delete(bookID);
  }

  @Header('Content-Type', 'application/json')
  @ApiResponse({ status: 200, description: 'Update Book.' })
  @ApiQuery({
    name: 'bookId',
    required: true,
    type: Number
  })
  @Put('put')
  updateBook( @Body() book: CreateBookDto, @Query('bookId') bookID: number) {
    return this.bookService.update(book, bookID);
  }
  
  @Header('Content-Type', 'application/json')
  @ApiResponse({ status: 200, description: 'Get All Books.' })
  @Get()
  getAll() {
    return this.bookService.getAllBooks();
  }
}
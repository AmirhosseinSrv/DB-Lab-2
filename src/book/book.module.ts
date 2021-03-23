import { Module } from '@nestjs/common';
import BookService from './book.service';
import BookController from './book.controller';

@Module({
  imports: [],
  controllers: [BookController],
  providers: [BookService],
})

export default class BookModule {}
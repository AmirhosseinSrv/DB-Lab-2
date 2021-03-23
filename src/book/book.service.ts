import BookEntity from '../db/entity/book.entity';
import CreateBookDto from './dto/create-book.dto';
import UserEntity from '../db/entity/user.entity';
import GenreEntity from '../db/entity/genre.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class BookService {

  async insert(bookDetails: CreateBookDto): Promise<BookEntity> {
    const { name , userID , genreIDs } = bookDetails;
    const book = new BookEntity();
    book.name = name;
    book.user = await UserEntity.findOne(userID) ;
    book.genres = [];
    for ( let i = 0; i < genreIDs.length ; i++)
    {
             const genre = await GenreEntity.findOne(genreIDs[i]);
             book.genres.push(genre);
    }
    await book.save();
    return book;
  }

  async getAllBooks(): Promise<BookEntity[] > {
    return BookEntity.find();
  }
}
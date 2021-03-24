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

  async delete(bookID: number): Promise<Object> {
    const book: BookEntity = await BookEntity.findOne({where: {id: bookID}});
    await BookEntity.delete(book);
    return { "success": true };
  }

  async update(bookDetails: CreateBookDto, bookID: number): Promise<BookEntity> {
    const book: BookEntity = await BookEntity.findOne({where: {id: bookID}});
    book.name = bookDetails.name;
    book.user = await UserEntity.findOne({where: {id: bookDetails.userID}});
    let genreEntities: GenreEntity[];
    bookDetails.genreIDs.map(async (genreID: number) => {
      const genreEntity: GenreEntity = await GenreEntity.findOne({where: {id: genreID}});
      genreEntities.push(genreEntity);
    });
    book.genres = genreEntities;
    await BookEntity.save(book);
    return book;
  }

  async getAllBooks(): Promise<BookEntity[] > {
    return BookEntity.find();
  }
}
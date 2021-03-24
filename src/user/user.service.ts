import { Injectable } from '@nestjs/common';
import UserEntity from '../db/entity/user.entity';
import CreateUserDto from './dto/create-user.dto';
import BookEntity from '../db/entity/book.entity';
import {getConnection} from "typeorm";

@Injectable()
export class UserService {

  async insert(userDetails: CreateUserDto): Promise<UserEntity> {
    const userEntity: UserEntity = UserEntity.create();
    const {name } = userDetails;
    userEntity.name = name;
    await UserEntity.save(userEntity);
    return userEntity;
  }

  async delete(userID: number): Promise<Object> {
    const user: UserEntity = await UserEntity.findOne({where: {id: userID}});
    await UserEntity.delete(user);
    return { "success": true };
  }

  async update(userDetails: CreateUserDto, userID: number): Promise<UserEntity> {
    const user: UserEntity = await UserEntity.findOne({where: {id: userID}});
    user.name = userDetails.name;
    let bookEntities: BookEntity[];
    userDetails.books.map(async (bookId: number) => {
      const bookEntity: BookEntity = await BookEntity.findOne({where: {id: bookId}});
      bookEntities.push(bookEntity);
    });
    user.books = bookEntities;
    await UserEntity.save(user);
    return user;
  }

  async getAllUsers(): Promise<UserEntity[]> {
    return await UserEntity.find();
  }

  async getBooksOfUser(userID: number): Promise<BookEntity[]> {
    const user: UserEntity = await UserEntity.findOne({where: {id: userID}, relations: ['books']});
    return user.books;
  }
}
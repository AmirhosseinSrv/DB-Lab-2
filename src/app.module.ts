import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './User/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import UserEntity from './db/entity/user.entity';
import BookModule from './Book/book.module';
import GenreModule from './Genre/genre.module';
import BookEntity from './db/entity/book.entity';
import GenreEntity from './db/entity/genre.entity';

@Module({
  imports: [
    UserModule ,
    BookModule,
    GenreModule,
    TypeOrmModule.forFeature(
      [UserEntity, BookEntity , GenreEntity],
    ),
    TypeOrmModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
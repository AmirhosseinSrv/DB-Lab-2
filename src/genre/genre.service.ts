import { Injectable } from '@nestjs/common';
import CreateGenreDto from './dto/create-genre.dto';
import GenreEntity from '../db/entity/genre.entity';

@Injectable()
export default class GenreServices {
    async insert(genreDetails: CreateGenreDto): Promise<GenreEntity> {

    const genreEntity: GenreEntity = GenreEntity.create();
    const {type} = genreDetails;

    genreEntity.type = type;
    await GenreEntity.save(genreEntity);
    return genreEntity;
  }

  async delete(genreID: number): Promise<Object> {
    const genre: GenreEntity = await GenreEntity.findOne({where: {id: genreID}});
    await GenreEntity.delete(genre);
    return { "success": true };
  }

  async update(genreDetails: CreateGenreDto, genreID: number): Promise<GenreEntity> {
    const genre: GenreEntity = await GenreEntity.findOne({where: {id: genreID}});
    genre.type = genreDetails.type;
    await GenreEntity.save(genre);
    return genre;
  }

  async getAllGenre(): Promise<GenreEntity[]> {
        return await GenreEntity.find();
  }
}
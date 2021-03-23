import { ApiProperty } from '@nestjs/swagger';

export default class CreateBookDto {
    @ApiProperty({description:'Enter Book Name.', minLength: 3, default: 'Book', maxLength: 10})
    readonly name: string;
    @ApiProperty({description:'Enter User Id.'})
    readonly userID: number;
    @ApiProperty({description:'Enter Genres Ids.', type: Array(Number)})
    readonly genreIDs: number[];
}
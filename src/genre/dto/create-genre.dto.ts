import { ApiProperty } from '@nestjs/swagger';

export default class CreateGenreDto {
    @ApiProperty({description:'Enter Genre Name.', minLength: 3, default: 'Comic', maxLength: 10})
    readonly type: string;
}
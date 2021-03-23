import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export default class CreateUserDto {
    @ApiProperty({description:'Enter Your Name.', minLength: 3, default: 'User', maxLength: 10})
    readonly name: string;
    @ApiPropertyOptional({description:'Optional.', default: [], type: Array(Number)})
    readonly books: number[];
}
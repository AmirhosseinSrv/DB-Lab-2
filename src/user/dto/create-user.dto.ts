import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export default class CreateUserDto {
    @ApiProperty({description:'Enter Your Name.', minLength: 3, default: 'User', maxLength: 10})
    readonly name: string;
    @ApiProperty({description:'Enter Your Username.', minLength: 3, default: 'Username', maxLength: 10})
    readonly username: string;
    @ApiProperty({description:'Enter Your Password.', minLength: 4, default: '123456', maxLength: 12})
    readonly password: string;
    @ApiPropertyOptional({description:'Optional.', default: [], type: Array(Number)})
    readonly books: number[];
}
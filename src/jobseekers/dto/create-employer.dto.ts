import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export default class CreateEmployerDto {
    @ApiProperty({description:'Enter Your Name.', minLength: 3, default: 'User', maxLength: 10})
    readonly name: string;
    @ApiProperty({description:'Enter Your Username.', minLength: 3, default: 'Username', maxLength: 10})
    readonly username: string;
    @ApiProperty({description:'Enter Your Email.', minLength: 11, default: 'test@gmail.com', maxLength: 50})
    readonly email: string;
    @ApiProperty({description:'Enter Your Membership.'})
    readonly membership: number;
    @ApiProperty({description:'Enter Your Password.', minLength: 4, default: '123456', maxLength: 12})
    readonly password: string;
    @ApiPropertyOptional({description:'Enter Your Comapny (Optional).', minLength: 3, maxLength: 20})
    readonly company: string;
    @ApiPropertyOptional({description:'Enter Your Phone Numbers (Optional).', default: [], type: Array(String)})
    readonly phoneNumbers: string[];
}
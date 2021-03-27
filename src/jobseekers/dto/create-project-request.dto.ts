import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export default class CreateProjectRequestDto {
    @ApiPropertyOptional({description:'Enter Project Request Description.', minLength: 3, default: 'Description', maxLength: 200})
    readonly description: string;
    @ApiProperty({description:'Enter Your Price.', default: 0.0})
    readonly price: number;
    @ApiProperty({description:'Enter Project Id.'})
    readonly projectId: string;
    @ApiProperty({description:'Enter Your Delivery Time.'})
    readonly deliveryTime: Date;
}
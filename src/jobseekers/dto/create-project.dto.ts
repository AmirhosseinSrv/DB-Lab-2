import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export default class CreateProjectDto {
    @ApiProperty({description:'Enter Project Title.', minLength: 3, default: 'Project', maxLength: 20})
    readonly title: string;
    @ApiPropertyOptional({description:'Enter Project Description.', minLength: 3, default: 'Description', maxLength: 200})
    readonly description: string;
    @ApiProperty({description:'Enter Project Price.', default: 0.0})
    readonly price: number;
    @ApiProperty({description:'Enter Project Type.'})
    readonly type: number;
    @ApiProperty({description:'Enter Project Deadline.'})
    readonly deadline: Date;
    @ApiPropertyOptional({description:'Upload Project Attachments (Optional).', default: null, type: Buffer})
    readonly attachment: Buffer;
    @ApiProperty({description:'Enter Project Status.'})
    readonly isPublished: boolean;
}
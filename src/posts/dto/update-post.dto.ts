import { PartialType } from '@nestjs/mapped-types';
import { CreatePostDto } from './create-post.dto';
import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

export class UpdatePostDto extends PartialType(CreatePostDto) {
    @IsString()
    @IsNotEmpty()
    title : string
    
    @IsUrl()
    @IsNotEmpty()
    text: string

    @IsUrl()
    @IsOptional()
    image : string
}

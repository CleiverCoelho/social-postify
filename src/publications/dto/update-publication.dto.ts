import { PartialType } from '@nestjs/mapped-types';
import { CreatePublicationDto } from './create-publication.dto';
import { IsDataURI, IsNotEmpty, IsNumber } from 'class-validator';

export class UpdatePublicationDto extends PartialType(CreatePublicationDto) {
    @IsNumber()
    @IsNotEmpty()
    mediaId: number

    @IsNumber()
    @IsNotEmpty()
    postId: number

    @IsDataURI()
    @IsNotEmpty()
    date: string
}

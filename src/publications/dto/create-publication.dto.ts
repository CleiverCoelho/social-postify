import { IsDataURI, IsNotEmpty, IsNumber } from "class-validator";

export class CreatePublicationDto {
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

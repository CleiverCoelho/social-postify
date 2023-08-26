import { IsNotEmpty, IsOptional, IsString, IsUrl } from "class-validator"

export class CreatePostDto {
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

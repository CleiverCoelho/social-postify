import { IsBooleanString, IsDateString, IsOptional } from "class-validator";

export class OptionalFindAllFilter {
    @IsBooleanString()
    @IsOptional()
    published: string

    @IsDateString()
    @IsOptional()
    after: Date
}

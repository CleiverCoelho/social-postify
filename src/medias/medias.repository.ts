import { PrismaService } from "src/prisma/prisma.service";
import { CreateMediaDto } from "./dto/create-media.dto";
import { Injectable } from "@nestjs/common";
import { UpdateMediaDto } from "./dto/update-media.dto";

@Injectable()
export class MediasRepository {
    constructor (private readonly prisma : PrismaService) { }

    async createMedia (body : CreateMediaDto) {
        return await this.prisma.media.create({
            data: body
        })
    }

    async findAllMedias () {
        return await this.prisma.media.findMany({})
    }

    async getMediaById (id : number) {
        return await this.prisma.media.findMany({
            where: { id }
        })
    }

    async updateMediaById (id : number, body : UpdateMediaDto) {
        return await this.prisma.media.update({
            where: { id },
            data: body
        })
    }
}
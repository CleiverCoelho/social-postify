import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreatePublicationDto } from "./dto/create-publication.dto";
import { UpdatePublicationDto } from "./dto/update-publication.dto";

@Injectable()
export class PublicationsRepository {
    constructor( private readonly prisma: PrismaService) { }

    async createPub (body : CreatePublicationDto) {
        return await this.prisma.publication.create({
            data: body,
        });
    }

    async findAllPubs () {
        return await this.prisma.publication.findMany({});
    }

    async getPubById (id : number) {
        return await this.prisma.publication.findMany({ where: { id } });
    }

    async getPubByMediaId (id : number) {
        return await this.prisma.publication.findMany({ where: { mediaId: id } });
    }

    async getPubByPostId (id : number) {
        return await this.prisma.publication.findMany({ where: { postId: id } });
    }

    async updatePubById (id : number, body: UpdatePublicationDto) {
        return await this.prisma.publication.update({ where: { id }, data: body });
    }

    async deletePubById (id : number) {
        return await this.prisma.publication.delete({ where: { id } });
    }
}
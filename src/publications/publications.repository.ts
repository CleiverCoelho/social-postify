import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
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

    async findAllPubs (published: string, after: Date) {
        const currentDate = new Date();
        return await this.prisma.publication.findMany({
            where: {
                date: {
                    lt: published ? currentDate : undefined,
                    gt: published === "false" ? currentDate : undefined
                },
                AND : {
                    date: {
                        gt: after ? new Date(after) : undefined
                    }
                }
            }
        });
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
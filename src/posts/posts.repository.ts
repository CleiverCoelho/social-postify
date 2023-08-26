import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreatePostDto } from "./dto/create-post.dto";

@Injectable()
export class PostsRepository {
    constructor( private readonly prisma: PrismaService) { }

    async createPost (body : CreatePostDto) {
        return await this.prisma.post.create({
            data: body,
        })
    }

    async findAllPosts () {
        return await this.prisma.post.findMany({})
    }

    async getPostById (id : number) {
        return await this.prisma.post.findMany({ where: { id } })
    }
}
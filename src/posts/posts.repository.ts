import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";

@Injectable()
export class PostsRepository {
    constructor( private readonly prisma: PrismaService) { }

    async createPost (body : CreatePostDto) {
        return await this.prisma.post.create({
            data: body,
        });
    }

    async findAllPosts () {
        return await this.prisma.post.findMany({});
    }

    async getPostById (id : number) {
        return await this.prisma.post.findMany({ where: { id } });
    }

    async updatePostByid (id : number, body: UpdatePostDto) {
        return await this.prisma.post.update({ where: { id }, data: body });
    }

    async deletePostByid (id : number) {
        return await this.prisma.post.delete({ where: { id } });
    }
}
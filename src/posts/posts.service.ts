import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostsRepository } from './posts.repository';

@Injectable()
export class PostsService {
  constructor(private readonly postsRepository: PostsRepository) { }

  async createpost(body: CreatePostDto) {
    return await this.postsRepository.createPost(body);
  }

  async findAllPosts() {
    const mediaData = await this.postsRepository.findAllPosts(); 
    const responseMedia = mediaData.map(({ id, title, text, image }) => { 
      if(image) return { id, title, text, image }
      else return { id, title, text }
    })
    return responseMedia;
  }

  async getPostbyId(id: number) {
    const mediaData = await this.postsRepository.getPostById(id); 
    const responseMedia = mediaData.map(({ id, title, text, image }) => { 
      if(image) return { id, title, text, image }
      else return { id, title, text }
    })
    return responseMedia;
  }

  async updatePostById(id: number, body: UpdatePostDto) {
    return await this.postsRepository.updatePostByid(id, body);
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}

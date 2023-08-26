import { ForbiddenException, Inject, Injectable, NotFoundException, forwardRef } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostsRepository } from './posts.repository';
import { PublicationsService } from 'src/publications/publications.service';

@Injectable()
export class PostsService {
  constructor(
    private readonly postsRepository: PostsRepository,
    @Inject(forwardRef(() => PublicationsService))
    private readonly pubService: PublicationsService
  ) { }

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
    const checkForPost = await this.postsRepository.getPostById(id);
    if(checkForPost.length === 0) throw new NotFoundException(`The request for postId=${id} does not exist`);
    
    const mediaData = await this.postsRepository.getPostById(id); 
    const responseMedia = mediaData.map(({ id, title, text, image }) => { 
      if(image) return { id, title, text, image }
      else return { id, title, text }
    })
    return responseMedia;
  }

  async updatePostById(id: number, body: UpdatePostDto) {
    const checkForPost = await this.postsRepository.getPostById(id);
    if(checkForPost.length === 0) throw new NotFoundException(`The update request for postId=${id} does not exist`);
    
    return await this.postsRepository.updatePostByid(id, body);
  }

  async deletePostById(id: number) {
    const checkForPost = await this.postsRepository.getPostById(id);
    if(checkForPost.length === 0) throw new NotFoundException(`The update request for postId=${id} does not exist`);
    
    const checkForpostPub = await this.pubService.getPubByPostId(id);
    if(checkForpostPub.length > 0) throw new ForbiddenException(`There is an active publication for given postId=${id}`);
    return this.postsRepository.deletePostByid(id);
  }
}

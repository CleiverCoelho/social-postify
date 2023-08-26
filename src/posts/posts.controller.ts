import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe, Put, HttpException } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  createpost(@Body() body: CreatePostDto) {
    return this.postsService.createpost(body);
  }

  @Get()
  findAllposts() {
    return this.postsService.findAllPosts();
  }

  @Get(':id')
  getPostById(@Param('id', ParseIntPipe) id: number) {
    try {
      return this.postsService.getPostbyId(id);
    } catch(error) {
      throw new HttpException(error.message, error.statusCode);
    }
  }

  @Put(':id')
  updatePostById(@Param('id', ParseIntPipe) id: number, @Body() updatePostDto: UpdatePostDto) {
    try {
      return this.postsService.updatePostById(id, updatePostDto);
    } catch(error) {
      throw new HttpException(error.message, error.statusCode);
    }
  }

  @Delete(':id')
  deletePostById(@Param('id', ParseIntPipe) id: number) {
    try {
      return this.postsService.deletePostById(+id);
    } catch(error) {
      throw new HttpException(error.message, error.statusCode);
    }
  }
}

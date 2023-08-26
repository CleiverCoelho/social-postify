import { Injectable } from '@nestjs/common';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { MediasRepository } from './medias.repository';

@Injectable()
export class MediasService {
  constructor(private readonly mediasRepository : MediasRepository) { }
  
  async createMedia ( body : CreateMediaDto) {
    const { title, username } = body;
    return await this.mediasRepository.createMedia({ title, username });
  }

  async findAllMedias() {
    const mediaData = await this.mediasRepository.findAllMedias();
    const responseMedia = mediaData.map(({ id, title, username }) => { 
      return { id, title, username }
    })
    return responseMedia;
  }

  async getMediaById(id: number) {
    const mediaData = await this.mediasRepository.getMediaById(id);
    const responseMedia = mediaData.map(({ id, title, username }) => { 
      return { id, title, username }
    })
    
    return responseMedia;
  }

  update(id: number, updateMediaDto: UpdateMediaDto) {
    return `This action updates a #${id} media`;
  }

  remove(id: number) {
    return `This action removes a #${id} media`;
  }
}
import { Body, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { MediasRepository } from './medias.repository';

@Injectable()
export class MediasService {
  constructor(private readonly mediasRepository : MediasRepository) { }
  
  async createMedia ( body : CreateMediaDto) {
    const { title, username } = body;
    const checkExistingMedia = await this.mediasRepository.checkExistingMedia({ title, username });
    if(checkExistingMedia) throw new ConflictException();
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
    if(responseMedia.length === 0) throw new NotFoundException(`media with id=${id} was not found!`);
    return responseMedia;
  }

  async updateMediaById(id: number, body: UpdateMediaDto) {
    return await this.mediasRepository.updateMediaById(id, body);
  }

  async deleteMediaById(id: number) {
    return this.mediasRepository.deleteMediaById(id);
  }
}

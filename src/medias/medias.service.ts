import { Body, ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { MediasRepository } from './medias.repository';
import { PublicationsRepository } from 'src/publications/publications.repository';
import { PublicationsService } from 'src/publications/publications.service';

@Injectable()
export class MediasService {
  constructor(
    private readonly mediasRepository : MediasRepository, 
    private readonly pubService : PublicationsService 
  ) { }
  
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
    const { title, username } = body;
    const notMedia = await this.mediasRepository.getMediaById(id);
    if(notMedia.length === 0) throw new NotFoundException(`the id=${id} was not found for the update`);
    const checkExistingMedia = await this.mediasRepository.checkExistingMedia({ title, username });
    if(checkExistingMedia) throw new ConflictException(`${notMedia}`);
    return await this.mediasRepository.updateMediaById(id, body);
  }

  async deleteMediaById(id: number) {
    const notMedia = await this.mediasRepository.getMediaById(id);
    if(notMedia.length === 0) throw new NotFoundException(`the id=${id} was not found for the update`);
    
    const checkForMediaPub = await this.pubService.getPubByMediaId(id);
    if(checkForMediaPub.length > 0) throw new ForbiddenException(`there is already a publication associated with the mediaId=${id}`);
    return this.mediasRepository.deleteMediaById(id);
  }
}

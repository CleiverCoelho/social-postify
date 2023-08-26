import { Injectable } from '@nestjs/common';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';
import { PublicationsRepository } from './publications.repository';

@Injectable()
export class PublicationsService {
  constructor( private readonly pubRepository : PublicationsRepository) { }

  async createPub(body: CreatePublicationDto) {
    return await this.pubRepository.createPub(body);
  }

  async findAllPubs() {
    const mediaData = await this.pubRepository.findAllPubs();
    const responseMedia = mediaData.map(({ id, mediaId, postId, date }) => { 
      return { id, mediaId, postId, date }
    })
    return responseMedia;  
  }

  async getMediaById(id: number) {
    const mediaData = await this.pubRepository.getPubById(id);
    const responseMedia = mediaData.map(({ id, mediaId, postId, date }) => { 
      return { id, mediaId, postId, date }
    })
    return responseMedia;  
  }

  async updatePubById(id: number, body: UpdatePublicationDto) {
    return await this.pubRepository.updatePubById(id, body);
  }

  async deletePubById(id: number) {
    return await this.pubRepository.deletePubById(id);
  }
}

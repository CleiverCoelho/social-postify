import { Inject, Injectable, NotFoundException, forwardRef } from '@nestjs/common';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';
import { PublicationsRepository } from './publications.repository';
import { MediasService } from 'src/medias/medias.service';
import { PostsService } from 'src/posts/posts.service';
import { NotFoundError, find } from 'rxjs';

@Injectable()
export class PublicationsService {
  constructor(
    private readonly pubRepository: PublicationsRepository,
    @Inject(forwardRef(() => PostsService))
    private readonly postsService : PostsService,
    @Inject(forwardRef(() => MediasService))
    private readonly mediasService: MediasService,
  ) { }

  async createPub(body: CreatePublicationDto) {
    const { mediaId, postId } = body;
    // como puxa as funcoes da service o throw ja eh feito
    // a partir da propria
    await this.postsService.getPostbyId(postId);
    await this.mediasService.getMediaById(mediaId);
    return await this.pubRepository.createPub(body);
  }

  async findAllPubs() {
    const mediaData = await this.pubRepository.findAllPubs();
    const responseMedia = mediaData.map(({ id, mediaId, postId, date }) => { 
      return { id, mediaId, postId, date }
    })
    return responseMedia;  
  }

  async getPubById(id: number) {
    const mediaData = await this.pubRepository.getPubById(id);
    if(mediaData.length === 0) throw new NotFoundException(`There is no publication for given id=${id}`);
    const responseMedia = mediaData.map(({ id, mediaId, postId, date }) => { 
      return { id, mediaId, postId, date }
    })
    return responseMedia;  
  }

  async getPubByMediaId(id: number) {
    const mediaData = await this.pubRepository.getPubByMediaId(id);
    const responseMedia = mediaData.map(({ id, mediaId, postId, date }) => { 
      return { id, mediaId, postId, date }
    })
    return responseMedia;  
  }

  async getPubByPostId(id: number) {
    const mediaData = await this.pubRepository.getPubByPostId(id);
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

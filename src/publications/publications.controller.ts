import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { PublicationsService } from './publications.service';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';

@Controller('publications')
export class PublicationsController {
  constructor(private readonly publicationsService: PublicationsService) {}

  @Post()
  createPub(@Body() createPublicationDto: CreatePublicationDto) {
    return this.publicationsService.createPub(createPublicationDto);
  }

  @Get()
  findAllPubs() {
    return this.publicationsService.findAllPubs();
  }

  @Get(':id')
  getMediaById(@Param('id', ParseIntPipe) id: number) {
    return this.publicationsService.getMediaById(+id);
  }

  @Patch(':id')
  updatePubById(@Param('id', ParseIntPipe) id: number, @Body() updatePublicationDto: UpdatePublicationDto) {
    return this.publicationsService.updatePubById(+id, updatePublicationDto);
  }

  @Delete(':id')
  deletePubById(@Param('id', ParseIntPipe) id: number) {
    return this.publicationsService.deletePubById(+id);
  }
}

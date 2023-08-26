import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe, Put } from '@nestjs/common';
import { MediasService } from './medias.service';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';

@Controller('medias')
export class MediasController {
  constructor(private readonly mediasService: MediasService) {}

  @Post()
  createMedia(@Body() createMediaDto: CreateMediaDto) {
    return this.mediasService.createMedia(createMediaDto);
  }

  @Get()
  findAllMedias() {
    return this.mediasService.findAllMedias();
  }

  @Get(':id')
  findOneMedia(@Param('id', ParseIntPipe) id: number) {
    return this.mediasService.getMediaById(id);
  }

  @Put(':id')
  updateMediaById(@Param('id', ParseIntPipe) id: number, @Body() updateMediaDto: UpdateMediaDto) {
    return this.mediasService.updateMediaById(id, updateMediaDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.mediasService.deleteMediaById(id);
  }
}

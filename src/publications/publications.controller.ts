import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, HttpException, Put, Optional, Query } from '@nestjs/common';
import { PublicationsService } from './publications.service';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';
import { OptionalFindAllFilter } from './dto/optional-filter.dto';

@Controller('publications')
export class PublicationsController {
  constructor(private readonly publicationsService: PublicationsService) {}

  @Post()
  createPub(@Body() createPublicationDto: CreatePublicationDto) {
    try{
      return this.publicationsService.createPub(createPublicationDto);
    }catch(error){
      throw new HttpException(error.message, error.statusCode);
    }
  }

  @Get()
  findAllPubs(@Query() query : OptionalFindAllFilter) {
    return this.publicationsService.findAllPubs(query.published , query.after);
  }

  @Get(':id')
  getPubById(@Param('id', ParseIntPipe) id: number) {
    try {
      return this.publicationsService.getPubById(+id);
    }catch(error){
      throw new HttpException(error.message, error.statusCode);
    }
  }

  @Put(':id')
  updatePubById(@Param('id', ParseIntPipe) id: number, @Body() updatePublicationDto: UpdatePublicationDto) {
    try {
      return this.publicationsService.updatePubById(+id, updatePublicationDto);
    }catch(error){
      throw new HttpException(error.message, error.statusCode);
    }
  }

  @Delete(':id')
  deletePubById(@Param('id', ParseIntPipe) id: number) {
    try {
      return this.publicationsService.deletePubById(+id);
    }catch(error){
      throw new HttpException(error.message, error.statusCode);
    }
  }
}

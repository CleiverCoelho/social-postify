import { Module } from '@nestjs/common';
import { MediasService } from './medias.service';
import { MediasController } from './medias.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { MediasRepository } from './medias.repository';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PublicationsModule } from 'src/publications/publications.module';

@Module({
  imports: [PrismaModule, PublicationsModule],
  controllers: [MediasController],
  providers: [MediasService, MediasRepository],
})
export class MediasModule {}

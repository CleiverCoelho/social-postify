import { faker } from '@faker-js/faker';
import { PrismaService } from 'src/prisma/prisma.service';

type CreatePubType = {
  mediaId: number;
  postId: number;
  date: Date;
};

export function createPubSchema(mediaId: number, postId: number, date : string) {
  return {
    mediaId,
    postId,
    date: date === 'future' ? faker.date.future() : faker.date.past()
  };
}

export function createPubDB(data: CreatePubType, prisma: PrismaService) {
  return prisma.publication.create({
    data,
    select: { id: true, mediaId: true, postId: true, date: true },
  });
}
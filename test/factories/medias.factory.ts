import { faker } from '@faker-js/faker';
import { PrismaService } from 'src/prisma/prisma.service';

type CreateMediaType = {
  title: string;
  username: string;
};

export function createMediaSchema() {
  return {
    title: faker.internet.domainName(),
    username: faker.internet.url(),
  };
}

export function createMediaSchemaWithoutUsername() {
    return {
      title: faker.internet.domainName()
    };
  }

export function createMediaDB(data: CreateMediaType, prisma: PrismaService) {
  return prisma.media.create({
    data,
    select: { id: true, title: true, username: true },
  });
}
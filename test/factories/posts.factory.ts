import { faker } from '@faker-js/faker';
import { PrismaService } from 'src/prisma/prisma.service';

type CreatePostType = {
  title: string;
  text: string;
  image: string;
};

type CreatePostWithoutImageType = {
    title: string;
    text: string;
    image: string;
};

type CreatePostWithoutTitleType = {
    title: string;
    text: string;
    image: string;
};

export function createPostSchema() {
  return {
    title: faker.internet.domainName(),
    text: faker.lorem.text(),
    image: faker.internet.url()
  };
}

export function createPostSchemaWithoutImage() {
    return {
      title: faker.internet.domainName(),
      text: faker.lorem.text(),
    };
}

export function createPostSchemaWithoutImageURL() {
    return {
      title: faker.internet.domainName(),
      text: faker.lorem.text(),
      image: "eu sou uma imagem string"
    };
}

export function createPostSchemaWithoutTitle() {
    return {
      text: faker.lorem.text(),
      image: faker.internet.url()
    };
}

export function createPostDB(data: CreatePostType, prisma: PrismaService) {
  return prisma.post.create({
    data,
    select: { id: true, title: true, text: true, image: data.image ? true : false },
  });
}

export function createPostWithoutImageDB(data: CreatePostWithoutImageType, prisma: PrismaService) {
    return prisma.post.create({
      data,
      select: { id: true, title: true, text: true, image: data.image ? true : false },
    });
}

export function createPostWithoutTitleDB(data: CreatePostWithoutTitleType, prisma: PrismaService) {
    return prisma.post.create({
      data,
      select: { id: true, title: true, text: true, image: data.image ? true : false },
    });
}
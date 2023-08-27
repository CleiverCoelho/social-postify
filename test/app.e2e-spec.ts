import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { PrismaModule } from '../src/prisma/prisma.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { createMediaDB, createMediaSchema, createMediaSchemaWithoutUsername } from './factories/medias.factory';
import { createPostDB, createPostSchema, createPostSchemaWithoutImage, createPostSchemaWithoutImageURL } from './factories/posts.factory';
import { createPubDB, createPubSchema } from './factories/publications.factory';

describe('/medias', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, PrismaModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    prisma = await moduleFixture.resolve(PrismaService);
    
    await prisma.publication.deleteMany();
    await prisma.media.deleteMany();
    await prisma.post.deleteMany();

    await app.init();
  });

  it('GET should respond with status code 200 and response list length equals to 1', async () => {
    //setup
    const media = await createMediaDB(createMediaSchema(), prisma); 

    let response = await request(app.getHttpServer()).get('/medias');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveLength(1);
  });

  it('POST should create a new media with valid title and username', async () => {
    //setup
    const media = createMediaSchema(); 

    let response = await request(app.getHttpServer()).post('/medias').send(media);
    expect(response.statusCode).toBe(HttpStatus.CREATED);
  });

  it('POST should respond with status 400 with invalid username', async () => {
    //setup
    const media = createMediaSchemaWithoutUsername(); 

    let response = await request(app.getHttpServer()).post('/medias').send(media);
    expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
  });

  it('GET :id should respond with status 200 for valid mediaId', async () => {
    //setup
    const media = await createMediaDB(createMediaSchema(), prisma); 

    let response = await request(app.getHttpServer()).get(`/medias/${media.id}`);
    expect(response.statusCode).toBe(HttpStatus.OK);
  });

  it('GET :id should respond with status 404 for invalid mediaId', async () => {
    //setup
    const media = await createMediaDB(createMediaSchema(), prisma); 

    let response = await request(app.getHttpServer()).get(`/medias/5`);
    expect(response.statusCode).toBe(HttpStatus.NOT_FOUND);
  });

  it('PUT :id should respond with status 200 for mediaId, title and username', async () => {
    //setup
    const media = await createMediaDB(createMediaSchema(), prisma); 
    const updatedMedia = createMediaSchema();

    let response = await request(app.getHttpServer()).put(`/medias/${media.id}`).send(updatedMedia);
    expect(response.statusCode).toBe(HttpStatus.OK);
  });

  it('PUT :id should respond with status 404 for invalid mediaId', async () => {
    //setup
    const media = await createMediaDB(createMediaSchema(), prisma); 
    const updatedMedia = createMediaSchema();

    let response = await request(app.getHttpServer()).put(`/medias/5`).send(updatedMedia);
    expect(response.statusCode).toBe(HttpStatus.NOT_FOUND);
  });

  it('PUT :id should respond with status 409 if title and username is already created', async () => {
    //setup
    const media = await createMediaDB(createMediaSchema(), prisma); 
    const { title, username } = await createMediaDB(createMediaSchema(), prisma);

    let response = await request(app.getHttpServer()).put(`/medias/${media.id}`).send({ title, username });
    expect(response.statusCode).toBe(HttpStatus.CONFLICT);
  });

  it('DELETE :id should respond with status 200 for valid mediaId', async () => {
    //setup
    const media = await createMediaDB(createMediaSchema(), prisma); 

    let response = await request(app.getHttpServer()).delete(`/medias/${media.id}`)
    expect(response.statusCode).toBe(HttpStatus.OK);
  });

  it('DELETE :id should respond with status 409 if mediaId is associated with a publication', async () => {
    //setup
    const media = await createMediaDB(createMediaSchema(), prisma); 
    const post = await createPostDB(createPostSchema(), prisma);
    const publication = await createPubDB(createPubSchema(media.id, post.id, 'future'), prisma);

    let response = await request(app.getHttpServer()).delete(`/medias/${media.id}`)
    expect(response.statusCode).toBe(HttpStatus.FORBIDDEN);
  });

});

describe('/posts', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, PrismaModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    prisma = await moduleFixture.resolve(PrismaService);
    
    await prisma.publication.deleteMany();
    await prisma.media.deleteMany();
    await prisma.post.deleteMany();

    await app.init();
  });

  it('GET should respond with status code 200 and response list length equals to 1', async () => {
    //setup
    const post = await createPostDB(createPostSchema(), prisma); 

    let response = await request(app.getHttpServer()).get('/posts');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveLength(1);
  });

  it('POST should create a new post with valid title, text and image', async () => {
    //setup
    const post = createPostSchema();

    let response = await request(app.getHttpServer()).post('/posts').send(post);
    expect(response.statusCode).toBe(HttpStatus.CREATED);
    console.log(response.error);
  });

  it('POST should respond with status 201 witih body without image', async () => {
    //setup
    const post = createPostSchemaWithoutImage(); 

    let response = await request(app.getHttpServer()).post('/posts').send(post);
    expect(response.statusCode).toBe(HttpStatus.CREATED);
  });

  it('POST should respond with status 400 when image is not a url', async () => {
    //setup
    const post = createPostSchemaWithoutImageURL(); 

    let response = await request(app.getHttpServer()).post('/posts').send(post);
    expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
  });

  it('GET :id should respond with status 200 for valid postId', async () => {
    //setup
    const post = await createPostDB(createPostSchema(), prisma); 

    let response = await request(app.getHttpServer()).get(`/posts/${post.id}`);
    expect(response.statusCode).toBe(HttpStatus.OK);
  });

  it('GET :id should respond with status 404 for invalid postId', async () => {
    //setup
    const post = await createPostDB(createPostSchema(), prisma); 

    let response = await request(app.getHttpServer()).get(`/posts/5`);
    expect(response.statusCode).toBe(HttpStatus.NOT_FOUND);
  });

  it('PUT :id should respond with status 200 for postId, title, text and image', async () => {
    //setup
    const post = await createPostDB(createPostSchema(), prisma); 
    const updatedPost = createPostSchemaWithoutImage(); 

    let response = await request(app.getHttpServer()).put(`/posts/${post.id}`).send(updatedPost);
    expect(response.statusCode).toBe(HttpStatus.OK);
  });

  it('PUT :id should respond with status 400 for valid postId, title, text but invalid imageURL', async () => {
    //setup
    const post = await createPostDB(createPostSchema(), prisma); 
    const updatedPost = createPostSchemaWithoutImageURL(); 

    let response = await request(app.getHttpServer()).put(`/posts/${post.id}`).send(updatedPost);
    expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
  });

  it('PUT :id should respond with status 404 for invalid postId', async () => {
    //setup
    const post = await createPostDB(createPostSchema(), prisma); 
    const updatedPost = createPostSchema(); 

    let response = await request(app.getHttpServer()).put(`/posts/5`).send(updatedPost);
    expect(response.statusCode).toBe(HttpStatus.NOT_FOUND);
  });

  it('DELETE :id should respond with status 200 for valid postId', async () => {
    //setup
    const post = await createPostDB(createPostSchema(), prisma); 

    let response = await request(app.getHttpServer()).delete(`/posts/${post.id}`)
    expect(response.statusCode).toBe(HttpStatus.OK);
  });

  it('DELETE :id should respond with status 409 if mediaId is associated with a publication', async () => {
    //setup
    const media = await createMediaDB(createMediaSchema(), prisma); 
    const post = await createPostDB(createPostSchema(), prisma);
    const publication = await createPubDB(createPubSchema(media.id, post.id, 'future'), prisma);

    let response = await request(app.getHttpServer()).delete(`/posts/${post.id}`)
    expect(response.statusCode).toBe(HttpStatus.FORBIDDEN);
  });

  it('DELETE :id should respond with status 404 for invalid postId', async () => {
    //setup
    const post = await createPostDB(createPostSchema(), prisma);

    let response = await request(app.getHttpServer()).delete(`/posts/5`)
    expect(response.statusCode).toBe(HttpStatus.NOT_FOUND);
  });

});

describe('/publications', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, PrismaModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    prisma = await moduleFixture.resolve(PrismaService);
    
    await prisma.publication.deleteMany();
    await prisma.media.deleteMany();
    await prisma.post.deleteMany();

    await app.init();
  });

  it('GET should respond with status code 200 and response list length equals to 1', async () => {
    //setup
    const media = await createMediaDB(createMediaSchema(), prisma); 
    const post = await createPostDB(createPostSchema(), prisma);
    const publication = await createPubDB(createPubSchema(media.id, post.id, 'future'), prisma);
    
    let response = await request(app.getHttpServer()).get('/publications');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveLength(1);
  });

  // it('POST should create a new post with valid title, text and image', async () => {
  //   //setup
  //   const post = createPostSchema();

  //   let response = await request(app.getHttpServer()).post('/publications').send(post);
  //   expect(response.statusCode).toBe(HttpStatus.CREATED);
  //   console.log(response.error);
  // });

  // it('POST should respond with status 201 witih body without image', async () => {
  //   //setup
  //   const post = createPostSchemaWithoutImage(); 

  //   let response = await request(app.getHttpServer()).post('/publications').send(post);
  //   expect(response.statusCode).toBe(HttpStatus.CREATED);
  // });

  // it('POST should respond with status 400 when image is not a url', async () => {
  //   //setup
  //   const post = createPostSchemaWithoutImageURL(); 

  //   let response = await request(app.getHttpServer()).post('/publications').send(post);
  //   expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
  // });

  // it('GET :id should respond with status 200 for valid publicationId', async () => {
  //   //setup
  //   const post = await createPostDB(createPostSchema(), prisma); 

  //   let response = await request(app.getHttpServer()).get(`/publications/${post.id}`);
  //   expect(response.statusCode).toBe(HttpStatus.OK);
  // });

  // it('GET :id should respond with status 404 for invalid publicationId', async () => {
  //   //setup
  //   const post = await createPostDB(createPostSchema(), prisma); 

  //   let response = await request(app.getHttpServer()).get(`/publications/5`);
  //   expect(response.statusCode).toBe(HttpStatus.NOT_FOUND);
  // });

  // it('PUT :id should respond with status 200 for postId, title, text and image', async () => {
  //   //setup
  //   const post = await createPostDB(createPostSchema(), prisma); 
  //   const updatedPost = createPostSchemaWithoutImage(); 

  //   let response = await request(app.getHttpServer()).put(`/publications/${post.id}`).send(updatedPost);
  //   expect(response.statusCode).toBe(HttpStatus.OK);
  // });

  // it('PUT :id should respond with status 400 for valid postId, title, text but invalid imageURL', async () => {
  //   //setup
  //   const post = await createPostDB(createPostSchema(), prisma); 
  //   const updatedPost = createPostSchemaWithoutImageURL(); 

  //   let response = await request(app.getHttpServer()).put(`/publications/${post.id}`).send(updatedPost);
  //   expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
  // });

  // it('PUT :id should respond with status 404 for invalid publicationId', async () => {
  //   //setup
  //   const post = await createPostDB(createPostSchema(), prisma); 
  //   const updatedPost = createPostSchema(); 

  //   let response = await request(app.getHttpServer()).put(`/publications/5`).send(updatedPost);
  //   expect(response.statusCode).toBe(HttpStatus.NOT_FOUND);
  // });

  // it('DELETE :id should respond with status 200 for valid publicationId', async () => {
  //   //setup
  //   const post = await createPostDB(createPostSchema(), prisma); 

  //   let response = await request(app.getHttpServer()).delete(`/publications/${post.id}`)
  //   expect(response.statusCode).toBe(HttpStatus.OK);
  // });

  // it('DELETE :id should respond with status 409 if mediaId is associated with a publication', async () => {
  //   //setup
  //   const media = await createMediaDB(createMediaSchema(), prisma); 
  //   const post = await createPostDB(createPostSchema(), prisma);
  //   const publication = await createPubDB(createPubSchema(media.id, post.id, 'future'), prisma);

  //   let response = await request(app.getHttpServer()).delete(`/publications/${post.id}`)
  //   expect(response.statusCode).toBe(HttpStatus.FORBIDDEN);
  // });

  // it('DELETE :id should respond with status 404 for invalid publicationId', async () => {
  //   //setup
  //   const post = await createPostDB(createPostSchema(), prisma);

  //   let response = await request(app.getHttpServer()).delete(`/publications/5`)
  //   expect(response.statusCode).toBe(HttpStatus.NOT_FOUND);
  // });

});
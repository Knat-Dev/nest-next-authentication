import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private readonly postsRepository: Repository<Post>,
    private readonly connection: Connection,
  ) {}

  getAllPosts = async () => {
    return await this.postsRepository.find();
  };

  getPostById = async (postId: number) => {
    const post = await this.postsRepository.findOne(postId);
    if (!post) Post.notFoundException(postId);
    return post;
  };

  createPost = async (createPostDto: CreatePostDto) => {
    const post = this.postsRepository.create(createPostDto);

    await post.save();
    return post;
  };

  deletePost = async (postId: number, user: User) => {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const post = await queryRunner.manager.findOne(Post, postId);
      if (!post) {
        Post.notFoundException(postId);
      }
      if (post.user.id !== user.id) {
        Post.notFoundException(postId);
      }

      await queryRunner.manager.delete(Post, postId);
      await queryRunner.commitTransaction();

      return post;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    }
  };
}

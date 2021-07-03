import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private readonly postsRepository: Repository<Post>,
    private readonly connection: Connection,
  ) {}

  async create(createPostDto: CreatePostDto, user: User) {
    createPostDto.user = user;
    const post = this.postsRepository.create(createPostDto);

    await post.save();
    return post;
  }

  async findAll() {
    return await this.postsRepository.find();
  }

  async findOne(id: number) {
    const post = await this.postsRepository.findOne(id);
    if (!post) Post.notFoundException(id);
    return post;
  }

  async update(id: number, updatePostDto: UpdatePostDto, user: User) {
    return await this.connection.transaction(async (manager) => {
      const post = await manager.findOne(Post, id);
      if (!post) {
        Post.notFoundException(id);
      }
      if (post.user.id !== user.id) {
        Post.notFoundException(id);
      }
      if (
        updatePostDto.title === post.title &&
        updatePostDto.markdown === post.markdown
      ) {
        return post;
      }

      await manager.update(Post, id, updatePostDto);

      return { ...post, ...updatePostDto };
    });
  }

  async remove(id: number, user: User) {
    return await this.connection.transaction(async (manager) => {
      const post = await manager.findOne(Post, id);
      if (!post) {
        Post.notFoundException(id);
      }
      if (post.user.id !== user.id) {
        Post.notFoundException(id);
      }

      await manager.delete(Post, id);

      return post;
    });
  }
}

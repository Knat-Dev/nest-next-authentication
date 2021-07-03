import {
    Body,
    Controller,
    Delete,
    Param,
    Post,
    UseGuards
} from '@nestjs/common';
import { GetUser } from '../auth/get-user.decorator';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { User } from '../users/user.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsService } from './posts.service';

@Controller()
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createPostDto: CreatePostDto, @GetUser() user: User) {
    createPostDto.user = user;
    return this.postsService.createPost(createPostDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  delete(@Param('id') id: number, @GetUser() user: User) {
    return this.postsService.deletePost(id,user);
  }
}

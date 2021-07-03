import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreatePostDto } from './create-post.dto';

export class UpdatePostDto extends OmitType(PartialType(CreatePostDto), [
  'user',
] as const) {}

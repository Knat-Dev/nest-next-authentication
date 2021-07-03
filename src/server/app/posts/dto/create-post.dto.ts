import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { User } from '../../users/user.entity';

export class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(128)
  title: string;
  @IsNotEmpty()
  @IsString()
  @MinLength(32)
  markdown: string;

  user: User;
}

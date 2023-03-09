import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { ArticleService } from './article.service';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}
  // here all route is article route
  @Get('')
  async getAllArticle(@Req() req: Request, @Query('page') page) {
    return await this.articleService.getAllArticle(page);
  }
  @Get(':id')
  async getSignelArticle(@Param('id') articleId: string) {
    return this.articleService.getSingleArticle(articleId);
  }
  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  async editSingleArticle(
    @Param('id') articleId: string,
    @Body() body,
    @Req() req: Request,
  ) {
    const user = req['user'];
    return this.articleService.editSingleArticle(articleId, body, user);
  }
  @Post('new')
  @UseGuards(AuthGuard('jwt'))
  async createNewArticle(@Req() req: Request, @Body() body) {
    const user = req['user'];
    return this.articleService.createNewArticle(user, body);
  }
  @Delete(':id/delete')
  @UseGuards(AuthGuard('jwt'))
  async deleteSingleArticle(
    @Req() req: Request,
    @Param('id') articleId: string,
  ) {
    const user = req['user'];
    return await this.articleService.deleteSingleArticle(articleId, user);
  }
  // here I defined some comment routes regarding my database design
  @Post(':id/comment')
  @UseGuards(AuthGuard('jwt'))
  async createComment(
    @Req() req: Request,
    @Param('id') articleId: string,
    @Body() comment,
  ) {
    const user = req['user'];
    const { content } = comment;
    return this.articleService.createComment(user, articleId, content);
  }
  // delete comment
  @Delete(':articleId/:commentId')
  @UseGuards(AuthGuard('jwt'))
  async deleteComment(@Req() req: Request, @Param() param) {
    const user = req['user'];
    return this.articleService.deleteComment(user, param);
  }
}

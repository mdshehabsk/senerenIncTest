import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Article } from 'src/schema/article.schema';
import { createArticleDto } from './dto';
import { format } from 'date-fns';
import { AuthService } from 'src/auth/auth.service';
@Injectable()
export class ArticleService {
  constructor(
    @InjectModel('Article') private readonly Article: Model<Article>,
    private readonly authService: AuthService,
  ) {}

  async getAllArticle(page) {
    let skip: any = page;
    const limit = 10;
    const allArticle = await this.Article.find()
      .skip(skip * limit)
      .limit(limit)
      .populate('author', 'name email _id')
      .select('-comment');
    return { allArticle };
  }
  async createNewArticle(user, article: createArticleDto) {
    const { title, body } = article;
    if (!title || !body) {
      throw new BadRequestException('please fill the field');
    }
    if (title.length > 60) {
      throw new BadRequestException(
        'title length should be shorter then 60 chrectar',
      );
    }
    if (body.length > 500) {
      throw new BadRequestException(
        'body length should be shorter then 500 chrectar',
      );
    }
    const date = format(new Date(), 'dd/MM/yyyy');
    const time = format(new Date(), 'hh:mm a');

    const a = await new this.Article({
      title,
      body,
      date,
      time,
      author: user.id,
    }).save();
    return {
      message: 'article create successfull',
    };
  }
  async getSingleArticle(articleId: string) {
    return await this.Article.findById(articleId).populate(
      'comment.author author',
      'name ',
    );
  }
  async editSingleArticle(articleId: string, body: createArticleDto, User) {
    const user = await this.authService.userInfo(User.id);
    const article: any = await this.getSingleArticle(articleId);
    console.log(user, article);
    const permit =
      article.author?._id.toString() === user._id.toString() ||
      user.role === 'admin';
    if (!permit) {
      throw new BadRequestException('youre not the author');
    }
    const date = format(new Date(), 'dd/MM/yyyy');
    const time = format(new Date(), 'hh:mm a');
    await this.Article.findByIdAndUpdate(articleId, {
      title: body.title,
      body: body.body,
      date,
      time,
    });
    return {
      message: 'article update successfull',
    };
  }
  async deleteSingleArticle(articleId: string, User) {
    const user = await this.authService.userInfo(User.id);
    const article: any = await this.getSingleArticle(articleId);
    const permit =
      article.author?._id.toString() === user._id.toString() ||
      user.role === 'admin';
    if (!permit) {
      throw new BadRequestException('youre not an author');
    }

    await this.Article.findByIdAndDelete(articleId);
    return {
      message: 'article delete successfull',
    };
  }
  // here is the article logic
  async createComment(user, articleId, content: string) {
    if (content.length > 100) {
      throw new BadRequestException(
        'comment length should be shorter then 100 charectar',
      );
    }
    await (
      await this.Article.findByIdAndUpdate(articleId, {
        $push: { comment: { content, author: user.id } },
      })
    ).save();
    return {
      message: 'comment create successfull',
    };
  }
  async deleteComment(User, param) {
    const { articleId, commentId } = param;
    const user = await this.authService.userInfo(User.id);
    const article: any = await this.getSingleArticle(articleId);
    const comment = await this.Article.findById(articleId, {
      comment: { $elemMatch: { _id: commentId } },
    });
    const permit =
      user.id === comment.comment[0]?.author.toString() ||
      user.id === article?.author?.id ||
      user.role === 'admin';
    if (!permit) {
      throw new BadRequestException('youre not an author');
    }
    await this.Article.findByIdAndUpdate(articleId, {
      $pull: {
        comment: { _id: commentId },
      },
    });
    return {
      message: 'delete successfull',
    };
  }
}

import { Schema } from 'mongoose';

const CommentSchema = new Schema({
  content: {
    type: String,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

export const ArticleSchema = new Schema({
  title: {
    type: String,
  },
  body: {
    type: String,
  },
  date: {
    type: String,
  },
  time: {
    type: String,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  comment: [CommentSchema],
});

export class Article {
  constructor(
    public _id: string,
    public title: string,
    public body: string,
    public date: string,
    public time: string,
    public author: string,
    public comment: {
      body: string;
      author: string;
    },
  ) {}
}

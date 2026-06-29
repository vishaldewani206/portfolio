import {model, models, Schema} from "mongoose"


export interface IBlog {
  _id?: string;
  title: string;
  description: string;
  content: string;
  cover: string;
  publish: boolean;
  views: number;
  likes: number;
  comments: number;
  created_at: Date;
  updated_at: Date;
}


const blogSchema = new Schema<IBlog>({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  cover: {
    type: String,
    required: true
  },
  publish: {
    type: Boolean,
    default: false
  },
  views: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  },
  comments:{
    type: Number,
    default: 0
  }
}, {timestamps: true})

const Blog = models.Blog || model("Blog", blogSchema)
export default Blog
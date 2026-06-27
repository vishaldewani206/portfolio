import mongoose, {model, models, Schema} from "mongoose"


export interface IBlog {
  _id?: string;
  title: string;
  description: string;
  content: string;
  views: number;
  likes: number;
  dislikes: number;
  comments: mongoose.Types.ObjectId
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
  views: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  },
  dislikes: {
    type: Number,
    default: 0
  },
  comments:{
    type: mongoose.Types.ObjectId,
    ref: "Comment"
  }
})

const Blog = models.Blog || model("Blog", blogSchema)
export default Blog
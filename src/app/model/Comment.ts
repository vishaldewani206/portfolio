import mongoose, {model, models, Schema} from "mongoose"


export interface IBlog {
  _id?: string;
  comment: string;
  user: mongoose.Types.ObjectId;
  likes: number;
  dislikes: number;
}


const commentSchema = new Schema<IBlog>({
  comment: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User"
  },
  likes: {
    type: Number,
    default: 0
  },
  dislikes: {
    type: Number,
    default: 0
  },
  
})

const Comment = models.Comment || model("Comment", commentSchema)
export default Comment
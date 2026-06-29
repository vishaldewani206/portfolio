import mongoose, {model, models, Schema} from "mongoose"


export interface IBlog {
  _id?: string;
  comment: string;
  userId: mongoose.Types.ObjectId;
  blogId: mongoose.Types.ObjectId;
  userSnapshot: {
    name: string
    image: string
  },
  created_at: Date;
  updated_at: Date
}


const commentSchema = new Schema<IBlog>({
  comment: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User"
  },
  blogId: {
    type: mongoose.Types.ObjectId,
    ref: "Blog"
  },
  userSnapshot: {
    name: { type: String, required: true },
    image: { type: String, default: '' },
  },
}, {timestamps: true})

const Comment = models.Comment || model("Comment", commentSchema)
export default Comment
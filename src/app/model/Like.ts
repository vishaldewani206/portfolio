import mongoose, {model, models, Schema} from "mongoose"


export interface ILike {
  _id?: string;
  userId: mongoose.Types.ObjectId;
  blogId: mongoose.Types.ObjectId;
  created_at: Date;
  updated_at: Date;
}


const likeSchema = new Schema<ILike>({
  blogId:{
    type: mongoose.Types.ObjectId,
    ref: "Blog"
  },
  userId:{
    type: mongoose.Types.ObjectId,
    ref: "User"
  },
}, {timestamps: true})

likeSchema.index({ blogId: 1, userId: 1 }, { unique: true });

const Like = models.Like || model("Like", likeSchema)
export default Like
import mongoose, {Schema, models, model} from "mongoose"


export interface IUser {
  _id?: mongoose.Types.ObjectId;
  name: string;
  email: string;
  avatar?: string;
  role: "user" | "admin";
  createdAt: Date;
  updatedAt: Date;
}


const userSchema = new Schema<IUser>({
  name: {
    type: String,
    trim: true,
    required: true
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    lowercase: true,
    required: true
  },
  avatar:{
    type: String,
  },
  role: {
    type: String,
    enum: ["user","admin"],
    default: "user"
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },

}, {
  collection: "User"
})


const User = models.User || model("User", userSchema)
export default User

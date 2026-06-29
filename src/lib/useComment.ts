import api from "./axios";
import { IComment } from "./types";



type getCommentProps = {
  comments: IComment[]
  total: number
  page: number
  totalPages: number
}

export const createComment = async (blogId:string, comment: string ): Promise<IComment> => {
  const res = await api.post(`/blog/${blogId}/comment`, {comment});
  return res.data
};


export const getComments = async (blogId:string, page = 1, limit = 10): Promise<getCommentProps>=>{
  const res = await api.get(`/blog/${blogId}/comment?page=${page}&limit=${limit}`)
  return res.data
}


interface CommentTypes  {
  _id: string
  comment: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  userSnapshot: {
    name: string;
    image: string;
  };
  blogId: {
    _id: string
    title: string
  }
}

type getCommentProps2 = {
  comments: CommentTypes[]
  total: number
  page: number
  totalPages: number
}

export const getAdminComments = async (page = 1, limit = 10): Promise<getCommentProps2>=>{
  const res = await api.get(`/comments?page=${page}&limit=${limit}`)
  return res.data
}

export const adminDeleteComment = async (id:string): Promise<void>=>{
  const res = await api.delete(`/comments?id=${id}`)
  return res.data
}
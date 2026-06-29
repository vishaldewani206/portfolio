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
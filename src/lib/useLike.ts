import api from "./axios";


type ILike = {
  likeCount: number
  liked: boolean
}

export const toggleLike = async (blogId:string): Promise<ILike> => {
  const res = await api.post(`/blog/${blogId}/like`);
  return res.data
};
import api from "./axios"
import { Blog, BlogPageData } from "./types"



export type GetBlogsResponse = {
  blogs: Blog[]
  total: number
  page: number
  totalPages: number
}

export const getBlogs = async (page = 1, limit = 10): Promise<GetBlogsResponse> => {
  const res = await api.get(`/blog?page=${page}&limit=${limit}`)
  return res.data
}

export const createBlog = async (
  title: string,
  description: string,
  content: string,
  cover: string
) => {
  const res = await api.post('/blog', { title, description, content, cover })
  return res.data
}

export const updateBlog = async(
  id: string,
  title: string,
  description: string,
  content: string,
  cover: string
) =>{
  console.log(id, title, description, content, cover);
  const res = await api.put(`/blog/${id}`, {title, description, content, cover})
  return res.data
}

export const getBlogById = async (id: string): Promise<BlogPageData | null> => {
  try {
    const res = await api.get(`/blog/${id}`)
    return res.data
  } catch {
    return null
  }
}


export const deleteBlog = async (id: string): Promise<number> =>{
  const res = await api.delete(`/blog/${id}`)
  return res.status
}

export const viewBlog = async(id: string) =>{
  const res = await api.post(`/blog/view`, {id})
  return res.status
}
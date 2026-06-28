import { Blog } from '@/lib/types'
import { create } from 'zustand'


interface BlogStore {
  // map for O(1) lookup by id
  blogsMap: Record<string, Blog>
  // ordered list of ids per page for listing
  ids: string[]
  page: number
  totalPages: number
  hasMore: boolean
  loading: boolean

  // actions
  setPage: (blogs: Blog[], page: number, totalPages: number) => void
  appendPage: (blogs: Blog[], page: number, totalPages: number) => void
  upsertBlog: (blog: Blog) => void
  removeBlog: (id: string) => void
  getById: (id: string) => Blog | undefined
  nextPage: () => void
  setLoading: (loading: boolean) => void
  reset: () => void
}

export const useBlogStore = create<BlogStore>((set, get) => ({
  blogsMap: {},
  ids: [],
  page: 1,
  totalPages: 1,
  hasMore: true,
  loading: false,

  // replace current list (pagination mode)
  setPage: (blogs, page, totalPages) =>
    set((state) => {
      const newMap = { ...state.blogsMap }
      const newIds = blogs.map((b) => {
        newMap[b._id] = b
        return b._id
      })
      return {
        blogsMap: newMap,
        ids: newIds,
        page,
        totalPages,
        hasMore: page < totalPages,
      }
    }),

  // append to list (infinite scroll mode)
  appendPage: (blogs, page, totalPages) =>
    set((state) => {
      const newMap = { ...state.blogsMap }
      const newIds = blogs.map((b) => {
        newMap[b._id] = b
        return b._id
      })
      return {
        blogsMap: newMap,
        ids: [...state.ids, ...newIds],
        page,
        totalPages,
        hasMore: page < totalPages,
      }
    }),

  removeBlog: (id:string) =>
    set((state) => {
      const newMap = { ...state.blogsMap }
      delete newMap[id]
      return {
        blogsMap: newMap,
        ids: state.ids.filter((i) => i !== id),
      }
  }),

  // add or update a single blog (used when visiting /blog/[id])
  upsertBlog: (blog) =>
    set((state) => ({
      blogsMap: { ...state.blogsMap, [blog._id]: blog },
    })),

  // O(1) lookup — no API call needed if already fetched
  getById: (id) => get().blogsMap[id],

  nextPage: () => set((state) => ({ page: state.page + 1 })),

  setLoading: (loading) => set({ loading }),

  reset: () =>
    set({
      blogsMap: {},
      ids: [],
      page: 1,
      totalPages: 1,
      hasMore: true,
      loading: false,
    }),
}))
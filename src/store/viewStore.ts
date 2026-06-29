import { create } from "zustand";
import { persist } from "zustand/middleware";

type ViewStore = {
  viewedBlogs: Record<string, number>; 
  markViewed: (blogId: string) => void;
  hasViewed: (blogId: string) => boolean;
};

export const useViewStore = create<ViewStore>()(
  persist(
    (set, get) => ({
      viewedBlogs: {},

      markViewed: (blogId) =>
        set((state) => ({
          viewedBlogs: {
            ...state.viewedBlogs,
            [blogId]: Date.now(),
          },
        })),

      hasViewed: (blogId) => {
        const timestamp = get().viewedBlogs[blogId];
        if (!timestamp) return false;

        // 24 hours
        return Date.now() - timestamp < 24 * 60 * 60 * 1000;
      },
    }),
    {
      name: "view-storage",
    }
  )
);
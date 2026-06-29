export type toolsTypes = {
  name: string,
  image: string
}

export type ProjectTypes = {
  name: string;
  link: string;
  subheading: string;
  description: string;
  tech: string[];
}


export type Blog = {
  _id: string
  title: string
  description: string
  cover: string
  views: number
  likes: number
  comments: number
  content: string
  createdAt: Date
}


export type BlogPageData = {
  blog: Blog;
  liked: boolean | null;
};

export type IComment = {
  _id: string
  comment: string;
  blogId: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  userSnapshot: {
    name: string;
    image: string;
  };
}
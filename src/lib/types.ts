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
  content: string
  createdAt: string
}
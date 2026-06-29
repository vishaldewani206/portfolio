import Blog from '@/app/model/Blog'
import Like from '@/app/model/Like'
import { connectDB } from '@/lib/db'
import { requireAuth } from '@/lib/requireAuth'
import { NextResponse } from 'next/server'

type Params = { params: Promise<{ id: string }> }

export async function GET(req: Request, { params }: Params) {
  await connectDB()
  const { id } = await params

  const auth = await requireAuth()
  if (!auth.success) return NextResponse.json({ liked: false })

  const { user } = auth

  const liked = await Like.exists({ blogId: id, userId: user.id })

  return NextResponse.json({ liked: !!liked })
}

export async function POST(req: Request, { params }: Params) {
  await connectDB()

  const auth = await requireAuth()
  if (!auth.success) return auth.response

  const { user } = auth
  const { id } = await params

  try {
    const existing = await Like.findOne({ blogId: id, userId: user.id })

    if (existing) {
      const [, blog] = await Promise.all([
        Like.deleteOne({ _id: existing._id }),
        Blog.findByIdAndUpdate(id, { $inc: { likes: -1 } }, { new: true }),
      ])

      if (!blog) return NextResponse.json({ error: 'Blog not found' }, { status: 404 })

      return NextResponse.json({ liked: false, likeCount: blog.likes })
    }

    const [, blog] = await Promise.all([
      Like.create({ blogId: id, userId: user.id }),
      Blog.findByIdAndUpdate(id, { $inc: { likes: 1 } }, { new: true }),
    ])

    if (!blog) return NextResponse.json({ error: 'Blog not found' }, { status: 404 })

    return NextResponse.json({ liked: true, likeCount: blog.likes })

  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}
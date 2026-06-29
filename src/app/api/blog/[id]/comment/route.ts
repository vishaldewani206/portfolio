import Comment from "@/app/model/Comment"
import Blog from "@/app/model/Blog"
import { connectDB } from "@/lib/db"
import { requireAuth } from "@/lib/requireAuth"
import { NextResponse } from "next/server"
import mongoose from "mongoose"

type Params = { params: Promise<{ id: string }> }

export async function POST(req: Request, { params }: Params) {
  await connectDB()
  const auth = await requireAuth()
  if (!auth.success) return auth.response

  const { user } = auth
  const { id } = await params
  const { comment } = await req.json()

  if (!comment?.trim()) {
    return NextResponse.json({ error: 'Comment is required' }, { status: 400 })
  }

  try {
    const [makeComment] = await Promise.all([
      Comment.create({
        userId: user.id,
        blogId: id,
        comment: comment.trim(),
        userSnapshot: {
          name: user.name,
          image: user.image ?? '',
        },
      }),
      Blog.findByIdAndUpdate(id, { $inc: { comments: 1 } }),
    ])

    return NextResponse.json(makeComment)
  } catch (error) {
    throw error
  }
}

export async function GET(req: Request, { params }: Params) {
  await connectDB()

  const { id } = await params
  const blogObjectId = new mongoose.Types.ObjectId(id)
  const { searchParams } = new URL(req.url)

  try {
    const page = Math.max(1, parseInt(searchParams.get('page') ?? '1'))
    const limit = parseInt(searchParams.get('limit') ?? '10')
    const skip = (page - 1) * limit

    const [comments, blog] = await Promise.all([
      Comment.find({ blogId: blogObjectId })
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 }),
      Blog.findById(id, 'comments'), 
    ])

    const total = blog?.comments ?? 0

    return NextResponse.json({
      comments,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    })
  } catch (error) {
    throw error
  }
}
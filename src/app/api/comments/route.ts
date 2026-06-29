import Comment from "@/app/model/Comment"
import { connectDB } from "@/lib/db"
import { requireAuth } from "@/lib/requireAuth"
import mongoose from "mongoose"
import { NextResponse } from "next/server"

export async function GET(req: Request) {
  await connectDB()
  const auth = await requireAuth()
  if (!auth.success) return auth.response
  
  const { user } = auth

  if(user.role != "admin"){
    return NextResponse.json({error: "Unauthorized"}, {status:401})
  }

  const { searchParams } = new URL(req.url)

  try {
    const page = Math.max(1, parseInt(searchParams.get('page') ?? '1'))
    const limit = parseInt(searchParams.get('limit') ?? '10')
    console.log("limit", limit);
    const skip = (page - 1) * limit

    const [comments, total] = await Promise.all([
      Comment.find().populate("blogId", "title")
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 }),
      Comment.countDocuments(), 
    ])

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


export async function DELETE(req: Request) {
  await connectDB()
  const auth = await requireAuth()
  if (!auth.success) return auth.response
  
  const { user } = auth

  if(user.role != "admin"){
    return NextResponse.json({error: "Unauthorized"}, {status:401})
  }

  const { searchParams } = new URL(req.url)

  const id = searchParams.get('id')

  if(!id){
    return NextResponse.json({error: "id required"}, {status:400})
  }

  const validId = new mongoose.Types.ObjectId(id)
  

  try {
    await Comment.findByIdAndDelete(validId)
    return NextResponse.json({success: true})
  } catch (err) {
    console.error(err)
    return NextResponse.json({error: "Error will deleting"}, {status:400})
  }
  
}
import Blog from "@/app/model/Blog";
import { connectDB } from "@/lib/db";
import { requireAuth } from "@/lib/requireAuth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  // const auth = await requireAuth()
  // if (!auth.success || auth.user.role !) return auth.response
  // console.log(auth);
  // const {user} = auth
  await connectDB()

  const { searchParams } = new URL(req.url)

  const page = Math.max(1, parseInt(searchParams.get("page") ?? "1"))
  const limit = parseInt(searchParams.get("limit") ?? "10")
  const skip = (page -1) * limit


  const [blogs, total] = await Promise.all([
    Blog
      .find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 }),
    Blog.countDocuments(),
  ]);


  return NextResponse.json({  blogs,
    total,
    page,
    totalPages: Math.ceil(total / limit), })
} 

export async function POST(req: Request) {
  await connectDB()
  const auth = await requireAuth()
  if(!auth.success) return auth.response
  const {user} = auth
  if(user.role != "admin") {
    return NextResponse.json({error: "Unauthorized"})
  }

  const {title, description, cover, content} =  await req.json()
  console.log(title,description, cover,content);
  if(!title || !description || !cover || !content){
    return NextResponse.json({error: "all fields are required"})
  }

  const blog = await Blog.create({
    title,
    description,
    cover,
    content,
    publish: true
  })

  return NextResponse.json({blog})


}
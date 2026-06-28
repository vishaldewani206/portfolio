import Blog from "@/app/model/Blog"
import { connectDB } from "@/lib/db"
import { requireAuth } from "@/lib/requireAuth"
import { NextResponse } from "next/server"

type Params = { params: Promise<{ id: string }> }

export async function GET(_req: Request, { params }: Params) {
  await connectDB()
  const { id } = await params

  const blog = await Blog.findById(id)
  if (!blog) {
    return NextResponse.json({ error: 'Blog not found' }, { status: 404 })
  }

  return NextResponse.json({ blog })
}


export async function PUT(req: Request, {params}: Params ) {
  try {
    await connectDB()

    const auth = await requireAuth()
    if(!auth.success) return auth.response
    const {user} = auth
    if(user.role != "admin") {
      return NextResponse.json({error: "Unauthorized"})
    }

    const {id} = await params
    const {title, description, content, cover} = await req.json()
    const blog = await Blog.findById(id);
    if (!blog) {
      return NextResponse.json({
        success: false,
        message: "Blog not found.",
      }, {status: 404});
    }
    blog.title = title
    blog.description = description
    blog.content = content
    blog.cover = cover
    await blog.save()

    return NextResponse.json({
      blog
    }, {status:200})

  } catch (error) {
    console.error(error)
    return NextResponse.json({
      success:false
    }, {status: 500})
  }
}


export async function DELETE(req: Request, {params}: Params) {
  try{
    await connectDB()
    const auth = await requireAuth()
    if(!auth.success) return auth.response
    const {user} = auth
    if(user.role != "admin") {
      return NextResponse.json({error: "Unauthorized"})
    }

    const {id} = await params

    await Blog.findByIdAndDelete(id)

    return NextResponse.json({success:true}, {status: 200})


  }catch{
    return NextResponse.json({success:false}, {status: 500})
  }
}
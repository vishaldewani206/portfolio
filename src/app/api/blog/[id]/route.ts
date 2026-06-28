import Blog from "@/app/model/Blog"
import { connectDB } from "@/lib/db"
import { NextResponse } from "next/server"

type Params = { params: Promise<{ id: string }> }

export async function GET(_req: Request, { params }: Params) {
  await connectDB()
  const { id } = await params
  console.log('hit');


  const blog = await Blog.findById(id)
  if (!blog) {
    return NextResponse.json({ error: 'Blog not found' }, { status: 404 })
  }

  return NextResponse.json({ blog })
}


export async function PUT(req: Request, {params}: Params ) {
  try {
    await connectDB()
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
    })
  }
}

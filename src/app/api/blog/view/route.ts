import Blog from "@/app/model/Blog";
import { connectDB } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  await connectDB()

  const {id} =  await req.json()
  if(!id){
    return NextResponse.json({error: "id is required"})
  }

  await Blog.findByIdAndUpdate(id, {
    $inc: {views: 1}
  })
  
  return NextResponse.json({success: true})


}
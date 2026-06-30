"use client"
import { useAuth } from "@/lib/useAuth"
import { Button } from "../ui/button"
import { Textarea } from "../ui/textarea"
import { Comment } from "./Comment"
import { useEffect, useState } from "react"
import { useLoading } from "@/lib/loading"
import { createComment, getComments } from "@/lib/useComment"
import { PaginationSystem } from "../Pagination"
import { IComment } from "@/lib/types"




export const CommentSystem = ({blogId}:{blogId: string}) => {

  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [totalComments, setTotalComments] = useState(0)
  const [comments, setComments] = useState<IComment[]>([])

  const [comment, setComment] = useState('')

  const {isLoggedIn} = useAuth()
  const {show, hide} = useLoading()

  const LIMIT = 20

  const fetchComments = async (p: number) => {
    show()
    setLoading(true)
    try {
      const data = await getComments(blogId, p, LIMIT)
      setPage(data.page)
      setTotalPages(data.totalPages)
      setTotalComments(data.total)
      setComments(data.comments)
    } finally {
      setLoading(false)
      hide()
    }
  }

  useEffect(() => {
    const load = async () => {
      await fetchComments(1)
    }
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleCreateComment = async () => {
    const res = await createComment(blogId, comment)
    setComments([ res ,...comments])
    setComment('')
  }

  return (
    <div className="mt-6 flex flex-col">
      <h2 className="font-bold text-xl">Comments ({totalComments})</h2>

      <Textarea value={comment} onChange={(e)=> setComment(e.target.value)} placeholder="Share your thoughts" className="mt-2"  />
      <Button onClick={()=>handleCreateComment()} disabled={!isLoggedIn || loading} className="ml-auto mt-2" size={"lg"}>Comment</Button>

      <div className="mt-4 space-y-4">
        {comments?.map((comment)=>(
          <Comment key={comment._id} comment={comment.comment} name={comment.userSnapshot.name} date={comment.createdAt} image={comment.userSnapshot.image} /> 
        ))}
      </div>

      <PaginationSystem
        page={page}
        totalPages={totalPages}
        onPageChange={fetchComments}
      />
    </div>
  )
}

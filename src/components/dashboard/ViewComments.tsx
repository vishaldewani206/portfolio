'use client'

import { useEffect, useCallback, useState } from 'react'
import { useRouter } from 'next/navigation'
import { MoreHorizontalIcon, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { PaginationSystem } from '@/components/Pagination'
import { useLoading } from '@/lib/loading'
import { toast } from 'sonner'
import { adminDeleteComment, getAdminComments } from '@/lib/useComment'

const LIMIT = 10

interface CommentTypes  {
  _id: string
  comment: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  userSnapshot: {
    name: string;
    image: string;
  };
  blogId: {
    _id: string
    title: string
  }
}

export function ViewAllComments() {
  const router = useRouter()
  const { show, hide } = useLoading()


    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)
    const [totalComments, setTotalComments] = useState(0)
    const [comments, setComments] = useState<CommentTypes[]>([])

  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [deleting, setDeleting] = useState(false)

  const fetchComments = useCallback(async (p: number) => {
    show()
    try {
      const data = await getAdminComments(p, LIMIT)
      console.log(data);
      setPage(data.page)
      setTotalComments(data.total)
      setTotalPages(data.totalPages)
      setComments(data.comments)
    } finally {
      hide()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    fetchComments(1)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const removeComment = ()=>{
    setComments(comments.filter((e)=> e._id != deleteId))
  }

  const handleDelete = async () => {
    if (!deleteId) return
    setDeleting(true)
    try {
      await adminDeleteComment(deleteId)
      removeComment()
      toast.success('Comment deleted')
    } catch {
      toast.error('Failed to delete comment')
    } finally {
      setDeleting(false)
      setDeleteId(null)
    }
  }

  return (
    <>
      <div className="rounded-lg border border-zinc-200 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-zinc-50">
              <TableHead className="w-100">Comment</TableHead>
              <TableHead className="">Blog Name</TableHead>
              <TableHead>Published</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {comments.length === 0 && (
              <TableRow>
                <TableCell colSpan={3} className="text-center text-zinc-400 py-16">
                  No comment yet.
                </TableCell>
              </TableRow>
            )}

            {comments.map((comment) => {
              if (!comment) return null
              return (
                <TableRow  key={comment._id}>
                  <TableCell  onClick={()=> router.push(`/blog/${comment?.blogId?._id}`)} className="font-medium max-w-100 cursor-pointer">
                    <div>
                      <p className="truncate font-serif">{comment?.comment}</p>
                      
                    </div>
                  </TableCell>
                  <TableCell className='truncate'>
                    {comment?.blogId?.title}
                  </TableCell>
                  <TableCell className="text-sm text-zinc-500">
                    {new Date(comment.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="size-8">
                          <MoreHorizontalIcon size={16} />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          variant="destructive"
                          onClick={() => setDeleteId(comment._id)}
                          className="gap-2"
                        >
                          <Trash2 size={14} />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>

      <PaginationSystem
        page={page}
        totalPages={totalPages}
        onPageChange={fetchComments}
      />

      {/* delete confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={(o) => !o && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Comment?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The comment will be permanently deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={deleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {deleting ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
'use client'

import { useEffect, useCallback, useState } from 'react'
import { useRouter } from 'next/navigation'
import { MoreHorizontalIcon, Pencil, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
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
import { useBlogStore } from '@/store/useBlogs'
import { getBlogs, deleteBlog } from '@/lib/use-fetch-blogs'
import { useLoading } from '@/lib/loading'
import { toast } from 'sonner'

const LIMIT = 10

export function ViewAllBlogs() {
  const router = useRouter()
  const { show, hide } = useLoading()

  const blogsMap = useBlogStore((state) => state.blogsMap)
  const ids = useBlogStore((state) => state.ids)
  const page = useBlogStore((state) => state.page)
  const totalPages = useBlogStore((state) => state.totalPages)
  const setPage = useBlogStore((state) => state.setPage)
  const removeBlog = useBlogStore((state) => state.removeBlog)

  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [deleting, setDeleting] = useState(false)

  const fetchBlogs = useCallback(async (p: number) => {
    show()
    try {
      const data = await getBlogs(p, LIMIT)
      console.log(data);
      setPage(data.blogs, data.page, data.totalPages)
    } finally {
      hide()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    fetchBlogs(1)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleDelete = async () => {
    if (!deleteId) return
    setDeleting(true)
    try {
      await deleteBlog(deleteId)
      removeBlog(deleteId)
      toast.success('Blog deleted')
    } catch {
      toast.error('Failed to delete blog')
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
              <TableHead className="w-100">Title</TableHead>
              <TableHead className="">Views</TableHead>
              <TableHead>Published</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ids.length === 0 && (
              <TableRow>
                <TableCell colSpan={3} className="text-center text-zinc-400 py-16">
                  No blogs yet.
                </TableCell>
              </TableRow>
            )}

            {ids.map((id) => {
              const blog = blogsMap[id]
              if (!blog) return null
              return (
                <TableRow  key={id}>
                  <TableCell  onClick={()=> router.push(`/blog/${id}`)} className="font-medium max-w-100 cursor-pointer">
                    <div>
                      <p className="truncate font-serif">{blog.title}</p>
                      <p className="text-xs text-zinc-400 truncate mt-0.5">
                        {blog.description}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    {blog.views}
                  </TableCell>
                  <TableCell className="text-sm text-zinc-500">
                    {new Date(blog.createdAt).toLocaleDateString('en-US', {
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
                          onClick={() => router.push(`/dashboard/write/${id}`)}
                          className="gap-2"
                        >
                          <Pencil size={14} />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          variant="destructive"
                          onClick={() => setDeleteId(id)}
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
        onPageChange={fetchBlogs}
      />

      {/* delete confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={(o) => !o && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete blog?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The blog will be permanently deleted.
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
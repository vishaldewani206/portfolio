'use client'

import { useAuth } from '@/lib/useAuth'
import { toggleLike } from '@/lib/useLike'
import { Heart } from 'lucide-react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog'
import { signIn } from '@/lib/auth-client'
import { useLoading } from '@/lib/loading'
import { useEffect, useState } from 'react'

interface Props {
  liked: boolean | null
  likeCount: number
  blogId: string
}

export const Likes = ({ liked, likeCount, blogId }: Props) => {
  const { isLoggedIn } = useAuth()
  const { show } = useLoading()

  const [like, setLike] = useState<boolean>(!!liked)
  const [likeNum, setLikeNum] = useState(likeCount)
  const [loading, setLoading] = useState(false)

  // sync when props update after fetch
  useEffect(() => {
    setLike(!!liked)
  }, [liked])

  useEffect(() => {
    setLikeNum(likeCount)
  }, [likeCount])

  const handleLike = async () => {
    if (!isLoggedIn || loading) return
    setLoading(true)

    // optimistic update
    const previousLiked = like
    const previousCount = likeNum
    setLike(!previousLiked)
    setLikeNum((c) => c + (previousLiked ? -1 : 1))

    try {
      const res = await toggleLike(blogId)
      setLike(res.liked)
      setLikeNum(res.likeCount)
    } catch {
      // rollback on error
      setLike(previousLiked)
      setLikeNum(previousCount)
    } finally {
      setLoading(false)
    }
  }

  const handleGoogle = async () => {
    show('Redirecting to Google...')
    await signIn.social({
      provider: 'google',
      callbackURL: `/blog/${blogId}`,
    })
  }

  const heartClass = `flex flex-col items-center ${loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`
  const heartIcon = <Heart className={like ? 'fill-red-600 text-red-600' : ''} />

  if (isLoggedIn) {
    return (
      <button disabled={loading} onClick={handleLike} className={heartClass}>
        {heartIcon}
        {likeNum}
      </button>
    )
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button disabled={loading} className={heartClass}>
          {heartIcon}
          {likeNum}
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Sign in to Like This Post</AlertDialogTitle>
          <AlertDialogDescription>
            You need to sign in to like posts and access other interactive features.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleGoogle}>
            Sign in with Google
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
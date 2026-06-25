import { ThumbsDown, ThumbsUp } from "lucide-react"

export const Stats = () => {
  return (
    <div className="w-full flex justify-between">
      <div>
        <strong>12 July 2026</strong>
        <p>128k views</p>
      </div>
      <div className="space-x-4">
        <button><ThumbsUp /> 12k</button>
        <button><ThumbsDown /> 1k</button>

      </div>
    </div>
  )
}

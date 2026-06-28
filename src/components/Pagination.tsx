'use client'

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

interface Props {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function PaginationSystem({ page, totalPages, onPageChange }: Props) {
  if (totalPages <= 1) return null

  const getPages = () => {
    const pages: (number | 'ellipsis')[] = []

    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    pages.push(1)

    if (page > 3) pages.push('ellipsis')

    const start = Math.max(2, page - 1)
    const end = Math.min(totalPages - 1, page + 1)

    for (let i = start; i <= end; i++) pages.push(i)

    if (page < totalPages - 2) pages.push('ellipsis')

    pages.push(totalPages)

    return pages
  }

  return (
    <Pagination className="mt-12">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault()
              if (page > 1) onPageChange(page - 1)
            }}
            className={page === 1 ? 'pointer-events-none opacity-40' : ''}
          />
        </PaginationItem>

        {getPages().map((p, i) =>
          p === 'ellipsis' ? (
            <PaginationItem key={`ellipsis-${i}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={p}>
              <PaginationLink
                href="#"
                isActive={p === page}
                onClick={(e) => {
                  e.preventDefault()
                  onPageChange(p)
                }}
              >
                {p}
              </PaginationLink>
            </PaginationItem>
          )
        )}

        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault()
              if (page < totalPages) onPageChange(page + 1)
            }}
            className={page === totalPages ? 'pointer-events-none opacity-40' : ''}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
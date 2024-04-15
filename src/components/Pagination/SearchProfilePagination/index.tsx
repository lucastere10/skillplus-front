import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ChevronFirst, ChevronLast, ChevronLeftIcon, ChevronRightIcon } from "lucide-react"

interface DataTablePaginationProps {
  pageSizeOptions?: number[]
  page: number
  size: number
  totalPages: number
  setPage: (page: number) => void
  setSize: (size: number) => void
  setTotalPages: (page: number) => void
}

export function SearchProfilePagination({
  pageSizeOptions = [5, 10, 20, 30, 40],
  page,
  size,
  totalPages,
  setPage,
  setSize,
  setTotalPages
}: Readonly<DataTablePaginationProps>) {
  return (
    <div className="flex w-full flex-col-reverse items-center justify-end gap-4 overflow-auto px-2 py-1 sm:flex-row sm:gap-8">
      <div className="flex flex-col-reverse items-center gap-4 sm:flex-row sm:gap-6 lg:gap-8">
        <div className="flex items-center space-x-2">
          <p className="whitespace-nowrap text-sm font-medium">Perfis por página</p>
          <Select
            value={`${size}`}
            onValueChange={(value) => {
              setSize(Number(value))
            }}
          >
            <SelectTrigger className="h-8 w-[4.5rem]">
              <SelectValue placeholder={5} />
            </SelectTrigger>
            <SelectContent side="top">
              {pageSizeOptions.map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center justify-center text-sm font-medium">
          Página {page + 1} de{" "}
          {totalPages}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            aria-label="Go to first page"
            variant="outline"
            className="hidden size-8 p-0 lg:flex"
            onClick={() => {setPage(0)}}
            disabled={page === 0}
          >
            <ChevronFirst className="size-4" aria-hidden="true" />
          </Button>
          <Button
            aria-label="Go to previous page"
            variant="outline"
            size="icon"
            className="size-8"
            onClick={() => {setPage(page - 1)}}
            disabled={page === 0}
          >
            <ChevronLeftIcon className="size-4" aria-hidden="true" />
          </Button>
          <Button
            aria-label="Go to next page"
            variant="outline"
            size="icon"
            className="size-8"
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages - 1}
          >
            <ChevronRightIcon className="size-4" aria-hidden="true" />
          </Button>
          <Button
            aria-label="Go to last page"
            variant="outline"
            size="icon"
            className="hidden size-8 lg:flex"
            onClick={() => {setPage(totalPages - 1) }}
            disabled={page === totalPages - 1}
          >
            <ChevronLast className="size-4" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </div>
  )
}

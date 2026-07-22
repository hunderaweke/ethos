import { CaretLeft, CaretRight } from "@phosphor-icons/react";

interface PaginationProps {
  page: number;
  pages: number;
  total: number;
  limit: number;
  onPageChange: (newPage: number) => void;
  onLimitChange?: (newLimit: number) => void;
}

export default function Pagination({
  page,
  pages,
  total,
  limit,
  onPageChange,
  onLimitChange,
}: PaginationProps) {
  if (total === 0) return null;

  const startItem = (page - 1) * limit + 1;
  const endItem = Math.min(page * limit, total);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4 px-5 bg-white border border-zinc-200 rounded-sm shadow-2xs text-xs font-semibold text-zinc-700">
      <div className="flex items-center gap-3">
        <span>
          Showing <strong className="text-zinc-950 font-bold">{startItem}</strong> to{" "}
          <strong className="text-zinc-950 font-bold">{endItem}</strong> of{" "}
          <strong className="text-zinc-950 font-bold">{total}</strong> items
        </span>

        {onLimitChange && (
          <div className="flex items-center gap-1.5 ml-2">
            <span className="text-zinc-400">Per page:</span>
            <select
              value={limit}
              onChange={(e) => onLimitChange(Number(e.target.value))}
              className="bg-zinc-50 border border-zinc-200 rounded-sm px-2 py-1 text-xs font-bold text-zinc-900 outline-none cursor-pointer hover:border-zinc-400 transition-colors"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>
        )}
      </div>

      <div className="flex items-center gap-1.5">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-sm border border-zinc-200 bg-white hover:bg-zinc-100 disabled:opacity-40 disabled:hover:bg-white text-zinc-800 font-bold cursor-pointer transition-colors"
        >
          <CaretLeft className="h-3.5 w-3.5" />
          <span>Prev</span>
        </button>

        <div className="flex items-center gap-1 px-2">
          <span className="font-bold text-zinc-950">
            Page {page} of {pages}
          </span>
        </div>

        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page >= pages}
          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-sm border border-zinc-200 bg-white hover:bg-zinc-100 disabled:opacity-40 disabled:hover:bg-white text-zinc-800 font-bold cursor-pointer transition-colors"
        >
          <span>Next</span>
          <CaretRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

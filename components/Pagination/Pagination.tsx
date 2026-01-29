// components/Pagination/Pagination.tsx

"use client";

// Styles
import css from "./Pagination.module.css";

// React components
import ReactPaginate from "react-paginate";

// Types
interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void; 
}

export default function Pagination({
  page,
  totalPages,
  onPageChange,
}: PaginationProps) {
  return (
    <ReactPaginate
      pageCount={totalPages}
      forcePage={Math.max(0, page - 1)}
      onPageChange={({ selected }) => onPageChange(selected + 1)}
      previousLabel="←"
      nextLabel="→"
      breakLabel="..."
      containerClassName={css.pagination}
      activeClassName={css.active}
    />
  );
}

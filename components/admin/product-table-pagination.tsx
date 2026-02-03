"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

interface ProductTablePaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function ProductTablePagination({
  currentPage,
  totalPages,
}: ProductTablePaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-2 mt-6">
      <Button
        variant="outline"
        size="sm"
        disabled={currentPage <= 1}
        asChild={currentPage > 1}
      >
        {currentPage > 1 ? (
          <Link href={`/admin/product?page=${currentPage - 1}`}>Anterior</Link>
        ) : (
          "Anterior"
        )}
      </Button>

      {pages.map((page) => (
        <Button
          key={page}
          variant={page === currentPage ? "default" : "outline"}
          size="sm"
          asChild={page !== currentPage}
        >
          {page !== currentPage ? (
            <Link href={`/admin/product?page=${page}`}>{page}</Link>
          ) : (
            <span>{page}</span>
          )}
        </Button>
      ))}

      <Button
        variant="outline"
        size="sm"
        disabled={currentPage >= totalPages}
        asChild={currentPage < totalPages}
      >
        {currentPage < totalPages ? (
          <Link href={`/admin/product?page=${currentPage + 1}`}>Siguiente</Link>
        ) : (
          "Siguiente"
        )}
      </Button>
    </div>
  );
}

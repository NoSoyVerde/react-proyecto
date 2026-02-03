import { getAllProducts } from "@/lib/actions/product.actions";
import ProductTable from "@/components/admin/product-table";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function AdminProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; query?: string }>;
}) {
  const { page = "1", query = "" } = await searchParams;
  const currentPage = Number(page);

  const { products, totalPages } = await getAllProducts({
    page: currentPage,
    query,
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Productos</h1>
        <Button asChild>
          <Link href="/admin/product/create">Añadir Producto</Link>
        </Button>
      </div>

      <ProductTable
        products={products}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </div>
  );
}

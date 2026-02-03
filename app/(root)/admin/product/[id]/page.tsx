import ProductForm from "@/components/admin/product-form";
import { getProductBySlug } from "@/lib/actions/product.actions";
import { notFound } from "next/navigation";
import { insertProductSchema } from "@/lib/validators";
import z from "zod";

interface EditProductPageProps {
  params: {
    id: string;
  };
}

async function updateProduct(data: z.infer<typeof insertProductSchema>) {
  "use server";

  try {
    const response = await fetch("/api/products", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Error al actualizar el producto");
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
}

export default async function EditProductPage({
  params,
}: EditProductPageProps) {
  // Por ahora, simplemente creamos un nuevo producto
  // En una implementación real, necesitarías buscar el producto por ID

  return (
    <div className="wrapper py-8">
      <h1 className="text-3xl font-bold mb-6">Editar Producto</h1>
      <ProductForm onSubmit={updateProduct} />
    </div>
  );
}

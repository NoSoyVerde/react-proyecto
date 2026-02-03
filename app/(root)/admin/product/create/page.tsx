import ProductForm from "@/components/admin/product-form";
import { insertProductSchema } from "@/lib/validators";
import z from "zod";

async function createProduct(data: z.infer<typeof insertProductSchema>) {
  "use server";

  try {
    const response = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Error al crear el producto");
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
}

export default function CreateProductPage() {
  return (
    <div className="wrapper py-8">
      <h1 className="text-3xl font-bold mb-6">Crear Nuevo Producto</h1>
      <ProductForm onSubmit={createProduct} />
    </div>
  );
}

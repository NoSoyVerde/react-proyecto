"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Product } from "@/types/Product";
import { insertProductSchema } from "@/lib/validators";
import z from "zod";

interface ProductFormProps {
  product?: Product;
  onSubmit: (data: z.infer<typeof insertProductSchema>) => Promise<void>;
  isLoading?: boolean;
}

export default function ProductForm({
  product,
  onSubmit,
  isLoading = false,
}: ProductFormProps) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: product?.name || "",
    slug: product?.slug || "",
    category: product?.category || "",
    brand: product?.brand || "",
    description: product?.description || "",
    stock: product?.stock || 0,
    price: product?.price.toString() || "",
    images: product?.images || [],
    isFeatured: product?.isFeatured || false,
    banner: product?.banner || "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target as any;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const validatedData = insertProductSchema.parse({
        ...formData,
        stock: Number(formData.stock),
        images: formData.images.length > 0 ? formData.images : [],
      });

      await onSubmit(validatedData);
      router.push("/admin/product");
    } catch (err) {
      if (err instanceof z.ZodError) {
        const firstError = err.issues?.[0];
        setError(firstError?.message || "Error de validación");
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Error al guardar el producto");
      }
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{product ? "Editar Producto" : "Crear Nuevo Producto"}</CardTitle>
        <CardDescription>
          Completa los detalles del producto
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="rounded-md bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/50 dark:text-red-400">
              {error}
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-4">
            {/* Nombre */}
            <div>
              <Label htmlFor="name">Nombre del Producto</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            {/* Slug */}
            <div>
              <Label htmlFor="slug">Slug</Label>
              <Input
                id="slug"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                required
              />
            </div>

            {/* Categoría */}
            <div>
              <Label htmlFor="category">Categoría</Label>
              <Input
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              />
            </div>

            {/* Marca */}
            <div>
              <Label htmlFor="brand">Marca</Label>
              <Input
                id="brand"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                required
              />
            </div>

            {/* Precio */}
            <div>
              <Label htmlFor="price">Precio</Label>
              <Input
                id="price"
                name="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>

            {/* Stock */}
            <div>
              <Label htmlFor="stock">Stock</Label>
              <Input
                id="stock"
                name="stock"
                type="number"
                value={formData.stock}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Descripción */}
          <div>
            <Label htmlFor="description">Descripción</Label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              required
            />
          </div>

          {/* Banner */}
          <div>
            <Label htmlFor="banner">Banner (opcional)</Label>
            <Input
              id="banner"
              name="banner"
              value={formData.banner}
              onChange={handleChange}
            />
          </div>

          {/* Featured */}
          <div className="flex items-center gap-2">
            <input
              id="isFeatured"
              name="isFeatured"
              type="checkbox"
              checked={formData.isFeatured}
              onChange={handleChange}
              className="h-4 w-4 rounded border-gray-300 text-primary"
            />
            <Label htmlFor="isFeatured" className="font-normal">
              Marcar como producto destacado
            </Label>
          </div>

          {/* Botones */}
          <div className="flex gap-4">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Guardando..." : "Guardar Producto"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
            >
              Cancelar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

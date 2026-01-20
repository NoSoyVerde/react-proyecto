import React, { useState } from "react";
import Image from "next/image";
import ProductPrice from "@/components/shared/product/product-price";
import { cn } from "@/lib/utils";
import { Product } from "@/types/Product";

export default function ProductTabs({ product }: { product: Product }) {
  const [tab, setTab] = useState<"overview" | "details">("overview");

  return (
    <div>
      <div className="flex gap-2 border-b mb-4">
        <button
          onClick={() => setTab("overview")}
          className={cn("py-2 px-4", tab === "overview" ? "border-b-2 border-primary font-semibold" : "")}
        >
          Overview
        </button>
        <button
          onClick={() => setTab("details")}
          className={cn("py-2 px-4", tab === "details" ? "border-b-2 border-primary font-semibold" : "")}
        >
          Detalles
        </button>
      </div>

      {tab === "overview" ? (
        <div className="space-y-6">
          <div>
            <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold mb-2">
              {product.category}
            </span>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-muted-foreground">{product.brand}</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <span className="text-yellow-500">★</span>
              <span className="ml-1 font-medium">{product.rating}</span>
              <span className="text-muted-foreground ml-1">({product.numReviews} reseñas)</span>
            </div>
          </div>

          <div className="text-3xl font-bold">
            <ProductPrice value={product.price} />
          </div>

          <div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Estado:</span>
              <span className={product.stock > 0 ? "text-green-600" : "text-red-600"}>
                {product.stock > 0 ? `En stock (${product.stock})` : "Agotado"}
              </span>
            </div>

            {product.stock > 0 && (
              <button className="w-full bg-primary text-primary-foreground py-2 rounded-md hover:bg-primary/90 transition-colors mt-4">
                Añadir al carrito
              </button>
            )}
          </div>

          <div>
            <h2 className="text-xl font-semibold">Descripción</h2>
            <p className="text-muted-foreground leading-relaxed">{product.description}</p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Detalles del producto</h2>
          <dl className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
            <div>
              <dt className="font-medium text-foreground">Marca</dt>
              <dd>{product.brand}</dd>
            </div>
            <div>
              <dt className="font-medium text-foreground">Categoría</dt>
              <dd>{product.category}</dd>
            </div>
            <div>
              <dt className="font-medium text-foreground">SKU / Slug</dt>
              <dd>{product.slug}</dd>
            </div>
            <div>
              <dt className="font-medium text-foreground">Precio</dt>
              <dd>
                <ProductPrice value={product.price} />
              </dd>
            </div>
            <div>
              <dt className="font-medium text-foreground">Stock</dt>
              <dd>{product.stock}</dd>
            </div>
            <div>
              <dt className="font-medium text-foreground">Destacado</dt>
              <dd>{product.isFeatured ? "Sí" : "No"}</dd>
            </div>
          </dl>

          {product.banner && (
            <div>
              <h3 className="font-medium">Banner</h3>
              <a href={product.banner} target="_blank" rel="noreferrer" className="text-primary underline">
                {product.banner}
              </a>
            </div>
          )}

          <div>
            <h3 className="font-medium">Imágenes</h3>
            <div className="grid grid-cols-4 gap-2 mt-2">
              {product.images.map((img: string, i: number) => (
                <div key={i} className="relative aspect-square overflow-hidden rounded border">
                  <Image src={img} alt={`${product.name} ${i + 1}`} fill className="object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

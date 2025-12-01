import { getProductBySlug } from '@/lib/actions/product.actions';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import ProductPrice from '@/components/shared/product/product-price';
import { Card, CardContent } from '@/components/ui/card';

interface ProductDetailsPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: ProductDetailsPageProps) {
  const product = await getProductBySlug(params.slug);
  
  if (!product) {
    return {
      title: 'Producto no encontrado',
    };
  }

  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductDetailsPage({ params }: ProductDetailsPageProps) {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="wrapper py-8">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Galería de imágenes */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-lg border">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </div>
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-4">
              {product.images.slice(1).map((image, index) => (
                <div key={index} className="relative aspect-square overflow-hidden rounded-lg border">
                  <Image
                    src={image}
                    alt={`${product.name} - imagen ${index + 2}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Información del producto */}
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
              <span className="text-muted-foreground ml-1">
                ({product.numReviews} reseñas)
              </span>
            </div>
          </div>

          <div className="text-3xl font-bold">
            <ProductPrice value={product.price} />
          </div>

          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Estado:</span>
                <span className={product.stock > 0 ? 'text-green-600' : 'text-red-600'}>
                  {product.stock > 0 ? `En stock (${product.stock})` : 'Agotado'}
                </span>
              </div>
              
              {product.stock > 0 && (
                <button className="w-full bg-primary text-primary-foreground py-2 rounded-md hover:bg-primary/90 transition-colors">
                  Añadir al carrito
                </button>
              )}
            </CardContent>
          </Card>

          <div className="space-y-2">
            <h2 className="text-xl font-semibold">Descripción</h2>
            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>
          </div>

          {product.isFeatured && (
            <span className="inline-flex items-center rounded-full bg-yellow-500 text-white px-2.5 py-0.5 text-xs font-semibold">
              ⭐ Producto Destacado
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

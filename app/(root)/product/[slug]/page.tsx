import { getProductBySlug } from '@/lib/actions/product.actions';
import { notFound } from 'next/navigation';
import ImageGallery from '@/components/shared/product/image-gallery';
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
      <div className="grid md:grid-cols-3 gap-8 items-start">
        {/* Columna izquierda: Galería de imágenes */}
        <div className="space-y-4">
          <ImageGallery images={product.images} />
        </div>

        {/* Columna central: Detalles y descripción */}
        <div className="space-y-6">
          <div>
            <div className="text-sm text-muted-foreground mb-2">{product.category}</div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-muted-foreground mb-4">{product.brand}</p>
          </div>

          <div className="space-y-3">
            <div className="text-sm text-muted-foreground">{product.rating} of {product.numReviews} reviews</div>

            <div>
              <div className="inline-block bg-emerald-100 text-emerald-800 rounded-full px-6 py-3 text-2xl font-semibold">
                <ProductPrice value={product.price} />
              </div>
            </div>
          </div>

          <div className="space-y-2 pt-4">
            <h2 className="text-xl font-semibold">Description</h2>
            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>
          </div>
        </div>

        {/* Columna derecha: Panel de compra */}
        <aside className="col-span-1">
          <Card className="sticky top-24">
            <CardContent className="p-6 space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-sm text-muted-foreground">Price</div>
                  <div className="mt-2">
                    <ProductPrice value={product.price} />
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-muted-foreground">Status</div>
                  <div className={`inline-flex items-center px-3 py-1 rounded-full mt-2 ${product.stock > 0 ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                    {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                  </div>
                </div>
              </div>

              {product.stock > 0 && (
                <button className="w-full bg-primary text-primary-foreground py-2 rounded-md hover:bg-primary/90 transition-colors">
                  Add to Cart
                </button>
              )}
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}

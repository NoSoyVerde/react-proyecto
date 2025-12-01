import React from 'react'
import ProductList from '@/components/shared/product/product-list'
import { getLatestProducts } from '@/lib/actions/product.actions'

export default async function HomePage() {
  const data = await getLatestProducts();
  return (
    <div className='wrapper'>
        <ProductList data={data} title='Últimos Productos' limit={4}/>
    </div>
  )
}

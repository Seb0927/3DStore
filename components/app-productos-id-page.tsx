import { getProducts } from '@/models/product/product'
import Image from 'next/image'
import Link from 'next/link'
import { Skeleton } from "@/components/ui/skeleton"
import { Suspense } from 'react'

function ProductSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {[...Array(9)].map((_, i) => (
        <Skeleton key={i} className="h-40 w-full rounded-lg" />
      ))}
    </div>
  )
}

async function ProductGrid() {
  const products = await getProducts()

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {products?.map((product) => (
        <Link href={`/products/${product.id}`} key={product.id}>
          <div className="border rounded-lg p-4">
            <div className="relative h-40 w-full">
              <Image 
                src={product.image || '/placeholder.svg'} 
                alt={product.name}
                fill
                className="object-cover rounded-lg"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <h2 className="text-lg font-bold mt-2">{product.name}</h2>
            <p className="text-gray-600">${product.price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default function ProductsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Productos</h1>
      <Suspense fallback={<ProductSkeleton />}>
        <ProductGrid />
      </Suspense>
    </div>
  )
}
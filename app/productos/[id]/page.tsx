import { getProduct, getProducts } from '@/models/product/product'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ShoppingCart } from 'lucide-react'
import Header from '@/components/Header'

interface ProductPageProps {
  params: {
    id: string
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProduct(params.id)

  if (!product) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-lg border bg-muted">
              <Image
                src={product.image || '/placeholder.svg'}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
          </div>
          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-5xl font-bold tracking-tight">{product.name}</h1>
              <p className="text-4xl font-bold tracking-tight">
                $ {product.price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
              </p>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {product.description}
            </p>
            
            <div className="space-y-4 pt-4">
              <Button 
                size="lg" 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Añadir al carrito
              </Button>
            </div>
            <div className="border rounded-lg p-4 bg-muted">
              <div className="flex items-center justify-center h-64">
                <span className="ml-2 text-muted-foreground">3D Model Placeholder</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export async function generateStaticParams() {
  const products = await getProducts()
  
  return products?.map((product) => ({
    id: product.id,
  })) || []
}

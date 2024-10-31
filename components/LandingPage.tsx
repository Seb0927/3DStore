import { getProducts } from '@/models/product/product'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default async function LandingPage() {
  const products = await getProducts()
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">¡Hola mundo 3D!</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products?.map((product) => (
          <Link 
            href={`/productos/${product.id}`} 
            key={product.id}
            className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105"
          >
            <div className="relative">
              <div className="relative h-48 w-full">
                <Image 
                  src={product.image || '/placeholder.svg'} 
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <div className="flex justify-between items-center">
                  <Button>
                    Añadir
                  </Button>
                  <span className="text-lg font-bold">
                    $ {product.price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
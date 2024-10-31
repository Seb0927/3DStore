'use client'

import Link from 'next/link'
import Image from 'next/image'
import { getProducts } from '@/models/product/product'
import { useState, useEffect } from 'react'
import { Skeleton } from "@/components/ui/skeleton"
import Header from '@/components/Header'

interface Product {
  id: string
  image: string
  name: string
  price: number
  description: string
}

export default function ProductsList() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const productList = await getProducts()
        setProducts(productList || [])
      } catch (err) {
        setError('Failed to load products')
        console.error('Error fetching products:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-500">
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(9)].map((_, i) => (
            <Skeleton key={i} className="h-[300px] w-full rounded-lg" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Productos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <Link 
            href={`/productos/${product.id}`} 
            key={product.id}
            className="group block bg-background rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <div className="border rounded-lg p-4">
              <div className="relative h-40 w-full mb-4">
                <Image
                  src={product.image || '/placeholder.svg'}
                  alt={product.name}
                  fill
                  className="rounded-lg object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={false}
                />
              </div>
              <h2 className="text-lg font-bold group-hover:text-primary transition-colors duration-200">
                {product.name}
              </h2>
              <p className="text-muted-foreground mt-1">
                $ {product.price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
              </p>
            </div>
          </Link>
        ))}
      </div>
      {products.length === 0 && !loading && (
        <p className="text-center text-muted-foreground mt-8">
          No products found.
        </p>
      )}
    </div>
    </div>
  )
}
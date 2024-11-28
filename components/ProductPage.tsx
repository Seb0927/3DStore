"use client"

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { useUser } from '@/context/UserContext'
import { DocumentData } from 'firebase/firestore';
import { updateUser } from '@/models/user/users';
import { ShoppingCart } from 'lucide-react'
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import ModelViewer from '@/components/ModelViewer';
import { Suspense } from 'react';
import { Loader } from '@/components/loader';

interface ProductPageProps {
  product: DocumentData | undefined;
}

export default function ProductPage({ product }: ProductPageProps) {
  const { user, setUser } = useUser();

  const handleAddToCart = () => {
    if (user) {
      const newShoppingCart = { ...user.shoppingCart };
      if (newShoppingCart[product?.id]) {
        newShoppingCart[product?.id] += 1;
      } else {
        newShoppingCart[product?.id] = 1;
      }
      const updatedUser = { ...user, shoppingCart: newShoppingCart };
      setUser(updatedUser);
      updateUser(updatedUser);
    }
  };

  return (
    <div className="container mx-auto px-44 py-8">
      <div className="grid lg:grid-cols-2 gap-8 items-start">
        <div className="flex items-center justify-center space-y-4 h-full">
          <div className="relative aspect-square overflow-hidden rounded-lg border bg-muted h-5/6 w-5/6">
            <Image
              src={product?.image || '/placeholder.svg'}
              alt={product?.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
        </div>
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight">{product?.name}</h1>
            <p className="text-3xl font-bold tracking-tight">
              $ {product?.price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
            </p>
          </div>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {product?.description}
          </p>

          <div className="space-y-4 pt-4">
            <Button
              size="lg"
              onClick={handleAddToCart}
              disabled={!!!user}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              <ShoppingCart
                className="mr-2 h-5 w-5" />
              {user ? "Añadir al carrito" : "Inicia sesión para añadir"}
            </Button>
          </div>
          <div className="border rounded-lg p-4 bg-muted">
            {product?.model ? <Canvas style={{ height: 500 }}>
              <Suspense fallback={<Loader />}>
                <ambientLight />
                <pointLight position={[10, 10, 10]} />
                <ModelViewer url={product.model} />
                <OrbitControls />
              </Suspense>
            </Canvas>
            : <div className="flex items-center justify-center h-64">
              <span className="ml-2 text-muted-foreground">3D Model Not Available</span>
            </div>}
          </div>
        </div>
      </div>
    </div>
  )
}
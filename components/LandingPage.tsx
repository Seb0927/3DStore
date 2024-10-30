'use client'

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { getProducts } from '../models/product/product';

export default function LandingPage() {
  const [products, setProducts] = useState<{ id: number; image: string; name: string; description: string; price: string; }[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getProducts();
      const formattedProducts = (products ?? []).map(product => ({
        ...product,
        price: "$ " + product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
      }));
      setProducts(formattedProducts || []);
    };

    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">¡Hola mundo 3D!</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <Image src={product.image} alt={product.name} width={400} height={400} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <div className="flex justify-between items-center">
                <button className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600">
                  Añadir
                </button>
                <span className="text-lg font-bold">{product.price}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
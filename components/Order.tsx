'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { useUser } from "@/context/UserContext"
import { getProduct } from "@/models/product/product"
import { updateUser } from "@/models/user/users"
import { createOrder } from "@/models/order/order"
import { ArrowLeft, ArrowRight, Minus, Plus } from "lucide-react"
import { useRouter } from 'next/navigation'

interface CartItem {
  id: string
  name: string
  platform: string
  image: string
  price: number
  quantity: number
}

export default function Order() {
  const { user } = useUser();
  const [items, setItems] = useState<CartItem[]>([])
  const router = useRouter()
  
  const handleCatalog = () => {
    // Navigate to the catalog page
    router.push('/')
  }

  const fetchCartItems = async () => {
    if (user && user.shoppingCart) {
      const cartItems: CartItem[] = []
      for (const productId in user.shoppingCart) {
        const product = await getProduct(productId);
        if (product) {
          cartItems.push({
            id: productId,
            name: product.name,
            platform: product.platform,
            image: product.image,
            price: product.price,
            quantity: user.shoppingCart[productId]
          })
        }
      }
      setItems(cartItems)
      console.log(cartItems)
    }
  }

  const updateCartUser = async (cart: { [productId: string]: number }) => {
    if (user) {
      const updatedUser = {
        ...user,
        shoppingCart: cart
      }
      await updateUser(updatedUser)
    }
  }

  const order = async () => {
    if (user && user.shoppingCart) {
      const orderItems = items.map(item => ({
        productId: item.id,
        quantity: item.quantity
      }))
      
      const order = {
        userId: user.uid,
        shoppingCart: orderItems,
        total: items.reduce((sum, item) => sum + item.price * item.quantity, 0)
      }

      await createOrder(order, user.email)
      //await updateUser({ ...user, shoppingCart: {} })
      //setItems([])
    } 
  }

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return
    setItems(items.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    ))
  }

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id))
  }

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)

  // Fetch the items that the user has in its shopping cart
  useEffect(() => {
    fetchCartItems()
  }, [user])

  // Update the changes to the shoppingCart made by the user
  useEffect(() => {
    updateCartUser(items.reduce((cart: { [productId: string]: number }, item) => {
      cart[item.id] = item.quantity
      return cart
    }, {}))
  }, [items])

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Carrito de compras</h1>
        <span className="text-lg">{totalItems} {totalItems === 1 ? 'Producto' : 'Productos'}</span>
      </div>

      <Separator className="mb-8" />

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="hidden md:table-header-group">
            <tr className="text-left border-b">
              <th className="pb-4 font-semibold">Producto</th>
              <th className="pb-4 font-semibold">Cantidad</th>
              <th className="pb-4 font-semibold">Precio</th>
              <th className="pb-4 font-semibold">Total</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-b flex flex-col md:table-row">
                <td className="py-4">
                  <div className="flex items-center space-x-4">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={80}
                      height={80}
                      className="rounded-md"
                    />
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-gray-500">{item.platform}</p>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-sm text-blue-500 hover:underline mt-1"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </td>
                <td className="py-4">
                  <div className="flex items-center justify-between md:justify-start space-x-2">
                    <span className="md:hidden font-medium">Quantity:</span>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                        className="w-16 text-center"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </td>
                <td className="py-4 flex justify-between md:table-cell">
                  <span className="md:hidden font-medium">Price:</span>
                  <span>${item.price}</span>
                </td>
                <td className="py-4 flex justify-between md:table-cell">
                  <span className="md:hidden font-medium">Total:</span>
                  <span>${(item.price * item.quantity)}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center mt-8 space-y-4 md:space-y-0">
        <Button variant="outline" className="w-full md:w-auto flex items-center justify-center space-x-2" onClick={handleCatalog}>
          <ArrowLeft className="h-4 w-4" />
          <span>Volver al catálogo</span>
        </Button>
        <Button 
        onClick={order}
        className="w-full md:w-auto flex items-center justify-center space-x-2">
          <span>Ordenar</span>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
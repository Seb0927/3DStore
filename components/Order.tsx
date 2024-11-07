'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, ArrowRight, Minus, Plus } from "lucide-react"
import { Separator } from "@/components/ui/separator"

interface CartItem {
  id: number
  name: string
  platform: string
  image: string
  price: number
  quantity: number
}

export default function Order() {
  const [items, setItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "FIFA 19",
      platform: "PS4",
      image: "/placeholder.svg",
      price: 44.00,
      quantity: 2
    },
    {
      id: 2,
      name: "Glacier White 500GB",
      platform: "PS4",
      image: "/placeholder.svg",
      price: 249.99,
      quantity: 1
    },
    {
      id: 3,
      name: "Platinum Headset",
      platform: "PS4",
      image: "/placeholder.svg",
      price: 119.99,
      quantity: 1
    }
  ])

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return
    setItems(items.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ))
  }

  const removeItem = (id: number) => {
    setItems(items.filter(item => item.id !== id))
  }

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Shopping Cart</h1>
        <span className="text-lg">{totalItems} Items</span>
      </div>
      
      <Separator className="mb-8" />

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="hidden md:table-header-group">
            <tr className="text-left border-b">
              <th className="pb-4 font-medium">PRODUCT DETAILS</th>
              <th className="pb-4 font-medium">QUANTITY</th>
              <th className="pb-4 font-medium">PRICE</th>
              <th className="pb-4 font-medium">TOTAL</th>
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
                        Remove
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
                  <span>£{item.price.toFixed(2)}</span>
                </td>
                <td className="py-4 flex justify-between md:table-cell">
                  <span className="md:hidden font-medium">Total:</span>
                  <span>£{(item.price * item.quantity).toFixed(2)}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center mt-8 space-y-4 md:space-y-0">
        <Button variant="outline" className="w-full md:w-auto flex items-center justify-center space-x-2">
          <ArrowLeft className="h-4 w-4" />
          <span>Continue Shopping</span>
        </Button>
        <Button className="w-full md:w-auto flex items-center justify-center space-x-2">
          <span>Order</span>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
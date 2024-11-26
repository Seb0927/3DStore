'use client'

import { useEffect, useState } from 'react';
import { useUser } from '@/context/UserContext'
import { getOrders, deleteOrder } from '@/models/order/order';
import { sendOrderProcessedEmail, sendOrderRejectedEmail} from '@/models/order/orderEmail.js';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Check, Trash2 } from 'lucide-react'

interface Product {
  name: string
  price: number
  quantity: number
}

interface Order {
  id: string
  products: Product[]
  totalPrice: number
  customerName: string
  phoneNumber: string
  address: string
}

function OrderList() {
  const { user } = useUser();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const orders = await getOrders();
      setOrders(orders || []);
    };

    fetchOrders();
  }, []);
  
  const handleDelete = async (id: string) => {
    const order = orders.find(order => order.id === id);
    if (order) {
      await deleteOrder(id);
      await sendOrderRejectedEmail(user?.email, order.products);
      setOrders(orders.filter(order => order.id !== id));
    }
  };

  const handleApprove = async (id: string) => {
    const order = orders.find(order => order.id === id);
    if (order) {
      await deleteOrder(id);
      await sendOrderProcessedEmail(user?.email , order.products);
      setOrders(orders.filter(order => order.id !== id));
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Order Management</h1>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px] font-bold text-base text-slate-800">Detalles del producto</TableHead>
              <TableHead className="font-bold text-base text-slate-800">Precio total</TableHead>
              <TableHead className="font-bold text-base text-slate-800">Cliente</TableHead>
              <TableHead className="font-bold text-base text-slate-800">Número telefónico</TableHead>
              <TableHead className="font-bold text-base text-slate-800">Dirección</TableHead>
              <TableHead className="font-bold text-base text-slate-800">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">
                  <ul className="list-disc pl-5">
                    {order.products.map((product, index) => (
                      <li key={index}>
                        {product.name} (x{product.quantity})
                      </li>
                    ))}
                  </ul>
                </TableCell>
                <TableCell>${order.totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</TableCell>
                <TableCell>{order.customerName}</TableCell>
                <TableCell>{order.phoneNumber}</TableCell>
                <TableCell>{order.address}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      onClick={() => handleApprove(order.id)} 
                      size="sm" 
                      variant="outline" 
                      className="bg-green-100 hover:bg-green-200 text-green-700 border-green-300"
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button
                      onClick={() => handleDelete(order.id)}
                      size="sm" 
                      variant="outline" 
                      className="bg-red-100 hover:bg-red-200 text-red-700 border-red-300"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default OrderList
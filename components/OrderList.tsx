import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Check, Trash2 } from 'lucide-react'

interface Product {
  name: string
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

const orders: Order[] = [
  {
    id: '1',
    products: [
      { name: 'FIFA 19', quantity: 2 },
      { name: 'Glacier White 500GB PS4', quantity: 1 }
    ],
    totalPrice: 337.99,
    customerName: 'John Doe',
    phoneNumber: '+1 234 567 8901',
    address: '123 Main St, Anytown, AN 12345'
  },
  {
    id: '2',
    products: [
      { name: 'Platinum Headset', quantity: 1 },
      { name: 'DualShock 4 Controller', quantity: 2 }
    ],
    totalPrice: 219.97,
    customerName: 'Jane Smith',
    phoneNumber: '+1 987 654 3210',
    address: '456 Elm St, Othertown, OT 67890'
  },
]

function OrderList() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Order Management</h1>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px] font-bold text-base text-slate-800">Product Details</TableHead>
              <TableHead className="font-bold text-base text-slate-800">Total Price</TableHead>
              <TableHead className="font-bold text-base text-slate-800">Customer Name</TableHead>
              <TableHead className="font-bold text-base text-slate-800">Phone Number</TableHead>
              <TableHead className="font-bold text-base text-slate-800">Address</TableHead>
              <TableHead className="font-bold text-base text-slate-800">Manage</TableHead>
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
                <TableCell>£{order.totalPrice.toFixed(2)}</TableCell>
                <TableCell>{order.customerName}</TableCell>
                <TableCell>{order.phoneNumber}</TableCell>
                <TableCell>{order.address}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="bg-green-100 hover:bg-green-200 text-green-700 border-green-300"
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button 
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
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useToast } from '@/components/ui/use-toast'

// Mock data for demonstration
const initialOrders = [
  { id: '1', customer: 'John Doe', book: 'To Kill a Mockingbird', status: 'Pending', date: '2023-06-01' },
  { id: '2', customer: 'Jane Smith', book: '1984', status: 'Shipped', date: '2023-05-28' },
  { id: '3', customer: 'Bob Johnson', book: 'Pride and Prejudice', status: 'Delivered', date: '2023-05-25' },
]

export default function ManageOrdersPage() {
  const [orders, setOrders] = useState(initialOrders)
  const [filter, setFilter] = useState('')
  const { toast } = useToast()

  const filteredOrders = orders.filter(order => 
    order.customer.toLowerCase().includes(filter.toLowerCase()) ||
    order.book.toLowerCase().includes(filter.toLowerCase()) ||
    order.status.toLowerCase().includes(filter.toLowerCase())
  )

  const handleStatusChange = (orderId: string, newStatus: string) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ))
    toast({
      title: "Order Status Updated",
      description: `Order ${orderId} status changed to ${newStatus}`,
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-teal-700">Manage Customer Orders</h1>
      <div className="mb-4 flex justify-between items-center">
        <Input
          type="text"
          placeholder="Filter orders..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="max-w-sm"
        />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Book</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredOrders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>{order.customer}</TableCell>
              <TableCell>{order.book}</TableCell>
              <TableCell>{order.status}</TableCell>
              <TableCell>{order.date}</TableCell>
              <TableCell>
                <Select onValueChange={(value) => handleStatusChange(order.id, value)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Update Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Processing">Processing</SelectItem>
                    <SelectItem value="Shipped">Shipped</SelectItem>
                    <SelectItem value="Delivered">Delivered</SelectItem>
                    <SelectItem value="Cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}


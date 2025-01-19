'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useToast } from '@/components/ui/use-toast'

// Mock data for demonstration
const initialOrders = [
  { id: '1', customer: 'John Doe', book: 'To Kill a Mockingbird', status: 'In Transit', location: 'New York', estimatedDelivery: '2023-06-05' },
  { id: '2', customer: 'Jane Smith', book: '1984', status: 'Out for Delivery', location: 'Los Angeles', estimatedDelivery: '2023-06-02' },
  { id: '3', customer: 'Bob Johnson', book: 'Pride and Prejudice', status: 'Delivered', location: 'Chicago', estimatedDelivery: '2023-05-30' },
]

export default function TrackOrdersPage() {
  const [orders, setOrders] = useState(initialOrders)
  const [searchTerm, setSearchTerm] = useState('')
  const { toast } = useToast()

  const filteredOrders = orders.filter(order => 
    order.id.includes(searchTerm) ||
    order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.book.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleUpdateLocation = (orderId: string, newLocation: string) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, location: newLocation } : order
    ))
    toast({
      title: "Order Location Updated",
      description: `Order ${orderId} location updated to ${newLocation}`,
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-teal-700">Track Order Status</h1>
      <div className="mb-4 flex justify-between items-center">
        <Input
          type="text"
          placeholder="Search orders by ID, customer, or book..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
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
            <TableHead>Current Location</TableHead>
            <TableHead>Estimated Delivery</TableHead>
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
              <TableCell>{order.location}</TableCell>
              <TableCell>{order.estimatedDelivery}</TableCell>
              <TableCell>
                <Input
                  type="text"
                  placeholder="Update location"
                  className="w-32 mr-2"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleUpdateLocation(order.id, e.currentTarget.value)
                      e.currentTarget.value = ''
                    }
                  }}
                />
                <Button onClick={() => {
                  const input = document.querySelector(`input[placeholder="Update location"]`) as HTMLInputElement
                  if (input) {
                    handleUpdateLocation(order.id, input.value)
                    input.value = ''
                  }
                }}>
                  Update
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}


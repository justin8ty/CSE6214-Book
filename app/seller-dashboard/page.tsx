'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

// Mock data for demonstration
const initialBooks = [
  { id: '1', title: 'To Kill a Mockingbird', author: 'Harper Lee', price: 8.99, stock: 5 },
  { id: '2', title: '1984', author: 'George Orwell', price: 10.99, stock: 3 },
]

const initialOrders = [
  { id: '1', bookId: '1', customerName: 'John Doe', status: 'Processing' },
  { id: '2', bookId: '2', customerName: 'Jane Smith', status: 'Shipped' },
]

export default function SellerDashboardPage() {
  const [books, setBooks] = useState(initialBooks)
  const [orders, setOrders] = useState(initialOrders)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Seller Dashboard</h1>
        <div className="flex gap-4">
          <Link href="/seller/manage-orders">
            <Button>Manage Orders</Button>
          </Link>
          <Link href="/seller/track-orders">
            <Button>Track Orders</Button>
          </Link>
          <Link href="/seller/view-feedback">
            <Button>View Feedback</Button>
          </Link>
        </div>
      </div>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">My Books</h2>
        <Link href="/add-book">
          <Button>Add New Book</Button>
        </Link>
        <table className="w-full mt-4">
          <thead>
            <tr>
              <th className="text-left">Title</th>
              <th className="text-left">Author</th>
              <th className="text-left">Price</th>
              <th className="text-left">Stock</th>
              <th className="text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>${book.price.toFixed(2)}</td>
                <td>{book.stock}</td>
                <td>
                  <Button variant="outline" size="sm">Edit</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Recent Orders</h2>
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left">Order ID</th>
              <th className="text-left">Book</th>
              <th className="text-left">Customer</th>
              <th className="text-left">Status</th>
              <th className="text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{books.find(book => book.id === order.bookId)?.title}</td>
                <td>{order.customerName}</td>
                <td>{order.status}</td>
                <td>
                  <Button variant="outline" size="sm">Update Status</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  )
}
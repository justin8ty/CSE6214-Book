'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { db, auth } from '@/config/firebase'
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'

export default function SellerDashboardPage() {
  const [user] = useAuthState(auth)
  const [books, setBooks] = useState([])
  const [orders, setOrders] = useState([])

  useEffect(() => {
    if (!user) return

    const fetchBooksAndOrders = async () => {
      try {
        // Fetch books linked to the seller
        const booksQuery = query(collection(db, 'bookDetails'), where('sellerId', '==', user.uid))
        const booksSnapshot = await getDocs(booksQuery)
        setBooks(booksSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))

        // Fetch orders linked to the seller
        const ordersQuery = query(collection(db, 'orders'), where('sellerId', '==', user.uid))
        const ordersSnapshot = await getDocs(ordersQuery)
        setOrders(ordersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchBooksAndOrders()
  }, [user])

  const handleUpdateOrderStatus = async (id: string, newStatus: string) => {
    try {
      const orderRef = doc(db, 'orders', id)
      await updateDoc(orderRef, { status: newStatus })
      setOrders(prev => prev.map(order => (order.id === id ? { ...order, status: newStatus } : order)))
    } catch (error) {
      console.error('Error updating order status:', error)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Seller Dashboard</h1>

      {/* My Books */}
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
            {books.map(book => (
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

      {/* Recent Orders */}
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
            {orders.map(order => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{books.find(book => book.id === order.bookId)?.title}</td>
                <td>{order.customerName}</td>
                <td>{order.status}</td>
                <td>
                  {order.status !== 'Delivered' && (
                    <Button variant="outline" size="sm" onClick={() => handleUpdateOrderStatus(order.id, 'Shipped')}>Mark as Shipped</Button>
                  )}
                  {order.status === 'Shipped' && (
                    <Button variant="outline" size="sm" onClick={() => handleUpdateOrderStatus(order.id, 'Delivered')}>Mark as Delivered</Button>
                  )}
                  {order.status === 'Delivered' && (
                    <Button variant="outline" size="sm" onClick={() => handleUpdateOrderStatus(order.id, 'Returned')}>Handle Return</Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  )
}

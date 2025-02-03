'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { db } from '@/config/firebase' // Import Firebase Firestore instance
import { collection, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore'

export default function AdminDashboardPage() {
  const [sellerApplications, setSellerApplications] = useState<any[]>([])
  const [users, setUsers] = useState<any[]>([])
  const [products, setProducts] = useState<any[]>([])
  const [feedback, setFeedback] = useState<any[]>([])
  const { toast } = useToast()

  // Fetch seller applications (users with role "seller" and status "Pending")
  const fetchSellerApplications = async () => {
    const querySnapshot = await getDocs(collection(db, 'users'))
    const applications = querySnapshot.docs
      .map(doc => ({ id: doc.id, ...doc.data() }))
      .filter((user: any) => user.role === 'seller')
    setSellerApplications(applications)
  }

  // Fetch all users
  const fetchUsers = async () => {
    const querySnapshot = await getDocs(collection(db, 'users'))
    const users = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    setUsers(users)
  }

  // Fetch products
  const fetchProducts = async () => {
    const querySnapshot = await getDocs(collection(db, 'bookDetails'))
    const products = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    setProducts(products)
  }

  // Fetch feedback (complaints)
  const fetchFeedback = async () => {
    const querySnapshot = await getDocs(collection(db, 'complaints'))
    const feedback = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
    setFeedback(feedback)
  }

  // Fetch data on component mount
  useEffect(() => {
    fetchSellerApplications()
    fetchUsers()
    fetchProducts()
    fetchFeedback()
  }, [])

  // Approve seller application
  const handleApproveApplication = async (id: string) => {
    const sellerRef = doc(db, 'users', id)
    await updateDoc(sellerRef, { status: 'Approved' })
    fetchSellerApplications() // Refresh the list
    toast({
      title: 'Success',
      description: 'Seller application approved.',
    })
  }

  // Remove user account
  const handleRemoveUser = async (id: string) => {
    const userRef = doc(db, 'users', id)
    await deleteDoc(userRef)
    fetchUsers() // Refresh the list
    toast({
      title: 'Success',
      description: 'User account removed.',
    })
  }

  // Approve product
  const handleApproveProduct = async (id: string) => {
    const productRef = doc(db, 'bookDetails', id)
    await updateDoc(productRef, { status: 'Approved' })
    fetchProducts() // Refresh the list
    toast({
      title: 'Success',
      description: 'Product approved.',
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      {/* Seller Applications */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Seller Applications</h2>
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left">Email</th>
              <th className="text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sellerApplications.map((app) => (
              <tr key={app.id}>
                <td>{app.email}</td>
                <td>
                  {app.status === 'Pending' && (
                    <Button onClick={() => handleApproveApplication(app.id)}>Approve</Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* User Management */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">User Management</h2>
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left">Email</th>
              <th className="text-left">Role</th>
              <th className="text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <Button variant="destructive" onClick={() => handleRemoveUser(user.id)}>Remove</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Product Verification */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Product Verification</h2>
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left">Title</th>
              <th className="text-left">Seller</th>
              <th className="text-left">Status</th>
              <th className="text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.title}</td>
                <td>{product.seller}</td>
                <td>{product.status || 'Pending'}</td>
                <td>
                  {(!product.status || product.status === 'Pending') && (
                    <Button onClick={() => handleApproveProduct(product.id)}>Approve</Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Feedback */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Feedback</h2>
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left">Subject</th>
              <th className="text-left">Description</th>
              <th className="text-left">Customer</th>
              <th className="text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {feedback.map((fb) => (
              <tr key={fb.id}>
                <td>{fb.subject}</td>
                <td>{fb.description}</td>
                <td>{fb.customer}</td>
                <td>{fb.date?.toDate().toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  )
}
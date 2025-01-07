'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'

// Mock data for demonstration
const initialSellerApplications = [
  { id: '1', name: 'John Doe', email: 'john@example.com', status: 'Pending' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', status: 'Approved' },
]

const initialUsers = [
  { id: '1', name: 'Alice Johnson', email: 'alice@example.com', role: 'Buyer' },
  { id: '2', name: 'Bob Williams', email: 'bob@example.com', role: 'Seller' },
]

const initialProducts = [
  { id: '1', title: 'To Kill a Mockingbird', seller: 'John Doe', status: 'Approved' },
  { id: '2', title: '1984', seller: 'Jane Smith', status: 'Pending' },
]

export default function AdminDashboardPage() {
  const [sellerApplications, setSellerApplications] = useState(initialSellerApplications)
  const [users, setUsers] = useState(initialUsers)
  const [products, setProducts] = useState(initialProducts)
  const { toast } = useToast()

  const handleApproveApplication = (id: string) => {
    setSellerApplications(sellerApplications.map(app => 
      app.id === id ? { ...app, status: 'Approved' } : app
    ))
    toast({
      title: "Success",
      description: "Seller application approved.",
    })
  }

  const handleRemoveUser = (id: string) => {
    setUsers(users.filter(user => user.id !== id))
    toast({
      title: "Success",
      description: "User account removed.",
    })
  }

  const handleApproveProduct = (id: string) => {
    setProducts(products.map(product => 
      product.id === id ? { ...product, status: 'Approved' } : product
    ))
    toast({
      title: "Success",
      description: "Product approved.",
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Seller Applications</h2>
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left">Name</th>
              <th className="text-left">Email</th>
              <th className="text-left">Status</th>
              <th className="text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sellerApplications.map((app) => (
              <tr key={app.id}>
                <td>{app.name}</td>
                <td>{app.email}</td>
                <td>{app.status}</td>
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

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">User Management</h2>
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left">Name</th>
              <th className="text-left">Email</th>
              <th className="text-left">Role</th>
              <th className="text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
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

      <section>
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
                <td>{product.status}</td>
                <td>
                  {product.status === 'Pending' && (
                    <Button onClick={() => handleApproveProduct(product.id)}>Approve</Button>
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


import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function AdminDashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-blue-100 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Seller Approvals</h2>
          <p className="mb-4">Review and approve new seller registrations.</p>
          <Link href="/admin/seller-approvals">
            <Button>Manage Approvals</Button>
          </Link>
        </div>
        <div className="bg-green-100 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">User Management</h2>
          <p className="mb-4">Manage user accounts and permissions.</p>
          <Link href="/admin/user-management">
            <Button>Manage Users</Button>
          </Link>
        </div>
        <div className="bg-yellow-100 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Product Verification</h2>
          <p className="mb-4">Verify and approve product listings.</p>
          <Link href="/admin/product-verification">
            <Button>Verify Products</Button>
          </Link>
        </div>
        <div className="bg-purple-100 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Feedback Management</h2>
          <p className="mb-4">Review and manage user feedback.</p>
          <Link href="/admin/feedback">
            <Button>Manage Feedback</Button>
          </Link>
        </div>
        <div className="bg-red-100 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Reports</h2>
          <p className="mb-4">Generate and view system reports.</p>
          <Link href="/admin/reports">
            <Button>View Reports</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}


import Link from 'next/link'
import { Button } from '@/components/ui/button'

interface UserDashboardProps {
  userType: 'buyer' | 'seller'
}

export default function UserDashboard({ userType }: UserDashboardProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">
        {userType === 'buyer' ? 'Buyer Dashboard' : 'Seller Dashboard'}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {userType === 'buyer' && (
          <>
            <div className="bg-blue-100 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4">My Orders</h2>
              <p className="mb-4">View and track your recent orders.</p>
              <Link href="/orders">
                <Button>View Orders</Button>
              </Link>
            </div>
            <div className="bg-green-100 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4">My Wishlist</h2>
              <p className="mb-4">Manage your wishlist of desired books.</p>
              <Link href="/wishlist">
                <Button>View Wishlist</Button>
              </Link>
            </div>
          </>
        )}
        {userType === 'seller' && (
          <>
            <div className="bg-blue-100 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4">My Listings</h2>
              <p className="mb-4">Manage your book listings and inventory.</p>
              <Link href="/listings">
                <Button>View Listings</Button>
              </Link>
            </div>
            <div className="bg-green-100 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4">Sales Report</h2>
              <p className="mb-4">View your sales performance and analytics.</p>
              <Link href="/sales-report">
                <Button>View Report</Button>
              </Link>
            </div>
          </>
        )}
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Account Settings</h2>
        <Link href="/account-settings">
          <Button variant="outline">Manage Account</Button>
        </Link>
      </div>
    </div>
  )
}


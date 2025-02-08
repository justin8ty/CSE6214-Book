'use client'

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { User, Book, Heart, ShoppingCart, AlertCircle, CreditCard, LogOut, UserPlus, Search } from "lucide-react"
import { getAuth } from "firebase/auth"
import { db } from "@/config/firebase"
import { doc, getDoc } from "firebase/firestore"
import { Input } from "@/components/ui/input"

export default function UserDashboard() {
  const [userData, setUserData] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const { toast } = useToast()

  const authInstance = getAuth()

  useEffect(() => {
    const currentUser = authInstance.currentUser
    if (currentUser) {
      fetchUserData(currentUser.uid)
    } else {
      setError("No user is logged in.")
    }
  }, [])

  const fetchUserData = async (uid: string) => {
    try {
      const userDocRef = doc(db, "users", uid)
      const userDoc = await getDoc(userDocRef)
      if (userDoc.exists()) {
        setUserData(userDoc.data())
      } else {
        setError("User not found")
      }
    } catch (error) {
      setError("Failed to fetch user data")
      console.error(error)
    }
  }

  const handleLogout = () => {
    console.log("Logging out")
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    })
    router.push("/login")
  }

  const handleRegisterAsSeller = () => {
    console.log("Registering as seller")
    toast({
      title: "Seller Registration",
      description: "Redirecting to seller registration form.",
    })
    router.push("/seller-register")
  }

  // Search function (same as in Main page)
  const [query, setQuery] = useState('')
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`)
    }
  }

  if (error) {
    return <div>{error}</div>
  }

  if (!userData) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-teal-700">Welcome, {userData.name}</h1>
        <Button onClick={handleLogout} variant="outline" className="flex items-center">
          <LogOut className="mr-2 h-4 w-4" /> Logout
        </Button>
      </div>

       {/* Search Bar */}
       <form onSubmit={handleSearch} className="flex justify-center mb-8">
        <div className="relative w-full max-w-xl">
          <Input
            type="text"
            placeholder="Search for books..."
            className="pr-10"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button type="submit" className="absolute right-0 top-0 bottom-0">
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="mr-2 h-5 w-5 text-teal-500" /> Profile Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p>
                <strong>Name:</strong> {userData.name}
              </p>
              <p>
                <strong>Email:</strong> {userData.email}
              </p>
              <p>
                <strong>Member Since:</strong> {userData.createdAt.toDate().toLocaleDateString()}
              </p>
            </div>
            <Link href="/profile">
              <Button className="mt-4 w-full">Edit Profile</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Book className="mr-2 h-5 w-5 text-teal-500" /> Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-teal-600">{userData.ordersCount || 0}</p>
            <p className="text-sm text-gray-600">Total Orders</p>
            <Link href="/orders">
              <Button className="mt-4 w-full">View Orders</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Heart className="mr-2 h-5 w-5 text-teal-500" /> Wishlist
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-teal-600">{userData.wishlistCount || 0}</p>
            <p className="text-sm text-gray-600">Saved Items</p>
            <Link href="/wishlist">
              <Button className="mt-4 w-full">View Wishlist</Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <ShoppingCart className="mr-2 h-5 w-5 text-teal-500" /> Shopping Cart
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-teal-600">{userData.cartItemsCount || 0}</p>
            <p className="text-sm text-gray-600">Items in Cart</p>
            <Link href="/cart">
              <Button className="mt-4 w-full">View Cart</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertCircle className="mr-2 h-5 w-5 text-teal-500" /> Raise Complaint
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">Have an issue? Let us know.</p>
            <Link href="/complaint">
              <Button className="mt-4 w-full">Submit Complaint</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CreditCard className="mr-2 h-5 w-5 text-teal-500" /> Payment Methods
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">Manage your payment options</p>
            <Link href="/payment">
              <Button className="mt-4 w-full">Manage Payments</Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="flex items-center">
            <UserPlus className="mr-2 h-5 w-5 text-teal-500" /> Become a Seller
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 mb-4">Want to sell your books? Register as a seller today!</p>
          <Button onClick={handleRegisterAsSeller} className="w-full">
            Register as Seller
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
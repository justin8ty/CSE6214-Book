"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { User, Book, Heart, ShoppingCart, AlertCircle, CreditCard, LogOut, UserPlus } from "lucide-react"

// Mock user data for demonstration
const userData = {
  name: "John Doe",
  email: "john.doe@example.com",
  memberSince: "January 2023",
  ordersCount: 5,
  wishlistCount: 3,
  cartItemsCount: 2,
}

export default function UserDashboard() {
  const router = useRouter()
  const { toast } = useToast()

  const handleLogout = () => {
    // Implement logout functionality here
    console.log("Logging out")
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    })
    router.push("/login")
  }

  const handleRegisterAsSeller = () => {
    // Implement seller registration logic here
    console.log("Registering as seller")
    toast({
      title: "Seller Registration",
      description: "Redirecting to seller registration form.",
    })
    router.push("/seller-register")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-teal-700">Welcome, {userData.name}</h1>
        <Button onClick={handleLogout} variant="outline" className="flex items-center">
          <LogOut className="mr-2 h-4 w-4" /> Logout
        </Button>
      </div>

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
                <strong>Member Since:</strong> {userData.memberSince}
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
            <p className="text-2xl font-bold text-teal-600">{userData.ordersCount}</p>
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
            <p className="text-2xl font-bold text-teal-600">{userData.wishlistCount}</p>
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
            <p className="text-2xl font-bold text-teal-600">{userData.cartItemsCount}</p>
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
            <Link href="/payment-methods">
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
  )
}


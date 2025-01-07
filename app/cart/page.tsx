'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'

// Mock data for demonstration
const initialCart = [
  { id: '1', title: 'To Kill a Mockingbird', author: 'Harper Lee', price: 8.99, quantity: 1, imageUrl: '/placeholder.svg?height=300&width=200' },
  { id: '2', title: '1984', author: 'George Orwell', price: 10.99, quantity: 2, imageUrl: '/placeholder.svg?height=300&width=200' },
]

export default function CartPage() {
  const [cart, setCart] = useState(initialCart)
  const { toast } = useToast()

  const handleUpdateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return
    setCart(cart.map(item => item.id === id ? { ...item, quantity: newQuantity } : item))
  }

  const handleRemoveItem = (id: string) => {
    setCart(cart.filter(item => item.id !== id))
    toast({
      title: "Success",
      description: "Item removed from cart.",
    })
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handleCheckout = () => {
    // Implement checkout logic here
    toast({
      title: "Success",
      description: "Proceeding to checkout.",
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center space-x-4 border-b pb-4">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  width={80}
                  height={120}
                  className="object-cover"
                />
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-gray-600">{item.author}</p>
                  <p className="text-lg font-bold">${item.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}>-</Button>
                  <span>{item.quantity}</span>
                  <Button variant="outline" size="sm" onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}>+</Button>
                </div>
                <Button variant="ghost" size="sm" onClick={() => handleRemoveItem(item.id)}>
                  Remove
                </Button>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Total: ${total.toFixed(2)}</h2>
            <Button onClick={handleCheckout}>Proceed to Checkout</Button>
          </div>
        </>
      )}
    </div>
  )
}


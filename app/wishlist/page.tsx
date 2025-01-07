'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'

// Mock data for demonstration
const initialWishlist = [
  { id: '1', title: 'To Kill a Mockingbird', author: 'Harper Lee', price: 8.99, imageUrl: '/placeholder.svg?height=300&width=200' },
  { id: '2', title: '1984', author: 'George Orwell', price: 10.99, imageUrl: '/placeholder.svg?height=300&width=200' },
]

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState(initialWishlist)
  const { toast } = useToast()

  const handleRemoveFromWishlist = (id: string) => {
    setWishlist(wishlist.filter(book => book.id !== id))
    toast({
      title: "Success",
      description: "Book removed from wishlist.",
    })
  }

  const handleAddToCart = (id: string) => {
    // Implement add to cart logic here
    toast({
      title: "Success",
      description: "Book added to cart.",
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>
      {wishlist.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((book) => (
            <div key={book.id} className="border rounded-lg overflow-hidden shadow-lg">
              <Image
                src={book.imageUrl}
                alt={book.title}
                width={200}
                height={300}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{book.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{book.author}</p>
                <p className="text-lg font-bold mb-4">${book.price.toFixed(2)}</p>
                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => handleRemoveFromWishlist(book.id)}>
                    Remove
                  </Button>
                  <Button onClick={() => handleAddToCart(book.id)}>Add to Cart</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}


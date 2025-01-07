'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'

// Mock data for demonstration
const book = {
  id: '1',
  title: 'To Kill a Mockingbird',
  author: 'Harper Lee',
  description: 'To Kill a Mockingbird is a novel by Harper Lee published in 1960. It was immediately successful, winning the Pulitzer Prize, and has become a classic of modern American literature.',
  price: 8.99,
  condition: 'Good',
  seller: 'BookLover123',
  imageUrl: '/placeholder.svg?height=300&width=200'
}

export default function BookDetailsPage({ params }: { params: { id: string } }) {
  const [isInWishlist, setIsInWishlist] = useState(false)
  const { toast } = useToast()

  const handleAddToCart = () => {
    // Implement add to cart logic here
    toast({
      title: "Success",
      description: "Book added to cart.",
    })
  }

  const handleToggleWishlist = () => {
    setIsInWishlist(!isInWishlist)
    toast({
      title: "Success",
      description: isInWishlist ? "Book removed from wishlist." : "Book added to wishlist.",
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Image
            src={book.imageUrl}
            alt={book.title}
            width={400}
            height={600}
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4">{book.title}</h1>
          <p className="text-xl text-gray-600 mb-4">by {book.author}</p>
          <p className="text-2xl font-bold mb-4">${book.price.toFixed(2)}</p>
          <p className="mb-4">{book.description}</p>
          <div className="mb-4">
            <strong>Condition:</strong> {book.condition}
          </div>
          <div className="mb-4">
            <strong>Seller:</strong> {book.seller}
          </div>
          <div className="flex space-x-4">
            <Button onClick={handleAddToCart}>Add to Cart</Button>
            <Button variant="outline" onClick={handleToggleWishlist}>
              {isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}


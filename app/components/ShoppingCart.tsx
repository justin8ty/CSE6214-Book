import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'

interface CartItem {
  id: string
  title: string
  author: string
  price: number
  quantity: number
  imageUrl: string
}

interface ShoppingCartProps {
  items: CartItem[]
}

export default function ShoppingCart({ items }: ShoppingCartProps) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4">
            {items.map((item) => (
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
                  <Button variant="outline" size="sm">-</Button>
                  <span>{item.quantity}</span>
                  <Button variant="outline" size="sm">+</Button>
                </div>
                <Button variant="ghost" size="sm">
                  <Trash2 className="h-5 w-5" />
                </Button>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Total: ${total.toFixed(2)}</h2>
            <Button size="lg">Proceed to Checkout</Button>
          </div>
        </>
      )}
    </div>
  )
}


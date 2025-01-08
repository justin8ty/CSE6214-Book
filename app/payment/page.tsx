'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'

export default function PaymentProcessingPage() {
  const [cardNumber, setCardNumber] = useState('')
  const [expiryDate, setExpiryDate] = useState('')
  const [cvv, setCvv] = useState('')
  const [name, setName] = useState('')
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically process the payment
    console.log('Processing payment:', { cardNumber, expiryDate, cvv, name })
    
    // Show a success toast
    toast({
      title: "Payment Successful",
      description: "Your order has been placed successfully.",
    })

    // Redirect to order confirmation page
    router.push('/order-confirmation')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-teal-700">Payment Processing</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="cardNumber" className="block mb-2 text-teal-700">Card Number</label>
          <Input
            type="text"
            id="cardNumber"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            required
            className="w-full"
            placeholder="1234 5678 9012 3456"
          />
        </div>
        <div className="mb-4 flex space-x-4">
          <div className="flex-1">
            <label htmlFor="expiryDate" className="block mb-2 text-teal-700">Expiry Date</label>
            <Input
              type="text"
              id="expiryDate"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              required
              className="w-full"
              placeholder="MM/YY"
            />
          </div>
          <div className="flex-1">
            <label htmlFor="cvv" className="block mb-2 text-teal-700">CVV</label>
            <Input
              type="text"
              id="cvv"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              required
              className="w-full"
              placeholder="123"
            />
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="name" className="block mb-2 text-teal-700">Name on Card</label>
          <Input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full"
            placeholder="John Doe"
          />
        </div>
        <Button type="submit" className="w-full bg-teal-500 hover:bg-teal-600">Process Payment</Button>
      </form>
    </div>
  )
}


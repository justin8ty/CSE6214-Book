'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { StarIcon } from 'lucide-react'

// Mock data for demonstration
const initialFeedback = [
  { id: '1', customer: 'John Doe', book: 'To Kill a Mockingbird', rating: 5, comment: 'Excellent condition, fast shipping!', date: '2023-06-01' },
  { id: '2', customer: 'Jane Smith', book: '1984', rating: 4, comment: 'Good book, as described. Slightly delayed shipping.', date: '2023-05-28' },
  { id: '3', customer: 'Bob Johnson', book: 'Pride and Prejudice', rating: 3, comment: 'Book was in okay condition, but not as good as expected.', date: '2023-05-25' },
]

export default function ViewFeedbackPage() {
  const [feedback, setFeedback] = useState(initialFeedback)
  const [filter, setFilter] = useState('')

  const filteredFeedback = feedback.filter(item => 
    item.customer.toLowerCase().includes(filter.toLowerCase()) ||
    item.book.toLowerCase().includes(filter.toLowerCase()) ||
    item.comment.toLowerCase().includes(filter.toLowerCase())
  )

  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <StarIcon key={i} className={`h-5 w-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`} />
    ))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-teal-700">View Customer Feedback</h1>
      <div className="mb-4 flex justify-between items-center">
        <Input
          type="text"
          placeholder="Filter feedback..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="max-w-sm"
        />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Customer</TableHead>
            <TableHead>Book</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead>Comment</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredFeedback.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.customer}</TableCell>
              <TableCell>{item.book}</TableCell>
              <TableCell>
                <div className="flex">
                  {renderStars(item.rating)}
                </div>
              </TableCell>
              <TableCell>{item.comment}</TableCell>
              <TableCell>{item.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}


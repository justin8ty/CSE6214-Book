'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'

export default function ComplaintPage() {
  const [subject, setSubject] = useState('')
  const [description, setDescription] = useState('')
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Implement complaint submission logic here
    console.log('Submitting complaint:', { subject, description })
    toast({
      title: "Success",
      description: "Your complaint has been submitted.",
    })
    setSubject('')
    setDescription('')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Submit a Complaint</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="subject" className="block mb-2">Subject</label>
          <Input
            type="text"
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block mb-2">Description</label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            required
          />
        </div>
        <Button type="submit">Submit Complaint</Button>
      </form>
    </div>
  )
}


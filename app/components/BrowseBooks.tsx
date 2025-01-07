'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import BookList from './BookList'
import { Search, SlidersHorizontal } from 'lucide-react'

// Mock data for demonstration
const mockBooks = [
  { id: '1', title: 'To Kill a Mockingbird', author: 'Harper Lee', price: 8.99, imageUrl: '/placeholder.svg?height=300&width=200' },
  { id: '2', title: '1984', author: 'George Orwell', price: 10.99, imageUrl: '/placeholder.svg?height=300&width=200' },
  { id: '3', title: 'Pride and Prejudice', author: 'Jane Austen', price: 7.99, imageUrl: '/placeholder.svg?height=300&width=200' },
  { id: '4', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', price: 9.99, imageUrl: '/placeholder.svg?height=300&width=200' },
  { id: '5', title: 'Moby Dick', author: 'Herman Melville', price: 11.99, imageUrl: '/placeholder.svg?height=300&width=200' },
  { id: '6', title: 'The Catcher in the Rye', author: 'J.D. Salinger', price: 8.99, imageUrl: '/placeholder.svg?height=300&width=200' },
]

export default function BrowseBooks() {
  const [searchTerm, setSearchTerm] = useState('')
  const [genre, setGenre] = useState('')
  const [condition, setCondition] = useState('')
  const [priceRange, setPriceRange] = useState([0, 100])
  const [showFilters, setShowFilters] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Implement search functionality here
    console.log('Searching for:', searchTerm)
  }

  const filteredBooks = mockBooks.filter(book => 
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div>
      <form onSubmit={handleSearch} className="flex items-center space-x-2 mb-6">
        <Input
          type="text"
          placeholder="Search for books..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow"
        />
        <Button type="submit">
          <Search className="h-4 w-4 mr-2" />
          Search
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
        >
          <SlidersHorizontal className="h-4 w-4 mr-2" />
          Filters
        </Button>
      </form>

      {showFilters && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label htmlFor="genre" className="block text-sm font-medium text-gray-700 mb-1">
              Genre
            </label>
            <Select onValueChange={setGenre}>
              <SelectTrigger>
                <SelectValue placeholder="Select genre" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fiction">Fiction</SelectItem>
                <SelectItem value="non-fiction">Non-Fiction</SelectItem>
                <SelectItem value="mystery">Mystery</SelectItem>
                <SelectItem value="sci-fi">Science Fiction</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label htmlFor="condition" className="block text-sm font-medium text-gray-700 mb-1">
              Condition
            </label>
            <Select onValueChange={setCondition}>
              <SelectTrigger>
                <SelectValue placeholder="Select condition" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="like-new">Like New</SelectItem>
                <SelectItem value="good">Good</SelectItem>
                <SelectItem value="fair">Fair</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label htmlFor="price-range" className="block text-sm font-medium text-gray-700 mb-1">
              Price Range: ${priceRange[0]} - ${priceRange[1]}
            </label>
            <Slider
              min={0}
              max={100}
              step={1}
              value={priceRange}
              onValueChange={setPriceRange}
            />
          </div>
        </div>
      )}

      <BookList books={filteredBooks} />
    </div>
  )
}


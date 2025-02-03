'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { db } from '@/config/firebase'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function SearchPage() {
  const searchParams = useSearchParams()
  const queryTerm = searchParams.get('q') || ''
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (queryTerm) {
      fetchBooks(queryTerm)
    }
  }, [queryTerm])

  const fetchBooks = async (searchQuery: string) => {
    setLoading(true)
    try {
      const booksRef = collection(db, 'bookDetails')
      const q = query(booksRef, where('title', '>=', searchQuery), where('title', '<=', searchQuery + '\uf8ff'))
      const querySnapshot = await getDocs(q)

      const booksData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }))

      setBooks(booksData)
    } catch (error) {
      console.error('Error fetching books:', error)
    }
    setLoading(false)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Search Results for "{queryTerm}"</h1>
      {loading ? (
        <p>Loading books...</p>
      ) : books.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {books.map(book => (
            <Card key={book.id} className="p-4">
              <CardContent>
                <img src={book.imgUrl} alt={book.title} className="w-full h-48 object-cover mb-4 rounded" />
                <h2 className="text-lg font-semibold">{book.title}</h2>
                <p className="text-gray-600">by {book.author}</p>
                <p className="text-gray-800 font-bold">${book.price}</p>
              </CardContent>
              <CardFooter>
                <Button className="w-full">View Details</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <p>No books found.</p>
      )}
    </div>
  )
}

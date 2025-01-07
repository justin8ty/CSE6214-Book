import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

interface Book {
  id: string
  title: string
  author: string
  price: number
  imageUrl: string
}

interface BookListProps {
  books: Book[]
}

export default function BookList({ books }: BookListProps) {
  if (books.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-xl text-gray-600">No books found. Try adjusting your search or filters.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {books.map((book) => (
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
              <Link href={`/book/${book.id}`}>
                <Button variant="outline">View Details</Button>
              </Link>
              <Button>Add to Cart</Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}


'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { db } from '@/config/firebase';
import { doc, getDoc } from 'firebase/firestore';

export default function BookDetailsPage({ params }: { params: { id: string } }) {
  const [book, setBook] = useState(null); // State to store the book data
  const [loading, setLoading] = useState(true); // State to handle loading
  const [isInWishlist, setIsInWishlist] = useState(false); // Wishlist state
  const { toast } = useToast();

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const bookRef = doc(db, 'bookDetails', params.id); // Get the document reference
        const bookDoc = await getDoc(bookRef); // Fetch the document
        if (bookDoc.exists()) {
          setBook(bookDoc.data()); // Set book data
        } else {
          console.error('No such book!');
        }
        setLoading(false); // Loading complete
      } catch (error) {
        console.error('Error fetching book details:', error);
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [params.id]);

  const handleAddToCart = () => {
    toast({
      title: 'Success',
      description: 'Book added to cart.',
    });
  };

  const handleToggleWishlist = () => {
    setIsInWishlist(!isInWishlist);
    toast({
      title: 'Success',
      description: isInWishlist
        ? 'Book removed from wishlist.'
        : 'Book added to wishlist.',
    });
  };

  if (loading) {
    return <p>Loading book details...</p>;
  }

  if (!book) {
    return <p>Book not found.</p>;
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
  );
}

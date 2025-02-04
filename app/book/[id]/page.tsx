'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { db } from '@/config/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

export default function BookDetailsPage({ params }: { params: { id: string } }) {
  const [book, setBook] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const bookRef = doc(db, 'bookDetails', params.id);
        const bookDoc = await getDoc(bookRef);
        if (bookDoc.exists()) {
          const bookData = { id: params.id, ...bookDoc.data() };
          setBook(bookData);

          // Check if the book is already in the wishlist
          const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
          setIsInWishlist(wishlist.some((item: any) => item.id === params.id));
        } else {
          console.error('No such book!');
        }
      } catch (error) {
        console.error('Error fetching book details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [params.id]);

  const handleToggleWishlist = () => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');

    if (isInWishlist) {
      // Remove book from wishlist
      const updatedWishlist = wishlist.filter((item: any) => item.id !== book.id);
      localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
      toast({ title: 'Removed', description: 'Book removed from wishlist.' });
    } else {
      // Add book to wishlist
      wishlist.push(book);
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
      toast({ title: 'Added', description: 'Book added to wishlist.' });
    }

    setIsInWishlist(!isInWishlist);
  };

  // Handle Add to Cart
  const handleAddToCart = async () => {
    try {
      const bookRef = doc(db, 'bookDetails', book.id);
      await updateDoc(bookRef, {
        cart: '1', // Mark as added to cart
      });
      toast({ title: 'Added to Cart', description: 'Book added to your cart.' });
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast({ title: 'Error', description: 'Failed to add book to cart.' });
    }
  };

  if (loading) return <p>Loading book details...</p>;
  if (!book) return <p>Book not found.</p>;

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
          <div className="mb-4"><strong>Seller:</strong> {book.seller}</div>
          <div className="flex space-x-4">
            <Button variant="outline" onClick={handleToggleWishlist}>
              {isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
            </Button>
            <Button onClick={handleAddToCart}>Add to Cart</Button> {/* Add to Cart Button */}
          </div>
        </div>
      </div>
    </div>
  );
}

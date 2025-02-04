'use client';

import { useEffect, useState } from 'react';
import { db } from '@/config/firebase';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import BookList from './BookList'; // Assuming this handles the grid and click functionality

export default function BrowseBooks() {
  const [books, setBooks] = useState([]); // State for Firestore data
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'bookDetails')); // Fetch Firestore data
        const booksData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBooks(booksData); // Update state with fetched data
        setLoading(false); // Loading done
      } catch (error) {
        console.error('Error fetching books:', error); // Handle errors
        setLoading(false);
      }
    };

    fetchBooks(); // Trigger fetch
  }, []);

  // 🔹 Handle Add to Cart
  const handleAddToCart = async (bookId: string) => {
    try {
      const bookRef = doc(db, 'bookDetails', bookId);
      await updateDoc(bookRef, { cart: '1' }); // Set cart field to "1"
      // Optional: Update local state to reflect change without re-fetching
      setBooks((prevBooks) =>
        prevBooks.map((book) =>
          book.id === bookId ? { ...book, cart: '1' } : book
        )
      );
    } catch (error) {
      console.error('Error adding to cart:', error); // Handle errors
    }
  };

  if (loading) {
    return <p>Loading books...</p>; // Loading message
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Browse Books</h1>
      {books.length > 0 ? (
        <BookList books={books} onAddToCart={handleAddToCart} /> // Pass handler to BookList
      ) : (
        <p>No books available.</p> // Message if no books are found
      )}
    </div>
  );
}

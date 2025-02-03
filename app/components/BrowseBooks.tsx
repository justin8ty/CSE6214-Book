'use client';

import { useEffect, useState } from 'react';
import { db } from '@/config/firebase';
import { collection, getDocs } from 'firebase/firestore';
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

  if (loading) {
    return <p>Loading books...</p>; // Loading message
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Browse Books</h1>
      {books.length > 0 ? (
        <BookList books={books} /> // Render books in grid via BookList
      ) : (
        <p>No books available.</p> // Message if no books are found
      )}
    </div>
  );
}

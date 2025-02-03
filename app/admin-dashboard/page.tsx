'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { db, auth } from '@/config/firebase';
import { collection, getDocs, updateDoc, deleteDoc, doc, getDoc } from 'firebase/firestore';

export default function AdminDashboardPage() {
  const [sellerApplications, setSellerApplications] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [feedback, setFeedback] = useState<any[]>([]);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const { toast } = useToast();

  // Fetch all necessary data
  const fetchData = async () => {
    try {
      const [usersSnapshot, productsSnapshot, feedbackSnapshot] = await Promise.all([
        getDocs(collection(db, 'users')),
        getDocs(collection(db, 'bookDetails')),
        getDocs(collection(db, 'complaints'))
      ]);

      const usersData = usersSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setUsers(usersData);

      setSellerApplications(usersData.filter(users => users.role === "seller" && users.status === "Pending"));

      setProducts(productsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      setFeedback(feedbackSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Check if user is admin
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists() && userDoc.data().role === 'admin') {
          setIsAdmin(true);
          fetchData();
        } else {
          setIsAdmin(false);
        }
      } else {
        setIsAdmin(false);
      }
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  // Approve seller application
  const handleApproveApplication = async (id: string) => {
    await updateDoc(doc(db, 'users', id), { status: 'Approved' });
    fetchData();
    toast({ title: 'Success', description: 'Seller application approved.' });
  };

  // Remove user account
  const handleRemoveUser = async (id: string) => {
    await deleteDoc(doc(db, 'users', id));
    fetchData();
    toast({ title: 'Success', description: 'User account removed.' });
  };

  // Approve product listing
  const handleApproveProduct = async (id: string) => {
    await updateDoc(doc(db, 'bookDetails', id), { status: 'Approved' });
    fetchData();
    toast({ title: 'Success', description: 'Product approved.' });
  };

  if (isAdmin === null) return <div>Loading...</div>;
  if (!isAdmin) return <div>Access Denied. You are not an admin.</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      {/* Seller Applications */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Seller Applications</h2>
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left">Email</th>
              <th className="text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sellerApplications.map((app) => (
              <tr key={app.id}>
                <td>{app.email}</td>
                <td>
                  <Button onClick={() => handleApproveApplication(app.id)}>Approve</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* User Management */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">User Management</h2>
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left">Email</th>
              <th className="text-left">Role</th>
              <th className="text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <Button variant="destructive" onClick={() => handleRemoveUser(user.id)}>Remove</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Product Verification */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Product Verification</h2>
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left">Title</th>
              <th className="text-left">Seller</th>
              <th className="text-left">Status</th>
              <th className="text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.title}</td>
                <td>{product.seller}</td>
                <td>{product.status || 'Pending'}</td>
                <td>
                  {(!product.status || product.status === 'Pending') && (
                    <Button onClick={() => handleApproveProduct(product.id)}>Approve</Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Feedback Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Feedback</h2>
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left">Subject</th>
              <th className="text-left">Description</th>
              <th className="text-left">Customer</th>
              <th className="text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {feedback.map((fb) => (
              <tr key={fb.id}>
                <td>{fb.subject}</td>
                <td>{fb.description}</td>
                <td>{fb.customer}</td>
                <td>{fb.date?.toDate().toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

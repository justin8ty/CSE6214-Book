"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { signInWithEmailAndPassword } from "firebase/auth"; // Firebase Auth function
import { auth, db } from "@/config/firebase"; // Import Firestore (update path if necessary)
import { doc, getDoc } from "firebase/firestore"; // Firestore functions

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Fetch user role from Firestore
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const { role } = userDoc.data();

        toast({
          title: "Success",
          description: `Welcome back, ${user.email}`,
        });

        // Redirect based on role
        if (role === "seller") {
          router.push("/seller-dashboard");
        } else if (role === "user") {
          router.push("/UserDashboard");
        } else if (role == "admin")
          router.push("/admin-dashboard"); // Fallback for other roles
      } else {
        throw new Error("User role not found in Firestore.");
      }
    } catch (error: any) {
      // Handle login errors
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Login</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2">Email</label>
          <Input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-2">Password</label>
          <Input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <Button type="submit" className="w-full mb-4" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </Button>
        <div className="text-center">
          <Link href="/account-recovery" className="text-blue-600 hover:underline">
            Forgot password?
          </Link>
        </div>
      </form>
    </div>
  );
}

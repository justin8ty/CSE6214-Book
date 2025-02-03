'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { db, auth } from "@/config/firebase"; // Import db and auth
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore"; // Add Firestore methods for role check

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { toast } = useToast();
  const authInstance = getAuth(); // Initialize Firebase auth

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Both email and password are required.");
      return;
    }

    try {
      // Firebase authentication
      await signInWithEmailAndPassword(authInstance, email, password);

      toast({
        title: "Login Successful",
        description: "Redirecting to your dashboard...",
      });

      // After successful login, redirect based on user role
      const user = authInstance.currentUser;
      if (user) {
        // Get user role from Firestore
        const role = await getUserRole(user.uid);
        
        if (role === "admin") {
          router.push("/admin-dashboard");
        } else {
          router.push("/UserDashboard");
        }
      }
    } catch (error: any) {
      setError(error.message || "Failed to log in.");
    }
  };

  // Function to get user role from Firestore (adjust according to your Firestore structure)
  const getUserRole = async (uid: string) => {
    try {
      const userDocRef = doc(db, "users", uid);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        const userData = userDoc.data();
        return userData?.role || "user"; // Default to "user" if no role is found
      } else {
        throw new Error("User not found");
      }
    } catch (error) {
      console.error("Error fetching user role:", error);
      return "user"; // Default fallback
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
        {error && <div className="text-red-600 text-sm mb-4">{error}</div>}
        <Button type="submit">Login</Button>
      </form>
    </div>
  );
}

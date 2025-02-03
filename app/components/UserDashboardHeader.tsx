"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ShoppingCart, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

export default function UserDashboardHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userRole, setUserRole] = useState<"buyer" | "seller" | "admin">("buyer"); // This should be managed by your auth system
  const router = useRouter();
  const { toast } = useToast();

  const handleLogout = () => {
    console.log("Logging out");
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    router.push("/login");
  };

  const navItems = ["Browse", "Books"];
  if (userRole === "seller" || userRole === "admin") {
    navItems.push("Seller");
  }
  if (userRole === "admin") {
    navItems.push("Admin");
  }

  return (
    <header className="bg-gradient-to-r from-teal-400 to-teal-500 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold tracking-tight hover:text-teal-100 transition-colors">
          ThriftBooks
        </Link>
        <nav className="hidden md:flex space-x-1">
          {navItems.map((item) => (
            <DropdownMenu key={item}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="hover:bg-teal-600 hover:text-white focus:bg-teal-600 focus:text-white transition-colors"
                >
                  {item} <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white border-teal-200 shadow-xl">
                {item === "Browse" && (
                  <>
                    <DropdownMenuItem className="hover:bg-teal-50 focus:bg-teal-50 text-teal-800">
                      <Link href="/browse">All Books</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-teal-50 focus:bg-teal-50 text-teal-800">
                      <Link href="/categories">Categories</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-teal-50 focus:bg-teal-50 text-teal-800">
                      <Link href="/new-arrivals">New Arrivals</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-teal-50 focus:bg-teal-50 text-teal-800">
                      <Link href="/bestsellers">Bestsellers</Link>
                    </DropdownMenuItem>
                  </>
                )}
                {item === "Books" && (
                  <>
                    <DropdownMenuItem className="hover:bg-teal-50 focus:bg-teal-50 text-teal-800">
                      <Link href="/search">Search Books</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-teal-50 focus:bg-teal-50 text-teal-800">
                      <Link href="/book-details">Book Details</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-teal-50 focus:bg-teal-50 text-teal-800">
                      <Link href="/reviews">Reviews</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-teal-50 focus:bg-teal-50 text-teal-800">
                      <Link href="/recommendations">Recommendations</Link>
                    </DropdownMenuItem>
                  </>
                )}
                {item === "Seller" && (
                  <>
                    <DropdownMenuItem className="hover:bg-teal-50 focus:bg-teal-50 text-teal-800">
                      <Link href="/seller-dashboard">Seller Dashboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-teal-50 focus:bg-teal-50 text-teal-800">
                      <Link href="/add-book">Add New Book</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-teal-50 focus:bg-teal-50 text-teal-800">
                      <Link href="/manage-inventory">Manage Inventory</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-teal-50 focus:bg-teal-50 text-teal-800">
                      <Link href="/seller-orders">Manage Orders</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-teal-50 focus:bg-teal-50 text-teal-800">
                      <Link href="/seller-feedback">View Feedback</Link>
                    </DropdownMenuItem>
                  </>
                )}
                {item === "Admin" && (
                  <>
                    <DropdownMenuItem className="hover:bg-teal-50 focus:bg-teal-50 text-teal-800">
                      <Link href="/admin-dashboard">Admin Dashboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-teal-50 focus:bg-teal-50 text-teal-800">
                      <Link href="/manage-users">Manage Users</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-teal-50 focus:bg-teal-50 text-teal-800">
                      <Link href="/approve-sellers">Approve Sellers</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-teal-50 focus:bg-teal-50 text-teal-800">
                      <Link href="/verify-products">Verify Products</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="hover:bg-teal-50 focus:bg-teal-50 text-teal-800">
                      <Link href="/admin-feedback">Manage Feedback</Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          ))}
        </nav>
        <div className="flex items-center space-x-4">
          <Link href="/cart" className="hover:text-teal-200 transition-colors">
            <ShoppingCart className="h-6 w-6" />
          </Link>
          <button
            className="md:hidden text-white hover:text-teal-200 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-teal-500">
          <nav className="flex flex-col items-center py-4">
            {navItems.map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase()}`}
                className="py-2 px-4 w-full text-center hover:bg-teal-600 transition-colors"
              >
                {item}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

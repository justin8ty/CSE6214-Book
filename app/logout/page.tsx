'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/ui/use-toast'

export default function LogoutPage() {
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    // Here you would typically clear the user's session
    console.log('Logging out user')
    
    // Show a toast notification
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    })

    // Redirect to home page after a short delay
    const timer = setTimeout(() => {
      router.push('/')
    }, 2000)

    return () => clearTimeout(timer)
  }, [router, toast])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-teal-700">Logging Out</h1>
      <p className="text-teal-600">Please wait while we log you out...</p>
    </div>
  )
}


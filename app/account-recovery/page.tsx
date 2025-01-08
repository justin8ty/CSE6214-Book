'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'

export default function AccountRecoveryPage() {
  const [email, setEmail] = useState('')
  const [step, setStep] = useState<'email' | 'code' | 'newPassword'>('email')
  const [recoveryCode, setRecoveryCode] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const { toast } = useToast()

  const handleSubmitEmail = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send a recovery email
    console.log('Recovery email sent to:', email)
    toast({
      title: "Recovery Email Sent",
      description: "Please check your email for the recovery code.",
    })
    setStep('code')
  }

  const handleSubmitCode = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically verify the recovery code
    console.log('Verifying recovery code:', recoveryCode)
    toast({
      title: "Code Verified",
      description: "Please enter your new password.",
    })
    setStep('newPassword')
  }

  const handleSubmitNewPassword = (e: React.FormEvent) => {
    e.preventDefault()
    if (newPassword !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match.",
        variant: "destructive",
      })
      return
    }
    // Here you would typically update the password
    console.log('Updating password')
    toast({
      title: "Password Updated",
      description: "Your password has been successfully updated.",
    })
    // Redirect to login page or home page
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-teal-700">Account Recovery</h1>
      {step === 'email' && (
        <form onSubmit={handleSubmitEmail} className="max-w-md mx-auto">
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2 text-teal-700">Email</label>
            <Input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full"
            />
          </div>
          <Button type="submit" className="w-full bg-teal-500 hover:bg-teal-600">Send Recovery Email</Button>
        </form>
      )}
      {step === 'code' && (
        <form onSubmit={handleSubmitCode} className="max-w-md mx-auto">
          <div className="mb-4">
            <label htmlFor="code" className="block mb-2 text-teal-700">Recovery Code</label>
            <Input
              type="text"
              id="code"
              value={recoveryCode}
              onChange={(e) => setRecoveryCode(e.target.value)}
              required
              className="w-full"
            />
          </div>
          <Button type="submit" className="w-full bg-teal-500 hover:bg-teal-600">Verify Code</Button>
        </form>
      )}
      {step === 'newPassword' && (
        <form onSubmit={handleSubmitNewPassword} className="max-w-md mx-auto">
          <div className="mb-4">
            <label htmlFor="newPassword" className="block mb-2 text-teal-700">New Password</label>
            <Input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block mb-2 text-teal-700">Confirm New Password</label>
            <Input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full"
            />
          </div>
          <Button type="submit" className="w-full bg-teal-500 hover:bg-teal-600">Update Password</Button>
        </form>
      )}
    </div>
  )
}


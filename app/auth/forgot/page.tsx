"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mail, ArrowLeft, Leaf } from "lucide-react"
import Link from "next/link"

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-herbal-gradient">
              <Leaf className="h-6 w-6 text-white" />
            </div>
            <CardTitle className="text-2xl">Reset your password</CardTitle>
            <CardDescription>Enter your email and we'll send you a reset link</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input id="email" type="email" placeholder="Enter your email" className="pl-10" />
              </div>
            </div>

            <Button className="w-full bg-herbal-gradient hover:opacity-90">Send Reset Link</Button>

            <div className="text-center">
              <Link
                href="/auth/login"
                className="inline-flex items-center gap-2 text-sm text-herbal-green hover:underline"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right Panel - Gradient */}
      <div className="hidden lg:flex lg:flex-1 bg-herbal-gradient text-white p-12 items-center justify-center">
        <div className="max-w-md text-center space-y-6">
          <div>
            <h2 className="text-3xl font-bold mb-4">Secure Recovery</h2>
            <p className="text-lg opacity-90">We'll help you regain access to your account quickly and securely.</p>
          </div>
          <div className="space-y-4 text-left">
            <div className="flex items-start gap-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 flex-shrink-0 mt-1">
                <span className="text-sm font-bold">1</span>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Check your email</h3>
                <p className="text-sm opacity-80">We'll send a secure reset link to your registered email</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 flex-shrink-0 mt-1">
                <span className="text-sm font-bold">2</span>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Click the link</h3>
                <p className="text-sm opacity-80">Follow the secure link to create a new password</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 flex-shrink-0 mt-1">
                <span className="text-sm font-bold">3</span>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Access restored</h3>
                <p className="text-sm opacity-80">Sign in with your new password and continue managing treatments</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

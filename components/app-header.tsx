"use client"

import type React from "react"

import { useState } from "react"
import { Search, Bell, Palette, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { useRouter } from "next/navigation"

export function AppHeader() {
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const router = useRouter()

  const handleQuickActions = async () => {
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setLoading(false)
    router.push("/scheduler")
  }

  const handleNotifications = async () => {
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 500))
    setLoading(false)
    router.push("/notifications")
  }

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchTerm.trim()) return
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setLoading(false)
    console.log(`Searching for: ${searchTerm}`)
  }

  const handleProfileAction = async (action: string) => {
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 800))
    setLoading(false)
    switch (action) {
      case "profile":
        router.push("/settings")
        break
      case "settings":
        router.push("/settings")
        break
      case "support":
        console.log("Opening support...")
        break
      case "logout":
        router.push("/auth/login")
        break
    }
  }

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <SidebarTrigger className="-ml-1" />
      <div className="flex flex-1 justify-between items-center gap-2 px-3">
        <form onSubmit={handleSearch} className="relative flex-1 max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search patients, sessions, protocols..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            disabled={loading}
          />
        </form>
        <div className="flex items-center gap-2">
          <Button className="cursor-pointer hidden w-40 md:flex items-center" variant="outline" size="sm" onClick={handleQuickActions} disabled={loading}>
            {loading ? <LoadingSpinner className="h-3 w-3 mr-2" /> : <Zap className="h-3 w-3 mr-2" />}
            Quick Actions
          </Button>
          {/* <Button variant="ghost" size="icon" className="relative cursor-pointer">
            <Palette className="h-4 w-4" />
            <span className="sr-only">Theme picker</span>
          </Button> */}
          <ThemeToggle />
          <Button variant="ghost" size="icon" className="relative cursor-pointer" onClick={handleNotifications} disabled={loading}>
            {loading ? <LoadingSpinner className="h-3 w-3" /> : <Bell className="h-4 w-4" />}
            <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs bg-herbal-green">3</Badge>
            <span className="sr-only">Notifications</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full cursor-pointer">
                <Avatar className="h-8 w-8">
                  {/* <AvatarImage src="/placeholder.svg?height=32&width=32" alt="@practitioner" /> */}
                  <AvatarFallback>DR</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">Dr. Rajesh Kumar</p>
                  <p className="text-xs leading-none text-muted-foreground">rajesh@panchakarma.com</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer" onClick={() => handleProfileAction("profile")} disabled={loading}>
                {loading ? <LoadingSpinner className="h-3 w-3 mr-2" /> : null}
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer" onClick={() => handleProfileAction("settings")} disabled={loading}>
                {loading ? <LoadingSpinner className="h-3 w-3 mr-2" /> : null}
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer" onClick={() => handleProfileAction("support")} disabled={loading}>
                {loading ? <LoadingSpinner className="h-3 w-3 mr-2" /> : null}
                Support
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => handleProfileAction("logout")}
                disabled={loading}
                className="text-red-600 cursor-pointer"
              >
                {loading ? <LoadingSpinner className="h-3 w-3 mr-2" /> : null}
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header> 
  )
}

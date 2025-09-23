"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import {
  Bell,
  Calendar,
  User,
  AlertTriangle,
  CheckCircle,
  Clock,
  Search,
  Filter,
  MoreVertical,
  Trash2,
  Eye,
} from "lucide-react"
import { motion } from "framer-motion"

export default function NotificationsPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const notifications = [
    {
      id: 1,
      type: "appointment",
      title: "Upcoming Appointment",
      message: "Priya Sharma has an Abhyanga session scheduled in 30 minutes",
      time: "2 minutes ago",
      read: false,
      priority: "high",
      icon: Calendar,
      color: "text-blue-500",
    },
    {
      id: 2,
      type: "alert",
      title: "Treatment Delay",
      message: "Rajesh Kumar's Shirodhara session is running 15 minutes behind schedule",
      time: "5 minutes ago",
      read: false,
      priority: "medium",
      icon: AlertTriangle,
      color: "text-yellow-500",
    },
    {
      id: 3,
      type: "completion",
      title: "Session Completed",
      message: "Sunita Devi's Virechana treatment has been completed successfully",
      time: "10 minutes ago",
      read: true,
      priority: "low",
      icon: CheckCircle,
      color: "text-green-500",
    },
    {
      id: 4,
      type: "reminder",
      title: "Follow-up Required",
      message: "Amit Verma needs a follow-up consultation after completing Basti protocol",
      time: "1 hour ago",
      read: false,
      priority: "medium",
      icon: User,
      color: "text-purple-500",
    },
    {
      id: 5,
      type: "system",
      title: "System Maintenance",
      message: "Scheduled maintenance will occur tonight from 2:00 AM to 4:00 AM",
      time: "2 hours ago",
      read: true,
      priority: "low",
      icon: Clock,
      color: "text-gray-500",
    },
  ]

  const handleMarkAsRead = (notificationId: number) => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      // Simulate marking as read
    }, 1000)
  }

  const handleDeleteNotification = (notificationId: number) => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      // Simulate deletion
    }, 1000)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500"
      case "medium":
        return "bg-yellow-500"
      case "low":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const filteredNotifications = notifications.filter(
    (notification) =>
      notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold">Notifications</h1>
            {unreadCount > 0 && <Badge className="bg-red-500 text-white">{unreadCount} unread</Badge>}
          </div>
          <p className="text-muted-foreground">Stay updated with your practice activities</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Mark All Read</Button>
          <Button variant="outline">
            <Trash2 className="mr-2 h-4 w-4" />
            Clear All
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search notifications..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filters
        </Button>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {filteredNotifications.map((notification, index) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card
              className={`hover:shadow-lg transition-shadow ${!notification.read ? "border-l-4 border-l-herbal-green" : ""}`}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-full bg-muted`}>
                    <notification.icon className={`h-5 w-5 ${notification.color}`} />
                  </div>

                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3
                            className={`font-semibold ${!notification.read ? "text-foreground" : "text-muted-foreground"}`}
                          >
                            {notification.title}
                          </h3>
                          <div className={`h-2 w-2 rounded-full ${getPriorityColor(notification.priority)}`} />
                          {!notification.read && <div className="h-2 w-2 rounded-full bg-herbal-green" />}
                        </div>
                        <p className="text-sm text-muted-foreground">{notification.message}</p>
                        <p className="text-xs text-muted-foreground">{notification.time}</p>
                      </div>

                      <div className="flex items-center gap-2">
                        {!notification.read && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleMarkAsRead(notification.id)}
                            disabled={isLoading}
                          >
                            {isLoading ? <LoadingSpinner size="sm" /> : <Eye className="h-4 w-4" />}
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteNotification(notification.id)}
                          disabled={isLoading}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredNotifications.length === 0 && (
        <div className="text-center py-12">
          <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No notifications found matching your search.</p>
        </div>
      )}
    </div>
  )
}

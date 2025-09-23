"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Bell, AlertTriangle, CheckCircle, Clock, RefreshCw, X } from "lucide-react"

interface Notification {
  id: string
  type: "alert" | "reminder" | "success" | "info"
  title: string
  message: string
  timestamp: string
  status: "sent" | "failed" | "pending"
  retries?: number
  patient?: string
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "alert",
    title: "High Pain Level Reported",
    message: "Priya Sharma reported pain level 8/10 after Abhyanga session",
    timestamp: "2 min ago",
    status: "sent",
    patient: "Priya Sharma",
  },
  {
    id: "2",
    type: "reminder",
    title: "Pre-treatment Reminder",
    message: "Raj Patel - Shirodhara session in 30 minutes",
    timestamp: "5 min ago",
    status: "failed",
    retries: 2,
    patient: "Raj Patel",
  },
  {
    id: "3",
    type: "success",
    title: "Session Completed",
    message: "Sunita Devi completed Basti treatment successfully",
    timestamp: "15 min ago",
    status: "sent",
    patient: "Sunita Devi",
  },
  {
    id: "4",
    type: "info",
    title: "Feedback Received",
    message: "New patient feedback from morning sessions",
    timestamp: "1 hour ago",
    status: "sent",
  },
  {
    id: "5",
    type: "alert",
    title: "Room Conflict",
    message: "Double booking detected for Room 2 at 2:00 PM",
    timestamp: "2 hours ago",
    status: "pending",
  },
]

export function NotificationsFeed() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)

  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "alert":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "reminder":
        return <Clock className="h-4 w-4 text-blue-500" />
      default:
        return <Bell className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusBadge = (status: Notification["status"], retries?: number) => {
    switch (status) {
      case "sent":
        return (
          <Badge variant="outline" className="text-green-600 border-green-200">
            Delivered
          </Badge>
        )
      case "failed":
        return (
          <Badge variant="destructive" className="gap-1">
            Failed {retries && `(${retries})`}
          </Badge>
        )
      case "pending":
        return <Badge variant="secondary">Pending</Badge>
      default:
        return null
    }
  }

  const retryNotification = (id: string) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, status: "pending" as const, retries: (notif.retries || 0) + 1 } : notif,
      ),
    )
  }

  const dismissNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id))
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications Feed
            </CardTitle>
            <CardDescription>Recent alerts and updates</CardDescription>
          </div>
          <Badge variant="secondary">{notifications.filter((n) => n.status === "failed").length} failed</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-80">
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className="group relative flex items-start gap-3 rounded-lg border p-3 transition-colors hover:bg-muted/50"
              >
                <div className="mt-0.5">{getNotificationIcon(notification.type)}</div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{notification.title}</p>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(notification.status, notification.retries)}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100"
                        onClick={() => dismissNotification(notification.id)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">{notification.message}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{notification.timestamp}</span>
                    {notification.status === "failed" && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 text-xs"
                        onClick={() => retryNotification(notification.id)}
                      >
                        <RefreshCw className="mr-1 h-3 w-3" />
                        Retry
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

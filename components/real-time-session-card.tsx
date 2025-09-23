"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Clock, Play, Pause, MoreHorizontal, MapPin, User } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Session {
  id: string
  patient: string
  therapy: string
  status: "Scheduled" | "In Progress" | "Completed" | "Paused"
  startTime: string
  duration: number
  elapsed: number
  therapist: string
  room: string
  checklist: { item: string; completed: boolean }[]
  avatar?: string
}

const mockSessions: Session[] = [
  {
    id: "1",
    patient: "Priya Sharma",
    therapy: "Abhyanga",
    status: "In Progress",
    startTime: "10:30 AM",
    duration: 60,
    elapsed: 45,
    therapist: "Dr. Meera",
    room: "Room 3",
    checklist: [
      { item: "Pre-treatment consultation", completed: true },
      { item: "Oil preparation", completed: true },
      { item: "Massage therapy", completed: false },
      { item: "Post-treatment rest", completed: false },
    ],
  },
  {
    id: "2",
    patient: "Raj Patel",
    therapy: "Shirodhara",
    status: "In Progress",
    startTime: "11:00 AM",
    duration: 45,
    elapsed: 15,
    therapist: "Dr. Anand",
    room: "Room 1",
    checklist: [
      { item: "Patient preparation", completed: true },
      { item: "Oil warming", completed: true },
      { item: "Shirodhara treatment", completed: false },
      { item: "Cleanup", completed: false },
    ],
  },
  {
    id: "3",
    patient: "Sunita Devi",
    therapy: "Basti",
    status: "Completed",
    startTime: "9:00 AM",
    duration: 60,
    elapsed: 60,
    therapist: "Dr. Kavya",
    room: "Room 2",
    checklist: [
      { item: "Pre-treatment preparation", completed: true },
      { item: "Basti administration", completed: true },
      { item: "Observation period", completed: true },
      { item: "Post-treatment care", completed: true },
    ],
  },
]

export function RealTimeSessionCard() {
  const [sessions, setSessions] = useState<Session[]>(mockSessions)
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
      // Simulate real-time updates
      setSessions((prev) =>
        prev.map((session) => {
          if (session.status === "In Progress") {
            return {
              ...session,
              elapsed: Math.min(session.elapsed + 1, session.duration),
            }
          }
          return session
        }),
      )
    }, 60000) // Update every minute

    return () => clearInterval(timer)
  }, [])

  const getStatusColor = (status: Session["status"]) => {
    switch (status) {
      case "Completed":
        return "default"
      case "In Progress":
        return "secondary"
      case "Paused":
        return "outline"
      default:
        return "outline"
    }
  }

  const getStatusIcon = (status: Session["status"]) => {
    switch (status) {
      case "Completed":
        return <CheckCircle className="mr-1 h-3 w-3" />
      case "In Progress":
        return <Play className="mr-1 h-3 w-3" />
      case "Paused":
        return <Pause className="mr-1 h-3 w-3" />
      default:
        return <Clock className="mr-1 h-3 w-3" />
    }
  }

  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              Real-Time Therapy Tracking
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            </CardTitle>
            <CardDescription>Live session status and progress</CardDescription>
          </div>
          <Button variant="outline" size="sm">
            View All Sessions
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {sessions.map((session) => (
          <div
            key={session.id}
            className="group relative overflow-auto rounded-lg border p-4 transition-all hover:shadow-md hover:border-primary/20 custom-scrollbar"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={session.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="bg-herbal-gradient text-white">
                    {session.patient
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{session.patient}</p>
                    <Badge variant="outline" className="text-xs">
                      {session.therapy}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {session.therapist}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {session.room}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {session.startTime}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <Badge variant={getStatusColor(session.status)} className="mb-2">
                    {getStatusIcon(session.status)}
                    {session.status}
                  </Badge>
                  <div className="space-y-1">
                    <div className="text-sm font-medium">
                      {session.elapsed}min / {session.duration}min
                    </div>
                    <Progress value={(session.elapsed / session.duration) * 100} className="w-24" />
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="p-2">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View Details</DropdownMenuItem>
                    <DropdownMenuItem>Update Status</DropdownMenuItem>
                    <DropdownMenuItem>Add Notes</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Checklist Progress */}
            <div className="mt-4 pt-4 border-t">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Treatment Checklist</span>
                <span className="text-xs text-muted-foreground">
                  {session.checklist.filter((item) => item.completed).length}/{session.checklist.length} completed
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {session.checklist.map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs">
                    <div className={`h-2 w-2 rounded-full ${item.completed ? "bg-green-500" : "bg-gray-300"}`} />
                    <span className={item.completed ? "text-muted-foreground line-through" : ""}>{item.item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

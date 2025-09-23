"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import {
  Calendar,
  Clock,
  User,
  MapPin,
  Activity,
  Plus,
  Search,
  Filter,
  Play,
  Pause,
  CheckCircle,
  AlertCircle,
} from "lucide-react"
import { motion } from "framer-motion"

export default function SessionsPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const sessions = [
    {
      id: 1,
      patientName: "Priya Sharma",
      treatmentType: "Abhyanga",
      therapist: "Dr. Meera Patel",
      date: "2024-01-15",
      time: "10:00 AM - 11:30 AM",
      duration: "90 minutes",
      room: "Room A1",
      status: "In Progress",
      progress: 65,
      notes: "Patient responding well to treatment",
    },
    {
      id: 2,
      patientName: "Rajesh Kumar",
      treatmentType: "Shirodhara",
      therapist: "Dr. Anjali Singh",
      date: "2024-01-15",
      time: "2:00 PM - 3:00 PM",
      duration: "60 minutes",
      room: "Room B2",
      status: "Scheduled",
      progress: 0,
      notes: "First session of Panchakarma protocol",
    },
    {
      id: 3,
      patientName: "Sunita Devi",
      treatmentType: "Virechana",
      therapist: "Dr. Ravi Gupta",
      date: "2024-01-15",
      time: "9:00 AM - 10:00 AM",
      duration: "60 minutes",
      room: "Room C3",
      status: "Completed",
      progress: 100,
      notes: "Session completed successfully",
    },
    {
      id: 4,
      patientName: "Amit Verma",
      treatmentType: "Basti",
      therapist: "Dr. Kavita Sharma",
      date: "2024-01-15",
      time: "3:30 PM - 4:30 PM",
      duration: "60 minutes",
      room: "Room A2",
      status: "Delayed",
      progress: 0,
      notes: "Patient running 15 minutes late",
    },
  ]

  const handleStartSession = (sessionId: number) => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      // Simulate starting session
    }, 1500)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Progress":
        return "bg-blue-500"
      case "Completed":
        return "bg-green-500"
      case "Scheduled":
        return "bg-gray-500"
      case "Delayed":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "In Progress":
        return <Play className="h-3 w-3" />
      case "Completed":
        return <CheckCircle className="h-3 w-3" />
      case "Scheduled":
        return <Clock className="h-3 w-3" />
      case "Delayed":
        return <AlertCircle className="h-3 w-3" />
      default:
        return <Clock className="h-3 w-3" />
    }
  }

  const filteredSessions = sessions.filter(
    (session) =>
      session.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.treatmentType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.therapist.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Treatment Sessions</h1>
          <p className="text-muted-foreground">Monitor and manage ongoing treatment sessions</p>
        </div>
        <Button className="bg-herbal-gradient hover:opacity-90 text-white">
          <Plus className="mr-2 h-4 w-4" />
          Schedule Session
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search sessions by patient, treatment, or therapist..."
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

      {/* Sessions Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredSessions.map((session, index) => (
          <motion.div
            key={session.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="h-full hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{session.patientName}</CardTitle>
                    <CardDescription>{session.treatmentType}</CardDescription>
                  </div>
                  <Badge className={`${getStatusColor(session.status)} text-white`}>
                    <div className="flex items-center gap-1">
                      {getStatusIcon(session.status)}
                      {session.status}
                    </div>
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{session.therapist}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{session.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{session.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{session.room}</span>
                  </div>
                </div>

                {session.status === "In Progress" && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{session.progress}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-herbal-gradient h-2 rounded-full transition-all duration-300"
                        style={{ width: `${session.progress}%` }}
                      />
                    </div>
                  </div>
                )}

                <div className="p-3 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground">{session.notes}</p>
                </div>

                <div className="flex gap-2">
                  {session.status === "Scheduled" && (
                    <Button
                      size="sm"
                      className="flex-1 bg-herbal-gradient hover:opacity-90 text-white"
                      onClick={() => handleStartSession(session.id)}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <LoadingSpinner size="sm" className="mr-2" />
                          Starting...
                        </>
                      ) : (
                        <>
                          <Play className="mr-2 h-3 w-3" />
                          Start
                        </>
                      )}
                    </Button>
                  )}
                  {session.status === "In Progress" && (
                    <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                      <Pause className="mr-2 h-3 w-3" />
                      Pause
                    </Button>
                  )}
                  <Button size="sm" variant="outline">
                    <Activity className="mr-2 h-3 w-3" />
                    Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredSessions.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No sessions found matching your search.</p>
        </div>
      )}
    </div>
  )
}

"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Plus,
  Clock,
} from "lucide-react"

interface DayData {
  date: number
  sessions: number
  capacity: number
  status: "low" | "medium" | "high" | "full"
  isToday?: boolean
}

const mockWeekData: DayData[] = [
  { date: 15, sessions: 8, capacity: 10, status: "high", isToday: true },
  { date: 16, sessions: 6, capacity: 10, status: "medium" },
  { date: 17, sessions: 9, capacity: 10, status: "high" },
  { date: 18, sessions: 4, capacity: 10, status: "low" },
  { date: 19, sessions: 7, capacity: 10, status: "medium" },
  { date: 20, sessions: 10, capacity: 10, status: "full" },
  { date: 21, sessions: 5, capacity: 10, status: "medium" },
]

const upcomingSessions = [
  {
    time: "10:30 AM",
    patient: "Priya Sharma",
    therapy: "Abhyanga",
    room: "Room 3",
  },
  {
    time: "11:00 AM",
    patient: "Raj Patel",
    therapy: "Shirodhara",
    room: "Room 1",
  },
  {
    time: "2:00 PM",
    patient: "Amit Kumar",
    therapy: "Basti",
    room: "Room 2",
  },
  {
    time: "3:30 PM",
    patient: "Kavya Singh",
    therapy: "Nasya",
    room: "Room 4",
  },
]

export function EnhancedCalendarWidget() {
  const [isAddingSession, setIsAddingSession] = useState(false)
  const router = useRouter()

  const getStatusColor = (status: DayData["status"]) => {
    switch (status) {
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "full":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getUtilizationPercentage = (sessions: number, capacity: number) =>
    (sessions / capacity) * 100

  const handleAddSession = async () => {
    setIsAddingSession(true)
    await new Promise((resolve) => setTimeout(resolve, 500))
    router.push("/scheduler")
    setIsAddingSession(false)
  }

  return (
    <div className="space-y-6">
      {/* Weekly Capacity Card */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                This Week
              </CardTitle>
              <CardDescription>
                Session capacity and utilization
              </CardDescription>
            </div>
            {/* <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div> */}
          </div>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          {/* Week Days Header */}
          <div>
            <div className="inline-grid grid-flow-col auto-cols-[minmax(80px,1fr)] sm:grid-cols-7 sm:auto-cols-auto gap-1 sm:gap-2 min-w-max sm:min-w-0">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                <div
                  key={day}
                  className="text-center text-xs font-medium text-muted-foreground p-1 sm:p-2"
                >
                  {day}
                </div>
              ))}
            </div>
          </div>

          {/* Week Data */}
          <div>
            <div className="inline-grid grid-flow-col auto-cols-[minmax(80px,1fr)] sm:grid-cols-7 sm:auto-cols-auto gap-1 sm:gap-2 min-w-max sm:min-w-0">
              {mockWeekData.map((day, i) => (
                <div
                  key={i}
                  className={`relative mt-2 p-2 sm:p-3 rounded-lg border-2 transition-all hover:shadow-sm cursor-pointer ${
                    day.isToday ? "border-primary bg-primary/5" : "border-border"
                  }`}
                >
                  <div className="text-center space-y-2">
                    <div
                      className={`text-xs sm:text-sm font-medium ${
                        day.isToday ? "text-primary" : ""
                      }`}
                    >
                      {day.date}
                    </div>
                    <div className="space-y-1">
                      <div className="text-xs text-muted-foreground">
                        {day.sessions}/{day.capacity}
                      </div>
                      <Progress
                        value={getUtilizationPercentage(
                          day.sessions,
                          day.capacity
                        )}
                        className="h-1"
                      />
                      <Badge
                        variant="outline"
                        className={`text-xs px-2 py-0.5 ${getStatusColor(
                          day.status
                        )}`}
                      >
                        {day.status}
                      </Badge>
                    </div>
                  </div>
                  {day.isToday && (
                    <div className="absolute -top-1 -right-1 h-2 w-2 sm:h-3 sm:w-3 rounded-full bg-primary animate-pulse" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Today's Schedule */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Today's Schedule
              </CardTitle>
              <CardDescription>Upcoming sessions</CardDescription>
            </div>
            <Button
              size="sm"
              className="bg-herbal-gradient hover:opacity-90 w-full sm:w-auto"
              onClick={handleAddSession}
              disabled={isAddingSession}
            >
              {isAddingSession ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Adding...
                </>
              ) : (
                <>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Session
                </>
              )}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {upcomingSessions.map((session, i) => (
              <div
                key={i}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 p-3 rounded-lg border hover:bg-muted/50 transition-colors"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 w-full sm:w-auto">
                  <div className="text-sm font-medium text-primary">
                    {session.time}
                  </div>
                  <div className="hidden sm:block h-4 w-px bg-border" />
                  <div>
                    <div className="text-sm font-medium">
                      {session.patient}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {session.therapy}
                    </div>
                  </div>
                </div>
                <Badge
                  variant="outline"
                  className="self-start sm:self-center"
                >
                  {session.room}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

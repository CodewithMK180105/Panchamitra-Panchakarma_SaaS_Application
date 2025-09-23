"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, AlertTriangle } from "lucide-react"
import type { Session } from "@/app/(app)/scheduler/page"

interface CalendarViewProps {
  sessions: Session[]
  onSessionSelect: (session: Session) => void
  selectedSession: Session | null
}

export function CalendarView({ sessions, onSessionSelect, selectedSession }: CalendarViewProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [viewMode, setViewMode] = useState<"week" | "day">("week")

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getWeekDays = (date: Date) => {
    const week = []
    const startOfWeek = new Date(date)
    startOfWeek.setDate(date.getDate() - date.getDay() + 1) // Start from Monday

    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek)
      day.setDate(startOfWeek.getDate() + i)
      week.push(day)
    }
    return week
  }

  const getSessionsForDate = (date: Date) => {
    const dateStr = date.toISOString().split("T")[0]
    return sessions.filter((session) => session.date === dateStr)
  }

  const timeSlots = Array.from({ length: 12 }, (_, i) => {
    const hour = i + 8 // Start from 8 AM
    return `${hour.toString().padStart(2, "0")}:00`
  })

  const navigateWeek = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate)
    newDate.setDate(currentDate.getDate() + (direction === "next" ? 7 : -7))
    setCurrentDate(newDate)
  }

  const navigateDay = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate)
    newDate.setDate(currentDate.getDate() + (direction === "next" ? 1 : -1))
    setCurrentDate(newDate)
  }

  if (viewMode === "day") {
    const daySession = getSessionsForDate(currentDate)

    return (
      <div className="space-y-4">
        {/* Day View Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={() => navigateDay("prev")}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <h3 className="text-lg font-semibold">{formatDate(currentDate)}</h3>
              <Button variant="ghost" size="sm" onClick={() => navigateDay("next")}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setViewMode("week")}>
              Week View
            </Button>
          </div>
        </div>

        {/* Day Schedule */}
        <div className="space-y-2">
          {timeSlots.map((time) => {
            const sessionsAtTime = daySession.filter((session) => session.startTime === time)

            return (
              <div key={time} className="flex items-center gap-4 min-h-16 border-b border-border/50">
                <div className="w-16 text-sm text-muted-foreground font-medium">{time}</div>
                <div className="flex-1 space-y-2">
                  {sessionsAtTime.map((session) => (
                    <div
                      key={session.id}
                      className={`p-3 rounded-lg border-l-4 cursor-pointer transition-all hover:shadow-sm ${
                        session.color || "bg-gray-100 border-gray-300"
                      } ${selectedSession?.id === session.id ? "ring-2 ring-primary" : ""}`}
                      onClick={() => onSessionSelect(session)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-sm">{session.patient}</div>
                          <div className="text-xs text-muted-foreground">{session.therapy}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          {session.conflicts && session.conflicts.length > 0 && (
                            <AlertTriangle className="h-4 w-4 text-red-500" />
                          )}
                          <Badge variant="outline" className="text-xs">
                            {session.room}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  // Week View
  const weekDays = getWeekDays(currentDate)

  return (
    <div className="space-y-4">
      {/* Week View Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => navigateWeek("prev")}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h3 className="text-lg font-semibold">
              {weekDays[0].toLocaleDateString("en-US", { month: "long", year: "numeric" })}
            </h3>
            <Button variant="ghost" size="sm" onClick={() => navigateWeek("next")}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setViewMode("day")}>
            Day View
          </Button>
        </div>
      </div>

      {/* Week Calendar Grid */}
      <div className="border rounded-lg overflow-hidden">
        {/* Header Row */}
        <div className="grid grid-cols-8 border-b bg-muted/50">
          <div className="p-3 text-sm font-medium">Time</div>
          {weekDays.map((day, i) => (
            <div key={i} className="p-3 text-center border-l">
              <div className="text-sm font-medium">{day.toLocaleDateString("en-US", { weekday: "short" })}</div>
              <div className="text-xs text-muted-foreground">{day.getDate()}</div>
            </div>
          ))}
        </div>

        {/* Time Slots */}
        {timeSlots.map((time) => (
          <div key={time} className="grid grid-cols-8 border-b min-h-20">
            <div className="p-3 text-sm text-muted-foreground font-medium border-r bg-muted/20">{time}</div>
            {weekDays.map((day, dayIndex) => {
              const daySessions = getSessionsForDate(day).filter((session) => session.startTime === time)

              return (
                <div key={dayIndex} className="p-2 border-l min-h-20 space-y-1">
                  {daySessions.map((session) => (
                    <div
                      key={session.id}
                      className={`p-2 rounded text-xs cursor-pointer transition-all hover:shadow-sm ${
                        session.color || "bg-gray-100 border-gray-300"
                      } ${selectedSession?.id === session.id ? "ring-1 ring-primary" : ""}`}
                      onClick={() => onSessionSelect(session)}
                    >
                      <div className="font-medium truncate">{session.patient}</div>
                      <div className="text-xs opacity-75 truncate">{session.therapy}</div>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs">{session.room}</span>
                        {session.conflicts && session.conflicts.length > 0 && (
                          <AlertTriangle className="h-3 w-3 text-red-500" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}

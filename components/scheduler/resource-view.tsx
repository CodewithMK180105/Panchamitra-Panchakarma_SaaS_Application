"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, User, MapPin } from "lucide-react"
import type { Session } from "@/app/(app)/scheduler/page"

interface ResourceViewProps {
  sessions: Session[]
  onSessionSelect: (session: Session) => void
  selectedSession: Session | null
}

const therapists = [
  { id: "1", name: "Dr. Meera", specialties: ["Abhyanga", "Shirodhara"], availability: "Full-time" },
  { id: "2", name: "Dr. Anand", specialties: ["Shirodhara", "Nasya"], availability: "Part-time" },
  { id: "3", name: "Dr. Kavya", specialties: ["Basti", "Virechana"], availability: "Full-time" },
  { id: "4", name: "Dr. Priya", specialties: ["Nasya", "Abhyanga"], availability: "Full-time" },
]

const rooms = [
  { id: "1", name: "Room 1", type: "General Treatment", capacity: 1 },
  { id: "2", name: "Room 2", type: "Basti Specialized", capacity: 1 },
  { id: "3", name: "Room 3", type: "Massage Therapy", capacity: 1 },
  { id: "4", name: "Room 4", type: "Consultation", capacity: 2 },
]

export function ResourceView({ sessions, onSessionSelect, selectedSession }: ResourceViewProps) {
  const getSessionsForTherapist = (therapistName: string) => {
    return sessions.filter((session) => session.therapist === therapistName)
  }

  const getSessionsForRoom = (roomName: string) => {
    return sessions.filter((session) => session.room === roomName)
  }

  const getUtilizationPercentage = (sessionCount: number, maxSessions = 8) => {
    return Math.min((sessionCount / maxSessions) * 100, 100)
  }

  return (
    <div className="space-y-6">
      {/* Therapist Resources */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Therapist Schedule
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {therapists.map((therapist) => {
              const therapistSessions = getSessionsForTherapist(therapist.name)
              const utilization = getUtilizationPercentage(therapistSessions.length)

              return (
                <div key={therapist.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-medium">{therapist.name}</h4>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{therapist.availability}</span>
                        <span>•</span>
                        <span>{therapist.specialties.join(", ")}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant={utilization > 80 ? "destructive" : utilization > 60 ? "secondary" : "outline"}>
                        {utilization.toFixed(0)}% utilized
                      </Badge>
                      <div className="text-xs text-muted-foreground mt-1">
                        {therapistSessions.length} sessions today
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
                    {therapistSessions.map((session) => (
                      <div
                        key={session.id}
                        className={`p-3 rounded border cursor-pointer transition-all hover:shadow-sm ${
                          session.color || "bg-gray-50"
                        } ${selectedSession?.id === session.id ? "ring-2 ring-primary" : ""}`}
                        onClick={() => onSessionSelect(session)}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">{session.startTime}</span>
                          {session.conflicts && session.conflicts.length > 0 && (
                            <AlertTriangle className="h-4 w-4 text-red-500" />
                          )}
                        </div>
                        <div className="text-sm">{session.patient}</div>
                        <div className="text-xs text-muted-foreground">{session.therapy}</div>
                        <Badge variant="outline" className="text-xs mt-1">
                          {session.room}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Room Resources */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Room Utilization
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {rooms.map((room) => {
              const roomSessions = getSessionsForRoom(room.name)
              const utilization = getUtilizationPercentage(roomSessions.length)
              const conflicts = roomSessions.filter((session) => session.conflicts && session.conflicts.length > 0)

              return (
                <div key={room.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-medium">{room.name}</h4>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{room.type}</span>
                        <span>•</span>
                        <span>Capacity: {room.capacity}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2">
                        <Badge variant={utilization > 80 ? "destructive" : utilization > 60 ? "secondary" : "outline"}>
                          {utilization.toFixed(0)}% utilized
                        </Badge>
                        {conflicts.length > 0 && (
                          <Badge variant="destructive" className="gap-1">
                            <AlertTriangle className="h-3 w-3" />
                            {conflicts.length} conflicts
                          </Badge>
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">{roomSessions.length} sessions today</div>
                    </div>
                  </div>

                  <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
                    {roomSessions.map((session) => (
                      <div
                        key={session.id}
                        className={`p-3 rounded border cursor-pointer transition-all hover:shadow-sm ${
                          session.color || "bg-gray-50"
                        } ${selectedSession?.id === session.id ? "ring-2 ring-primary" : ""} ${
                          session.conflicts && session.conflicts.length > 0 ? "border-red-300 bg-red-50" : ""
                        }`}
                        onClick={() => onSessionSelect(session)}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium">{session.startTime}</span>
                          {session.conflicts && session.conflicts.length > 0 && (
                            <AlertTriangle className="h-4 w-4 text-red-500" />
                          )}
                        </div>
                        <div className="text-sm">{session.patient}</div>
                        <div className="text-xs text-muted-foreground">{session.therapy}</div>
                        <Badge variant="outline" className="text-xs mt-1">
                          {session.therapist}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

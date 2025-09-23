"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarView } from "@/components/scheduler/calendar-view"
import { ResourceView } from "@/components/scheduler/resource-view"
import { SessionDetailsPanel } from "@/components/scheduler/session-details-panel"
import { SchedulerToolbar } from "@/components/scheduler/scheduler-toolbar"
import { AutoGeneratePlanModal } from "@/components/scheduler/auto-generate-plan-modal"
import { Calendar, Users, Plus, Filter } from "lucide-react"

export interface Session {
  id: string
  title: string
  patient: string
  therapy: string
  therapist: string
  room: string
  startTime: string
  endTime: string
  date: string
  status: "scheduled" | "in-progress" | "completed" | "cancelled"
  protocol?: string
  day?: number
  duration: number
  color?: string
  conflicts?: string[]
}

const mockSessions: Session[] = [
  {
    id: "1",
    title: "Abhyanga Session",
    patient: "Priya Sharma",
    therapy: "Abhyanga",
    therapist: "Dr. Meera",
    room: "Room 3",
    startTime: "10:30",
    endTime: "11:30",
    date: "2024-01-15",
    status: "scheduled",
    protocol: "Virechana 7-day",
    day: 3,
    duration: 60,
    color: "bg-green-100 border-green-300 text-green-800",
  },
  {
    id: "2",
    title: "Shirodhara Session",
    patient: "Raj Patel",
    therapy: "Shirodhara",
    therapist: "Dr. Anand",
    room: "Room 1",
    startTime: "11:00",
    endTime: "11:45",
    date: "2024-01-15",
    status: "scheduled",
    protocol: "Basti 8-day",
    day: 2,
    duration: 45,
    color: "bg-blue-100 border-blue-300 text-blue-800",
  },
  {
    id: "3",
    title: "Basti Treatment",
    patient: "Sunita Devi",
    therapy: "Basti",
    therapist: "Dr. Kavya",
    room: "Room 2",
    startTime: "14:00",
    endTime: "15:00",
    date: "2024-01-15",
    status: "completed",
    protocol: "Basti 8-day",
    day: 5,
    duration: 60,
    color: "bg-purple-100 border-purple-300 text-purple-800",
  },
  {
    id: "4",
    title: "Nasya Treatment",
    patient: "Amit Kumar",
    therapy: "Nasya",
    therapist: "Dr. Priya",
    room: "Room 1",
    startTime: "11:00",
    endTime: "11:30",
    date: "2024-01-15",
    status: "scheduled",
    duration: 30,
    color: "bg-orange-100 border-orange-300 text-orange-800",
    conflicts: ["Room conflict with Shirodhara"],
  },
]

export default function SchedulerPage() {
  const [selectedSession, setSelectedSession] = useState<Session | null>(null)
  const [showAutoGenerateModal, setShowAutoGenerateModal] = useState(false)
  const [currentView, setCurrentView] = useState<"calendar" | "resource">("calendar")
  const [sessions, setSessions] = useState<Session[]>(mockSessions)

  const handleSessionSelect = (session: Session) => {
    setSelectedSession(session)
  }

  const handleSessionUpdate = (updatedSession: Session) => {
    setSessions((prev) => prev.map((s) => (s.id === updatedSession.id ? updatedSession : s)))
    setSelectedSession(updatedSession)
  }

  const handleSessionDelete = (sessionId: string) => {
    setSessions((prev) => prev.filter((s) => s.id !== sessionId))
    setSelectedSession(null)
  }

  const handleBulkAction = (action: string, sessionIds: string[]) => {
    console.log(`Bulk action: ${action} for sessions:`, sessionIds)
    // Implement bulk actions logic here
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Scheduler</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
          <Button className="bg-herbal-gradient hover:opacity-90" onClick={() => setShowAutoGenerateModal(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Auto-Generate Plan
          </Button>
        </div>
      </div>

      {/* Scheduler Toolbar */}
      <SchedulerToolbar
        selectedSessions={selectedSession ? [selectedSession] : []}
        onBulkAction={handleBulkAction}
        onAutoGenerate={() => setShowAutoGenerateModal(true)}
      />

      {/* Main Scheduler Layout */}
      <div className="grid gap-6 lg:grid-cols-4">
        {/* Calendar/Resource View */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Treatment Schedule</CardTitle>
                  <CardDescription>Manage sessions and therapy plans</CardDescription>
                </div>
                <Tabs value={currentView} onValueChange={(v) => setCurrentView(v as "calendar" | "resource")}>
                  <TabsList>
                    <TabsTrigger value="calendar" className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Calendar
                    </TabsTrigger>
                    <TabsTrigger value="resource" className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      Resources
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </CardHeader>
            <CardContent>
              {currentView === "calendar" ? (
                <CalendarView
                  sessions={sessions}
                  onSessionSelect={handleSessionSelect}
                  selectedSession={selectedSession}
                />
              ) : (
                <ResourceView
                  sessions={sessions}
                  onSessionSelect={handleSessionSelect}
                  selectedSession={selectedSession}
                />
              )}
            </CardContent>
          </Card>
        </div>

        {/* Session Details Panel */}
        <div className="lg:col-span-1">
          <SessionDetailsPanel
            session={selectedSession}
            onSessionUpdate={handleSessionUpdate}
            onSessionDelete={handleSessionDelete}
          />
        </div>
      </div>

      {/* Auto-Generate Plan Modal */}
      <AutoGeneratePlanModal
        open={showAutoGenerateModal}
        onOpenChange={setShowAutoGenerateModal}
        onPlanGenerated={(newSessions) => {
          setSessions((prev) => [...prev, ...newSessions])
          setShowAutoGenerateModal(false)
        }}
      />
    </div>
  )
}

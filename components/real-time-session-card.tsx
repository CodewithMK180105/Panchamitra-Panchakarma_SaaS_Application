"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Clock, Play, Pause, MoreHorizontal, MapPin, User } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"

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
  notes?: string
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
  const [detailsId, setDetailsId] = useState<string | null>(null)
  const [statusId, setStatusId] = useState<string | null>(null)
  const [notesId, setNotesId] = useState<string | null>(null)
  const [newStatus, setNewStatus] = useState<Session["status"]>("Scheduled")
  const [newNote, setNewNote] = useState("")

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
      setSessions((prev) =>
        prev.map((session) => {
          if (session.status === "In Progress") {
            return {
              ...session,
              elapsed: Math.min(session.elapsed + 1, session.duration),
            }
          }
          return session
        })
      )
    }, 60000)
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

  const handleStatusUpdate = () => {
    if (statusId) {
      setSessions((prev) =>
        prev.map((session) =>
          session.id === statusId ? { ...session, status: newStatus } : session
        )
      )
      setStatusId(null)
    }
  }

  const handleNoteSubmit = () => {
    if (notesId && newNote.trim()) {
      setSessions((prev) =>
        prev.map((session) =>
          session.id === notesId
            ? { ...session, notes: session.notes ? `${session.notes}\n${newNote}` : newNote }
            : session
        )
      )
      setNewNote("")
      setNotesId(null)
    }
  }

  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <div className="flex flex-col sm:flex-row gap-2 items-center justify-between">
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
      className="group relative rounded-lg border p-4 transition-all hover:shadow-md hover:border-primary/20 bg-white dark:bg-gray-800"
    >
      {/* Top Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Left: Avatar + Patient Info */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 gap-3">
          <Avatar className="h-12 w-12 shrink-0">
            <AvatarImage src={session.avatar || "/placeholder.svg"} />
            <AvatarFallback className="bg-herbal-gradient text-white">
              {session.patient
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>

          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <p className="font-medium text-gray-900 dark:text-gray-100">{session.patient}</p>
              <Badge variant="outline" className="text-xs">{session.therapy}</Badge>
            </div>

            <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
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

        {/* Right: Status + Menu */}
        <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-start gap-3">
          <div className="text-right md:text-right">
            <Badge variant={getStatusColor(session.status)} className="mb-1">
              {getStatusIcon(session.status)}
              {session.status}
            </Badge>
            <div className="text-sm font-medium">
              {session.elapsed}min / {session.duration}min
            </div>
            <Progress value={(session.elapsed / session.duration) * 100} className="w-24" />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button variant="ghost" size="sm" className="p-2 cursor-pointer">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setDetailsId(session.id)}>
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setStatusId(session.id)
                  setNewStatus(session.status)
                }}
              >
                Update Status
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setNotesId(session.id)
                  setNewNote("")
                }}
              >
                Add Notes
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Checklist Section */}
      <div className="mt-4 pt-4 border-t">
        <div className="flex flex-wrap items-center justify-between mb-2 gap-2">
          <span className="text-sm font-medium">Treatment Checklist</span>
          <span className="text-xs text-muted-foreground">
            {session.checklist.filter((item) => item.completed).length}/{session.checklist.length} completed
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {session.checklist.map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-xs">
              <div className={`h-2 w-2 rounded-full ${item.completed ? "bg-green-500" : "bg-gray-300"}`} />
              <span className={item.completed ? "text-muted-foreground line-through" : ""}>
                {item.item}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  ))}
</CardContent>


      {/* View Details Modal */}
      <Dialog open={detailsId !== null} onOpenChange={() => setDetailsId(null)}>
        <DialogContent className="max-w-lg sm:max-w-xl p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg max-h-[90vh] overflow-y-auto mt-4 sm:mt-0">
          {(() => {
            const currentSession = sessions.find((s) => s.id === detailsId)
            if (!currentSession) return null
            const completedCount = currentSession.checklist.filter((item) => item.completed).length
            const progressValue = (completedCount / currentSession.checklist.length) * 100

            const toggleChecklistItem = (index: number, checked: boolean) => {
              setSessions((prev) =>
                prev.map((s) =>
                  s.id === detailsId
                    ? {
                        ...s,
                        checklist: s.checklist.map((item, i) =>
                          i === index ? { ...item, completed: checked } : item
                        ),
                      }
                    : s
                )
              )
            }

            return (
              <div className="space-y-6">
                <DialogHeader className="flex flex-row items-center gap-4">
                  <Avatar className="h-12 w-12 border-2 border-primary/10">
                    <AvatarImage src={currentSession.avatar || "/placeholder.svg"} alt={currentSession.patient} />
                    <AvatarFallback className="bg-herbal-gradient text-white font-medium">
                      {currentSession.patient
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <DialogTitle className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                      {currentSession.patient} - Session Details
                    </DialogTitle>
                    <DialogDescription className="text-sm text-muted-foreground">
                      Detailed information about the therapy session
                    </DialogDescription>
                  </div>
                </DialogHeader>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-muted/50 p-4 rounded-md">
                  <div className="space-y-1">
                    <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Therapy</Label>
                    <p className="text-sm text-muted-foreground">{currentSession.therapy}</p>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Status</Label>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      {getStatusIcon(currentSession.status)}
                      {currentSession.status}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Therapist</Label>
                    <p className="text-sm text-muted-foreground">{currentSession.therapist}</p>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Room</Label>
                    <p className="text-sm text-muted-foreground">{currentSession.room}</p>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Start Time</Label>
                    <p className="text-sm text-muted-foreground">{currentSession.startTime}</p>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Duration</Label>
                    <p className="text-sm text-muted-foreground">{currentSession.duration} minutes</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">Treatment Checklist</h3>
                    <Badge variant="secondary" className="text-xs font-medium">
                      {completedCount}/{currentSession.checklist.length} Completed
                    </Badge>
                  </div>
                  <Progress
                    value={progressValue}
                    className="h-2 bg-gray-200 dark:bg-gray-700 [&>div]:bg-gradient-to-r [&>div]:from-green-400 [&>div]:to-green-600"
                  />
                  <div className="space-y-3">
                    {currentSession.checklist.map((item, i) => (
                      <div key={i} className="flex items-center gap-3 group">
                        <Checkbox
                          id={`checklist-${detailsId}-${i}`}
                          checked={item.completed}
                          onCheckedChange={(checked) => {
                            if (typeof checked === "boolean") {
                              toggleChecklistItem(i, checked)
                            }
                          }}
                          className="h-5 w-5 border-2 border-gray-300 dark:border-gray-600 rounded-md group-hover:border-primary/50 transition-colors"
                        />
                        <Label
                          htmlFor={`checklist-${detailsId}-${i}`}
                          className={`text-sm ${item.completed ? "text-muted-foreground line-through" : "text-gray-800 dark:text-gray-200"} group-hover:text-primary transition-colors cursor-pointer`}
                        >
                          {item.item}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {currentSession.notes && (
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Session Notes</Label>
                    <p className="text-sm text-muted-foreground p-3 bg-gray-50 dark:bg-gray-900/50 rounded-md border border-gray-200 dark:border-gray-700">
                      {currentSession.notes}
                    </p>
                  </div>
                )}

                <DialogFooter className="flex justify-end gap-2 mt-6">
                  <Button
                    variant="outline"
                    onClick={() => setDetailsId(null)}
                    className="px-4 py-2 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                  >
                    Close
                  </Button>
                </DialogFooter>
              </div>
            )
          })()}
        </DialogContent>
      </Dialog>

      {/* Update Status Modal */}
      <Dialog open={statusId !== null} onOpenChange={() => setStatusId(null)}>
        <DialogContent>
          {(() => {
            const currentSession = sessions.find((s) => s.id === statusId)
            if (!currentSession) return null
            return (
              <>
                <DialogHeader>
                  <DialogTitle>Update Session Status</DialogTitle>
                  <DialogDescription>Change the status for {currentSession.patient}&apos;s session</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <Select
                    value={newStatus}
                    onValueChange={(value: string) => {
                      if (["Scheduled", "In Progress", "Paused", "Completed"].includes(value)) {
                        setNewStatus(value as Session["status"])
                      }
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Scheduled">
                        <div className="flex items-center gap-1">
                          {getStatusIcon("Scheduled")}
                          Scheduled
                        </div>
                      </SelectItem>
                      <SelectItem value="In Progress">
                        <div className="flex items-center gap-1">
                          {getStatusIcon("In Progress")}
                          In Progress
                        </div>
                      </SelectItem>
                      <SelectItem value="Paused">
                        <div className="flex items-center gap-1">
                          {getStatusIcon("Paused")}
                          Paused
                        </div>
                      </SelectItem>
                      <SelectItem value="Completed">
                        <div className="flex items-center gap-1">
                          {getStatusIcon("Completed")}
                          Completed
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <DialogFooter>
                  <Button className="cursor-pointer" variant="outline" onClick={() => setStatusId(null)}>
                    Cancel
                  </Button>
                  <Button className="cursor-pointer" onClick={handleStatusUpdate}>Update</Button>
                </DialogFooter>
              </>
            )
          })()}
        </DialogContent>
      </Dialog>

      {/* Add Notes Modal */}
      <Dialog open={notesId !== null} onOpenChange={() => setNotesId(null)}>
        <DialogContent>
          {(() => {
            const currentSession = sessions.find((s) => s.id === notesId)
            if (!currentSession) return null
            return (
              <>
                <DialogHeader>
                  <DialogTitle>Add Session Notes</DialogTitle>
                  <DialogDescription>Add notes for {currentSession.patient}&apos;s session</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="notes">Notes</Label>
                    <Textarea
                      id="notes"
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                      placeholder="Enter session notes..."
                      className="mt-2"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button className="cursor-pointer" variant="outline" onClick={() => setNotesId(null)}>
                    Cancel
                  </Button>
                  <Button className="cursor-pointer" onClick={handleNoteSubmit} disabled={!newNote.trim()}>
                    Save
                  </Button>
                </DialogFooter>
              </>
            )
          })()}
        </DialogContent>
      </Dialog>
    </Card>
  )
}
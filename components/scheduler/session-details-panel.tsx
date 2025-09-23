"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { AlertTriangle, Clock, User, MapPin, Calendar, Edit, Trash2, Save, X } from "lucide-react"
import type { Session } from "@/app/(app)/scheduler/page"

interface SessionDetailsPanelProps {
  session: Session | null
  onSessionUpdate: (session: Session) => void
  onSessionDelete: (sessionId: string) => void
}

export function SessionDetailsPanel({ session, onSessionUpdate, onSessionDelete }: SessionDetailsPanelProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedSession, setEditedSession] = useState<Session | null>(null)

  if (!session) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Session Details</CardTitle>
          <CardDescription>Select a session to view details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <Calendar className="mx-auto h-12 w-12 mb-4 opacity-50" />
            <p>No session selected</p>
            <p className="text-sm">Click on a session in the calendar to view details</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  const handleEdit = () => {
    setEditedSession({ ...session })
    setIsEditing(true)
  }

  const handleSave = () => {
    if (editedSession) {
      onSessionUpdate(editedSession)
      setIsEditing(false)
      setEditedSession(null)
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditedSession(null)
  }

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this session?")) {
      onSessionDelete(session.id)
    }
  }

  const getStatusColor = (status: Session["status"]) => {
    switch (status) {
      case "completed":
        return "default"
      case "in-progress":
        return "secondary"
      case "cancelled":
        return "destructive"
      default:
        return "outline"
    }
  }

  const currentSession = isEditing ? editedSession : session

  if (!currentSession) return null

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              Session Details
              {currentSession.conflicts && currentSession.conflicts.length > 0 && (
                <AlertTriangle className="h-4 w-4 text-red-500" />
              )}
            </CardTitle>
            <CardDescription>{isEditing ? "Edit session information" : "View and manage session"}</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            {!isEditing ? (
              <>
                <Button variant="ghost" size="sm" onClick={handleEdit}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={handleDelete}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" size="sm" onClick={handleCancel}>
                  <X className="h-4 w-4" />
                </Button>
                <Button variant="default" size="sm" onClick={handleSave}>
                  <Save className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Status and Protocol */}
        <div className="flex items-center justify-between">
          <Badge variant={getStatusColor(currentSession.status)}>
            {currentSession.status.replace("-", " ").toUpperCase()}
          </Badge>
          {currentSession.protocol && (
            <Badge variant="outline">
              {currentSession.protocol} - Day {currentSession.day}
            </Badge>
          )}
        </div>

        {/* Conflicts Warning */}
        {currentSession.conflicts && currentSession.conflicts.length > 0 && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center gap-2 text-red-800 mb-2">
              <AlertTriangle className="h-4 w-4" />
              <span className="font-medium">Conflicts Detected</span>
            </div>
            <ul className="text-sm text-red-700 space-y-1">
              {currentSession.conflicts.map((conflict, i) => (
                <li key={i}>• {conflict}</li>
              ))}
            </ul>
          </div>
        )}

        <Separator />

        {/* Session Information */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="patient">Patient</Label>
            {isEditing ? (
              <Input
                id="patient"
                value={currentSession.patient}
                onChange={(e) => setEditedSession({ ...currentSession, patient: e.target.value })}
              />
            ) : (
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span>{currentSession.patient}</span>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="therapy">Therapy</Label>
            {isEditing ? (
              <Select
                value={currentSession.therapy}
                onValueChange={(value) => setEditedSession({ ...currentSession, therapy: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Abhyanga">Abhyanga</SelectItem>
                  <SelectItem value="Shirodhara">Shirodhara</SelectItem>
                  <SelectItem value="Basti">Basti</SelectItem>
                  <SelectItem value="Nasya">Nasya</SelectItem>
                  <SelectItem value="Virechana">Virechana</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <div className="text-sm">{currentSession.therapy}</div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="therapist">Therapist</Label>
              {isEditing ? (
                <Select
                  value={currentSession.therapist}
                  onValueChange={(value) => setEditedSession({ ...currentSession, therapist: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Dr. Meera">Dr. Meera</SelectItem>
                    <SelectItem value="Dr. Anand">Dr. Anand</SelectItem>
                    <SelectItem value="Dr. Kavya">Dr. Kavya</SelectItem>
                    <SelectItem value="Dr. Priya">Dr. Priya</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <div className="text-sm">{currentSession.therapist}</div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="room">Room</Label>
              {isEditing ? (
                <Select
                  value={currentSession.room}
                  onValueChange={(value) => setEditedSession({ ...currentSession, room: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Room 1">Room 1</SelectItem>
                    <SelectItem value="Room 2">Room 2</SelectItem>
                    <SelectItem value="Room 3">Room 3</SelectItem>
                    <SelectItem value="Room 4">Room 4</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{currentSession.room}</span>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startTime">Start Time</Label>
              {isEditing ? (
                <Input
                  id="startTime"
                  type="time"
                  value={currentSession.startTime}
                  onChange={(e) => setEditedSession({ ...currentSession, startTime: e.target.value })}
                />
              ) : (
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{currentSession.startTime}</span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Duration (min)</Label>
              {isEditing ? (
                <Input
                  id="duration"
                  type="number"
                  value={currentSession.duration}
                  onChange={(e) => setEditedSession({ ...currentSession, duration: Number.parseInt(e.target.value) })}
                />
              ) : (
                <div className="text-sm">{currentSession.duration} minutes</div>
              )}
            </div>
          </div>

          {isEditing && (
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={currentSession.status}
                onValueChange={(value) => setEditedSession({ ...currentSession, status: value as Session["status"] })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>

        <Separator />

        {/* Quick Actions */}
        {!isEditing && (
          <div className="space-y-2">
            <Label>Quick Actions</Label>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm">
                Reschedule
              </Button>
              <Button variant="outline" size="sm">
                Duplicate
              </Button>
              <Button variant="outline" size="sm">
                Add Notes
              </Button>
              <Button variant="outline" size="sm">
                View Patient
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

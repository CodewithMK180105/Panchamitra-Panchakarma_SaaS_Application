"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Clock,
  Heart,
  MessageCircle,
  Star,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  BookOpen,
  Activity,
} from "lucide-react"
import { PatientCheckInModal } from "@/components/patient/patient-check-in-modal"
import { SessionFeedbackModal } from "@/components/patient/session-feedback-modal"
import { TreatmentTimeline } from "@/components/patient/treatment-timeline"
import { SymptomTracker } from "@/components/patient/symptom-tracker"
import { EducationalResources } from "@/components/patient/educational-resources"

export default function PatientDashboard() {
  const [showCheckIn, setShowCheckIn] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)

  // Mock patient data
  const patientData = {
    name: "Priya Sharma",
    currentTreatment: "Virechana 7-day Protocol",
    day: 4,
    totalDays: 7,
    nextSession: {
      therapy: "Virechana",
      date: "Today",
      time: "10:00 AM",
      therapist: "Dr. Meera",
      room: "Room A",
    },
    recentSessions: [
      {
        id: 1,
        therapy: "Abhyanga + Swedana",
        date: "Yesterday",
        rating: 5,
        feedback: "Felt very relaxed and energized",
      },
      {
        id: 2,
        therapy: "Abhyanga",
        date: "2 days ago",
        rating: 4,
        feedback: "Good session, slight discomfort initially",
      },
    ],
    vitals: {
      mood: 8,
      energy: 7,
      sleep: 9,
      appetite: 6,
    },
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-balance">Welcome back, {patientData.name}</h1>
          <p className="text-muted-foreground">Track your healing journey and stay connected with your care team</p>
        </div>
        <Button onClick={() => setShowCheckIn(true)} className="bg-herbal-gradient hover:opacity-90">
          <Heart className="h-4 w-4 mr-2" />
          Daily Check-in
        </Button>
      </div>

      {/* Treatment Progress */}
      <Card className="border-herbal-green/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-herbal-green" />
            Current Treatment Progress
          </CardTitle>
          <CardDescription>{patientData.currentTreatment}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">
              Day {patientData.day} of {patientData.totalDays}
            </span>
            <Badge variant="outline" className="bg-herbal-green/10 text-herbal-green border-herbal-green/20">
              {Math.round((patientData.day / patientData.totalDays) * 100)}% Complete
            </Badge>
          </div>
          <Progress value={(patientData.day / patientData.totalDays) * 100} className="h-2" />

          {/* Next Session */}
          <div className="bg-muted p-4 rounded-lg">
            <h4 className="font-medium mb-2 flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Next Session
            </h4>
            <div className="grid gap-2 text-sm">
              <div>
                <strong>Therapy:</strong> {patientData.nextSession.therapy}
              </div>
              <div>
                <strong>Time:</strong> {patientData.nextSession.date} at {patientData.nextSession.time}
              </div>
              <div>
                <strong>Therapist:</strong> {patientData.nextSession.therapist}
              </div>
              <div>
                <strong>Location:</strong> {patientData.nextSession.room}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setShowCheckIn(true)}>
          <CardContent className="p-4 text-center">
            <Heart className="h-8 w-8 mx-auto mb-2 text-herbal-green" />
            <h3 className="font-medium">Daily Check-in</h3>
            <p className="text-sm text-muted-foreground">Log symptoms & mood</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setShowFeedback(true)}>
          <CardContent className="p-4 text-center">
            <Star className="h-8 w-8 mx-auto mb-2 text-saffron" />
            <h3 className="font-medium">Rate Session</h3>
            <p className="text-sm text-muted-foreground">Share your experience</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-4 text-center">
            <MessageCircle className="h-8 w-8 mx-auto mb-2 text-teal" />
            <h3 className="font-medium">Message Team</h3>
            <p className="text-sm text-muted-foreground">Ask questions</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-4 text-center">
            <BookOpen className="h-8 w-8 mx-auto mb-2 text-herbal-green" />
            <h3 className="font-medium">Learn More</h3>
            <p className="text-sm text-muted-foreground">Educational content</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="symptoms">Symptoms</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Today's Vitals */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Today's Vitals
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Mood</span>
                    <div className="flex items-center gap-2">
                      <Progress value={patientData.vitals.mood * 10} className="w-20 h-2" />
                      <span className="text-sm font-medium">{patientData.vitals.mood}/10</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Energy</span>
                    <div className="flex items-center gap-2">
                      <Progress value={patientData.vitals.energy * 10} className="w-20 h-2" />
                      <span className="text-sm font-medium">{patientData.vitals.energy}/10</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Sleep Quality</span>
                    <div className="flex items-center gap-2">
                      <Progress value={patientData.vitals.sleep * 10} className="w-20 h-2" />
                      <span className="text-sm font-medium">{patientData.vitals.sleep}/10</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Appetite</span>
                    <div className="flex items-center gap-2">
                      <Progress value={patientData.vitals.appetite * 10} className="w-20 h-2" />
                      <span className="text-sm font-medium">{patientData.vitals.appetite}/10</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Sessions */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Sessions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {patientData.recentSessions.map((session) => (
                  <div key={session.id} className="p-3 bg-muted rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-sm">{session.therapy}</h4>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${
                              i < session.rating ? "fill-saffron text-saffron" : "text-muted-foreground"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mb-1">{session.date}</p>
                    <p className="text-xs">{session.feedback}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Upcoming Reminders */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-saffron" />
                Reminders & Instructions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-saffron/10 rounded-lg border border-saffron/20">
                <CheckCircle className="h-5 w-5 text-saffron mt-0.5" />
                <div>
                  <h4 className="font-medium text-sm">Pre-session Preparation</h4>
                  <p className="text-sm text-muted-foreground">
                    Please fast from 8 PM tonight for tomorrow's Virechana session
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-teal/10 rounded-lg border border-teal/20">
                <Clock className="h-5 w-5 text-teal mt-0.5" />
                <div>
                  <h4 className="font-medium text-sm">Medication Reminder</h4>
                  <p className="text-sm text-muted-foreground">
                    Take prescribed herbal medicine at 7 AM with warm water
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="timeline">
          <TreatmentTimeline />
        </TabsContent>

        <TabsContent value="symptoms">
          <SymptomTracker />
        </TabsContent>

        <TabsContent value="resources">
          <EducationalResources />
        </TabsContent>
      </Tabs>

      {/* Modals */}
      <PatientCheckInModal open={showCheckIn} onOpenChange={setShowCheckIn} />
      <SessionFeedbackModal open={showFeedback} onOpenChange={setShowFeedback} />
    </div>
  )
}

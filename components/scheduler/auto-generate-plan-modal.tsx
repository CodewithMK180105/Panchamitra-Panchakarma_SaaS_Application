"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Sparkles, CheckCircle } from "lucide-react"
import type { Session } from "@/app/(app)/scheduler/page"

interface AutoGeneratePlanModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onPlanGenerated: (sessions: Session[]) => void
}

interface ProtocolTemplate {
  id: string
  name: string
  duration: number
  description: string
  sessions: {
    day: number
    therapy: string
    duration: number
    preCare: string[]
    postCare: string[]
    materials: string[]
  }[]
}

const protocolTemplates: ProtocolTemplate[] = [
  {
    id: "virechana-7",
    name: "Virechana 7-day",
    duration: 7,
    description: "Complete Virechana protocol for detoxification",
    sessions: [
      {
        day: 1,
        therapy: "Consultation",
        duration: 30,
        preCare: ["Fasting from 8 PM previous day"],
        postCare: ["Light diet", "Rest"],
        materials: ["Consultation forms"],
      },
      {
        day: 2,
        therapy: "Abhyanga",
        duration: 60,
        preCare: ["Light breakfast"],
        postCare: ["Warm water bath", "Rest for 1 hour"],
        materials: ["Sesame oil", "Towels"],
      },
      {
        day: 3,
        therapy: "Abhyanga + Swedana",
        duration: 90,
        preCare: ["Light breakfast"],
        postCare: ["Warm water bath", "Rest for 2 hours"],
        materials: ["Sesame oil", "Steam chamber", "Towels"],
      },
      {
        day: 4,
        therapy: "Virechana",
        duration: 120,
        preCare: ["Fasting", "Castor oil intake"],
        postCare: ["Complete rest", "Liquid diet only"],
        materials: ["Purgative medicines", "Monitoring equipment"],
      },
      {
        day: 5,
        therapy: "Recovery",
        duration: 45,
        preCare: ["Light liquid diet"],
        postCare: ["Gradual diet progression"],
        materials: ["Recovery medicines"],
      },
      {
        day: 6,
        therapy: "Follow-up",
        duration: 30,
        preCare: ["Normal light diet"],
        postCare: ["Continue prescribed diet"],
        materials: ["Assessment forms"],
      },
      {
        day: 7,
        therapy: "Final Assessment",
        duration: 30,
        preCare: ["Normal diet"],
        postCare: ["Home care instructions"],
        materials: ["Discharge summary"],
      },
    ],
  },
  {
    id: "basti-8",
    name: "Basti 8-day",
    duration: 8,
    description: "Comprehensive Basti treatment protocol",
    sessions: [
      {
        day: 1,
        therapy: "Consultation",
        duration: 30,
        preCare: ["Initial assessment"],
        postCare: ["Diet planning"],
        materials: ["Assessment forms"],
      },
      {
        day: 2,
        therapy: "Niruha Basti",
        duration: 90,
        preCare: ["Light breakfast", "Abhyanga"],
        postCare: ["Rest", "Observation"],
        materials: ["Basti equipment", "Herbal decoctions"],
      },
      // ... more sessions
    ],
  },
]

export function AutoGeneratePlanModal({ open, onOpenChange, onPlanGenerated }: AutoGeneratePlanModalProps) {
  const [step, setStep] = useState(1)
  const [selectedProtocol, setSelectedProtocol] = useState<ProtocolTemplate | null>(null)
  const [formData, setFormData] = useState({
    patient: "",
    startDate: "",
    center: "",
    therapist: "",
    room: "",
    timeWindow: "morning",
    adaptiveScheduling: true,
  })
  const [generatedSessions, setGeneratedSessions] = useState<Session[]>([])

  const handleProtocolSelect = (protocolId: string) => {
    const protocol = protocolTemplates.find((p) => p.id === protocolId)
    setSelectedProtocol(protocol || null)
  }

  const generateSessions = () => {
    if (!selectedProtocol) return

    const sessions: Session[] = selectedProtocol.sessions.map((sessionTemplate, index) => {
      const sessionDate = new Date(formData.startDate)
      sessionDate.setDate(sessionDate.getDate() + sessionTemplate.day - 1)

      const startTime =
        formData.timeWindow === "morning" ? "09:00" : formData.timeWindow === "afternoon" ? "14:00" : "09:00"
      const endTime = new Date(`2024-01-01 ${startTime}`)
      endTime.setMinutes(endTime.getMinutes() + sessionTemplate.duration)

      return {
        id: `generated-${Date.now()}-${index}`,
        title: `${sessionTemplate.therapy} - Day ${sessionTemplate.day}`,
        patient: formData.patient,
        therapy: sessionTemplate.therapy,
        therapist: formData.therapist,
        room: formData.room,
        startTime: startTime,
        endTime: endTime.toTimeString().slice(0, 5),
        date: sessionDate.toISOString().split("T")[0],
        status: "scheduled" as const,
        protocol: selectedProtocol.name,
        day: sessionTemplate.day,
        duration: sessionTemplate.duration,
        color: "bg-green-100 border-green-300 text-green-800",
      }
    })

    setGeneratedSessions(sessions)
    setStep(3)
  }

  const handleGenerate = () => {
    onPlanGenerated(generatedSessions)
    onOpenChange(false)
    // Reset form
    setStep(1)
    setSelectedProtocol(null)
    setFormData({
      patient: "",
      startDate: "",
      center: "",
      therapist: "",
      room: "",
      timeWindow: "morning",
      adaptiveScheduling: true,
    })
    setGeneratedSessions([])
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-herbal-green" />
            Auto-Generate Therapy Plan
          </DialogTitle>
          <DialogDescription>Create a complete treatment schedule based on standardized protocols</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Step Indicator */}
          <div className="flex items-center justify-center space-x-4">
            {[1, 2, 3].map((stepNum) => (
              <div key={stepNum} className="flex items-center">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${
                    step >= stepNum ? "bg-herbal-gradient text-white" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {step > stepNum ? <CheckCircle className="h-4 w-4" /> : stepNum}
                </div>
                {stepNum < 3 && <div className={`h-px w-12 ${step > stepNum ? "bg-herbal-green" : "bg-muted"}`} />}
              </div>
            ))}
          </div>

          {/* Step 1: Protocol Selection */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-4">Select Protocol Template</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  {protocolTemplates.map((protocol) => (
                    <Card
                      key={protocol.id}
                      className={`cursor-pointer transition-all hover:shadow-md ${
                        selectedProtocol?.id === protocol.id ? "ring-2 ring-primary" : ""
                      }`}
                      onClick={() => handleProtocolSelect(protocol.id)}
                    >
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          {protocol.name}
                          <Badge variant="outline">{protocol.duration} days</Badge>
                        </CardTitle>
                        <CardDescription>{protocol.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="text-sm text-muted-foreground">{protocol.sessions.length} sessions planned</div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {selectedProtocol && (
                <div className="mt-6">
                  <h4 className="font-medium mb-3">Protocol Preview</h4>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {selectedProtocol.sessions.map((session, i) => (
                      <div key={i} className="flex items-center justify-between p-2 bg-muted rounded">
                        <div>
                          <span className="font-medium">Day {session.day}:</span> {session.therapy}
                        </div>
                        <Badge variant="outline">{session.duration}min</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-end">
                <Button
                  onClick={() => setStep(2)}
                  disabled={!selectedProtocol}
                  className="bg-herbal-gradient hover:opacity-90"
                >
                  Next: Configure Details
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Configuration */}
          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold mb-4">Configure Treatment Plan</h3>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="patient">Patient Name</Label>
                  <Input
                    id="patient"
                    value={formData.patient}
                    onChange={(e) => setFormData({ ...formData, patient: e.target.value })}
                    placeholder="Enter patient name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="center">Center</Label>
                  <Select
                    value={formData.center}
                    onValueChange={(value) => setFormData({ ...formData, center: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select center" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="main">Main Clinic</SelectItem>
                      <SelectItem value="branch">Branch Office</SelectItem>
                      <SelectItem value="wellness">Wellness Center</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="therapist">Preferred Therapist</Label>
                  <Select
                    value={formData.therapist}
                    onValueChange={(value) => setFormData({ ...formData, therapist: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Auto-assign available" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Dr. Meera">Dr. Meera</SelectItem>
                      <SelectItem value="Dr. Rajesh">Dr. Rajesh</SelectItem>
                      <SelectItem value="Dr. Priya">Dr. Priya</SelectItem>
                      <SelectItem value="auto">Auto-assign</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="room">Preferred Room</Label>
                  <Select value={formData.room} onValueChange={(value) => setFormData({ ...formData, room: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Auto-assign available" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Room A">Room A</SelectItem>
                      <SelectItem value="Room B">Room B</SelectItem>
                      <SelectItem value="Room C">Room C</SelectItem>
                      <SelectItem value="auto">Auto-assign</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timeWindow">Time Window</Label>
                  <Select
                    value={formData.timeWindow}
                    onValueChange={(value) => setFormData({ ...formData, timeWindow: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="morning">Morning (9 AM - 12 PM)</SelectItem>
                      <SelectItem value="afternoon">Afternoon (2 PM - 5 PM)</SelectItem>
                      <SelectItem value="flexible">Flexible</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button
                  onClick={generateSessions}
                  disabled={!formData.patient || !formData.startDate}
                  className="bg-herbal-gradient hover:opacity-90"
                >
                  Generate Plan
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Review & Confirm */}
          {step === 3 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold mb-4">Review Generated Plan</h3>

              <div className="bg-muted p-4 rounded-lg">
                <div className="grid gap-2 text-sm">
                  <div>
                    <strong>Patient:</strong> {formData.patient}
                  </div>
                  <div>
                    <strong>Protocol:</strong> {selectedProtocol?.name}
                  </div>
                  <div>
                    <strong>Duration:</strong> {selectedProtocol?.duration} days
                  </div>
                  <div>
                    <strong>Start Date:</strong> {formData.startDate}
                  </div>
                  <div>
                    <strong>Sessions:</strong> {generatedSessions.length}
                  </div>
                </div>
              </div>

              <div className="space-y-2 max-h-60 overflow-y-auto">
                {generatedSessions.map((session, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-background border rounded">
                    <div>
                      <div className="font-medium">{session.title}</div>
                      <div className="text-sm text-muted-foreground">
                        {session.date} • {session.startTime} - {session.endTime} • {session.room}
                      </div>
                    </div>
                    <Badge variant="outline">{session.duration}min</Badge>
                  </div>
                ))}
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(2)}>
                  Back to Edit
                </Button>
                <Button onClick={handleGenerate} className="bg-herbal-gradient hover:opacity-90">
                  Confirm & Generate
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

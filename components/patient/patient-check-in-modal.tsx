"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Heart, Activity, Moon, Utensils, AlertTriangle } from "lucide-react"

interface PatientCheckInModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function PatientCheckInModal({ open, onOpenChange }: PatientCheckInModalProps) {
  const [formData, setFormData] = useState({
    mood: [7],
    energy: [6],
    sleep: [8],
    appetite: [5],
    symptoms: [] as string[],
    notes: "",
    concerns: "",
  })

  const commonSymptoms = [
    "Nausea",
    "Headache",
    "Fatigue",
    "Dizziness",
    "Stomach discomfort",
    "Joint pain",
    "Skin irritation",
    "Anxiety",
    "Restlessness",
    "Constipation",
  ]

  const handleSymptomChange = (symptom: string, checked: boolean) => {
    if (checked) {
      setFormData((prev) => ({ ...prev, symptoms: [...prev.symptoms, symptom] }))
    } else {
      setFormData((prev) => ({ ...prev, symptoms: prev.symptoms.filter((s) => s !== symptom) }))
    }
  }

  const handleSubmit = () => {
    // Handle form submission
    console.log("Check-in data:", formData)
    onOpenChange(false)
    // Reset form
    setFormData({
      mood: [7],
      energy: [6],
      sleep: [8],
      appetite: [5],
      symptoms: [],
      notes: "",
      concerns: "",
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-herbal-green" />
            Daily Check-in
          </DialogTitle>
          <DialogDescription>Help us track your progress by sharing how you're feeling today</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Vitals */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">How are you feeling?</CardTitle>
              <CardDescription>Rate each aspect from 1 (poor) to 10 (excellent)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Heart className="h-4 w-4 text-herbal-green" />
                  <Label>Mood</Label>
                  <span className="ml-auto font-medium">{formData.mood[0]}/10</span>
                </div>
                <Slider
                  value={formData.mood}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, mood: value }))}
                  max={10}
                  min={1}
                  step={1}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-saffron" />
                  <Label>Energy Level</Label>
                  <span className="ml-auto font-medium">{formData.energy[0]}/10</span>
                </div>
                <Slider
                  value={formData.energy}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, energy: value }))}
                  max={10}
                  min={1}
                  step={1}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Moon className="h-4 w-4 text-teal" />
                  <Label>Sleep Quality</Label>
                  <span className="ml-auto font-medium">{formData.sleep[0]}/10</span>
                </div>
                <Slider
                  value={formData.sleep}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, sleep: value }))}
                  max={10}
                  min={1}
                  step={1}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Utensils className="h-4 w-4 text-herbal-green" />
                  <Label>Appetite</Label>
                  <span className="ml-auto font-medium">{formData.appetite[0]}/10</span>
                </div>
                <Slider
                  value={formData.appetite}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, appetite: value }))}
                  max={10}
                  min={1}
                  step={1}
                  className="w-full"
                />
              </div>
            </CardContent>
          </Card>

          {/* Symptoms */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Any symptoms today?</CardTitle>
              <CardDescription>Select all that apply</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 md:grid-cols-2">
                {commonSymptoms.map((symptom) => (
                  <div key={symptom} className="flex items-center space-x-2">
                    <Checkbox
                      id={symptom}
                      checked={formData.symptoms.includes(symptom)}
                      onCheckedChange={(checked) => handleSymptomChange(symptom, checked as boolean)}
                    />
                    <Label htmlFor={symptom} className="text-sm">
                      {symptom}
                    </Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Notes */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Additional Notes</CardTitle>
              <CardDescription>Share any other observations or experiences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="notes">General Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="How did you feel after yesterday's session? Any changes you've noticed?"
                  value={formData.notes}
                  onChange={(e) => setFormData((prev) => ({ ...prev, notes: e.target.value }))}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="concerns" className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-saffron" />
                  Concerns or Questions
                </Label>
                <Textarea
                  id="concerns"
                  placeholder="Any concerns you'd like to discuss with your care team?"
                  value={formData.concerns}
                  onChange={(e) => setFormData((prev) => ({ ...prev, concerns: e.target.value }))}
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>

          {/* Submit */}
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} className="bg-herbal-gradient hover:opacity-90">
              Submit Check-in
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

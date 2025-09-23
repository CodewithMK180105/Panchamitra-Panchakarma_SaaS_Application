"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, Calendar, Star } from "lucide-react"

export function TreatmentTimeline() {
  const timelineData = [
    {
      day: 1,
      date: "Dec 18, 2024",
      therapy: "Initial Consultation",
      status: "completed",
      duration: 30,
      rating: 5,
      notes: "Comprehensive assessment completed. Treatment plan discussed.",
    },
    {
      day: 2,
      date: "Dec 19, 2024",
      therapy: "Abhyanga",
      status: "completed",
      duration: 60,
      rating: 4,
      notes: "Full body oil massage. Felt very relaxed afterwards.",
    },
    {
      day: 3,
      date: "Dec 20, 2024",
      therapy: "Abhyanga + Swedana",
      status: "completed",
      duration: 90,
      rating: 5,
      notes: "Oil massage followed by steam therapy. Excellent session.",
    },
    {
      day: 4,
      date: "Dec 21, 2024",
      therapy: "Virechana",
      status: "in-progress",
      duration: 120,
      notes: "Main detoxification procedure. Currently in progress.",
    },
    {
      day: 5,
      date: "Dec 22, 2024",
      therapy: "Recovery",
      status: "scheduled",
      duration: 45,
      notes: "Recovery and monitoring session.",
    },
    {
      day: 6,
      date: "Dec 23, 2024",
      therapy: "Follow-up",
      status: "scheduled",
      duration: 30,
      notes: "Progress assessment and dietary guidance.",
    },
    {
      day: 7,
      date: "Dec 24, 2024",
      therapy: "Final Assessment",
      status: "scheduled",
      duration: 30,
      notes: "Final evaluation and home care instructions.",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Treatment Timeline
        </CardTitle>
        <CardDescription>Your complete Virechana 7-day protocol journey</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {timelineData.map((item, index) => (
            <div key={item.day} className="relative">
              {/* Timeline line */}
              {index < timelineData.length - 1 && <div className="absolute left-4 top-8 w-px h-16 bg-muted" />}

              <div className="flex items-start gap-4">
                {/* Status indicator */}
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full border-2 ${
                    item.status === "completed"
                      ? "bg-herbal-green border-herbal-green text-white"
                      : item.status === "in-progress"
                        ? "bg-saffron border-saffron text-white"
                        : "bg-background border-muted-foreground text-muted-foreground"
                  }`}
                >
                  {item.status === "completed" ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : item.status === "in-progress" ? (
                    <Clock className="h-4 w-4" />
                  ) : (
                    <span className="text-xs font-medium">{item.day}</span>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium">
                      Day {item.day}: {item.therapy}
                    </h4>
                    <div className="flex items-center gap-2">
                      {item.rating && (
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-saffron text-saffron" />
                          <span className="text-xs">{item.rating}</span>
                        </div>
                      )}
                      <Badge variant="outline" className="text-xs">
                        {item.duration}min
                      </Badge>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">{item.date}</p>
                  <p className="text-sm">{item.notes}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

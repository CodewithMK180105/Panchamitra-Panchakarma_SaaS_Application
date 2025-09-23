"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingDown, TrendingUp, Minus, Activity } from "lucide-react"

export function SymptomTracker() {
  const [selectedPeriod, setSelectedPeriod] = useState("week")

  const symptomData = [
    {
      name: "Nausea",
      current: 2,
      previous: 5,
      trend: "improving",
      history: [5, 4, 3, 3, 2, 2, 1],
    },
    {
      name: "Energy Level",
      current: 7,
      previous: 4,
      trend: "improving",
      history: [4, 5, 5, 6, 6, 7, 7],
    },
    {
      name: "Sleep Quality",
      current: 8,
      previous: 6,
      trend: "improving",
      history: [6, 6, 7, 7, 8, 8, 8],
    },
    {
      name: "Appetite",
      current: 6,
      previous: 6,
      trend: "stable",
      history: [6, 6, 5, 6, 6, 6, 6],
    },
    {
      name: "Joint Pain",
      current: 3,
      previous: 7,
      trend: "improving",
      history: [7, 6, 5, 4, 4, 3, 3],
    },
  ]

  const moodData = [
    { date: "Dec 15", mood: 6, energy: 5, stress: 7 },
    { date: "Dec 16", mood: 7, energy: 6, stress: 6 },
    { date: "Dec 17", mood: 7, energy: 6, stress: 5 },
    { date: "Dec 18", mood: 8, energy: 7, stress: 4 },
    { date: "Dec 19", mood: 8, energy: 7, stress: 3 },
    { date: "Dec 20", mood: 9, energy: 8, stress: 3 },
    { date: "Dec 21", mood: 8, energy: 7, stress: 4 },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Symptom Progress Tracking
          </CardTitle>
          <CardDescription>Monitor your symptoms and recovery progress over time</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <TabsList className="mb-4">
              <TabsTrigger value="week">This Week</TabsTrigger>
              <TabsTrigger value="month">This Month</TabsTrigger>
              <TabsTrigger value="all">All Time</TabsTrigger>
            </TabsList>

            <TabsContent value="week" className="space-y-4">
              <div className="grid gap-4">
                {symptomData.map((symptom) => (
                  <div key={symptom.name} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium">{symptom.name}</h4>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {symptom.current}/10
                        </Badge>
                        {symptom.trend === "improving" && <TrendingDown className="h-4 w-4 text-herbal-green" />}
                        {symptom.trend === "worsening" && <TrendingUp className="h-4 w-4 text-red-500" />}
                        {symptom.trend === "stable" && <Minus className="h-4 w-4 text-muted-foreground" />}
                      </div>
                    </div>

                    <div className="flex items-center gap-1 mb-2">
                      {symptom.history.map((value, index) => (
                        <div
                          key={index}
                          className="flex-1 bg-muted rounded-sm"
                          style={{ height: `${Math.max(value * 4, 4)}px` }}
                        />
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>7 days ago</span>
                      <span>Today</span>
                    </div>

                    {symptom.trend === "improving" && (
                      <p className="text-xs text-herbal-green mt-2">
                        Improved by {symptom.previous - symptom.current} points this week
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="month">
              <p className="text-muted-foreground text-center py-8">Monthly view coming soon...</p>
            </TabsContent>

            <TabsContent value="all">
              <p className="text-muted-foreground text-center py-8">All-time view coming soon...</p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Mood & Wellness Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Mood & Wellness Trends</CardTitle>
          <CardDescription>Track your emotional and mental well-being</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {moodData.map((day, index) => (
              <div key={day.date} className="flex items-center gap-4 p-3 bg-muted rounded-lg">
                <div className="text-sm font-medium w-16">{day.date}</div>
                <div className="flex-1 grid grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">Mood:</span>
                    <div className="flex items-center gap-1">
                      <div className="w-12 bg-background rounded-full h-2">
                        <div className="bg-herbal-green h-2 rounded-full" style={{ width: `${day.mood * 10}%` }} />
                      </div>
                      <span className="font-medium">{day.mood}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">Energy:</span>
                    <div className="flex items-center gap-1">
                      <div className="w-12 bg-background rounded-full h-2">
                        <div className="bg-saffron h-2 rounded-full" style={{ width: `${day.energy * 10}%` }} />
                      </div>
                      <span className="font-medium">{day.energy}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">Stress:</span>
                    <div className="flex items-center gap-1">
                      <div className="w-12 bg-background rounded-full h-2">
                        <div className="bg-red-400 h-2 rounded-full" style={{ width: `${day.stress * 10}%` }} />
                      </div>
                      <span className="font-medium">{day.stress}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

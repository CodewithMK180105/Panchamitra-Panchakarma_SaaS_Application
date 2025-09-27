"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Calendar, Users, Activity, AlertCircle, TrendingUp, Plus } from "lucide-react"
import { RealTimeSessionCard } from "@/components/real-time-session-card"
import { NotificationsFeed } from "@/components/notifications-feed"
import { EnhancedCalendarWidget } from "@/components/enhanced-calendar-widget"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function DashboardPage() {
  const router = useRouter()
  const [isCreatingSchedule, setIsCreatingSchedule] = useState(false)

  const handleCreateSchedule = async () => {
    setIsCreatingSchedule(true)
    await new Promise((resolve) => setTimeout(resolve, 500)) // Simulate loading
    router.push("/scheduler")
    setIsCreatingSchedule(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <Button
          className="bg-herbal-gradient hover:opacity-90 w-full sm:w-auto"
          onClick={handleCreateSchedule}
          disabled={isCreatingSchedule}
        >
          {isCreatingSchedule ? (
            <>
              <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              Creating...
            </>
          ) : (
            <>
              <Plus className="mr-2 h-4 w-4" />
              Create Schedule
            </>
          )}
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Sessions</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+2</span> from yesterday
            </p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Patients In-Care</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">Active treatments</p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+5%</span> from last week
            </p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Alerts</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Require attention</p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Feedback</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.8</div>
            <p className="text-xs text-muted-foreground">Out of 5.0</p>
          </CardContent>
        </Card>
      </div>

      {/* <div className="grid gap-6 grid-cols-1 lg:grid-cols-3"> */}
        {/* Enhanced Real-Time Therapy Tracking */}
        <div className="lg:col-span-1">
          <RealTimeSessionCard />
        </div>

        {/* Enhanced Calendar Widget */}
        <div className="lg:col-span-2">
          <EnhancedCalendarWidget />
        </div>
      {/* </div> */}

      <div className="grid gap-6 grid-cols-1 xl:grid-cols-3">
        {/* Notifications Feed */}
        <NotificationsFeed />

        {/* Recent Feedback */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Feedback</CardTitle>
            <CardDescription>Patient responses from today</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              {
                patient: "Priya S.",
                mood: "😊",
                pain: 2,
                energy: 8,
                effects: ["Relaxed"],
                time: "2 hours ago",
                improvement: "+2 energy",
              },
              {
                patient: "Raj P.",
                mood: "😐",
                pain: 4,
                energy: 6,
                effects: ["Mild fatigue"],
                time: "4 hours ago",
                improvement: "-1 pain",
              },
              {
                patient: "Sunita D.",
                mood: "🙂",
                pain: 1,
                energy: 9,
                effects: ["Energized", "Clear mind"],
                time: "6 hours ago",
                improvement: "+3 energy",
              },
            ].map((feedback, i) => (
              <div key={i} className="space-y-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{feedback.patient}</span>
                    <span className="text-2xl">{feedback.mood}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground">{feedback.time}</div>
                    <Badge variant="outline" className="text-xs mt-1">
                      {feedback.improvement}
                    </Badge>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span>Pain:</span>
                      <span className="font-medium">{feedback.pain}/10</span>
                    </div>
                    <Progress value={feedback.pain * 10} className="h-1" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span>Energy:</span>
                      <span className="font-medium">{feedback.energy}/10</span>
                    </div>
                    <Progress value={feedback.energy * 10} className="h-1" />
                  </div>
                </div>
                <div className="flex flex-wrap gap-1">
                  {feedback.effects.map((effect, j) => (
                    <Badge key={j} variant="outline" className="text-xs">
                      {effect}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Protocol Adherence */}
      <Card>
        <CardHeader>
          <CardTitle>Protocol Adherence</CardTitle>
          <CardDescription>Compliance across centers and treatments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { center: "Main Clinic", adherence: 96, sessions: 45, protocols: 8 },
              { center: "Branch Office", adherence: 89, sessions: 32, protocols: 6 },
              { center: "Wellness Center", adherence: 92, sessions: 28, protocols: 5 },
            ].map((center, i) => (
              <div key={i} className="space-y-3 p-4 border rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{center.center}</span>
                  <Badge
                    variant={center.adherence >= 95 ? "default" : center.adherence >= 90 ? "secondary" : "outline"}
                  >
                    {center.adherence}%
                  </Badge>
                </div>
                <Progress value={center.adherence} className="h-2" />
                <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                  <div>{center.sessions} sessions</div>
                  <div>{center.protocols} protocols</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

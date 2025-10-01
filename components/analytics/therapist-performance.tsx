"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Star, Users, Clock, Award, TrendingUp } from "lucide-react"

interface TherapistPerformanceProps {
  dateRange: string
  center: string
}

export function TherapistPerformance({ dateRange, center }: TherapistPerformanceProps) {
  const therapistData = [
    {
      id: 1,
      name: "Dr. Meera Sharma",
      avatar: "/placeholder.svg?height=40&width=40",
      specialization: "Virechana Specialist",
      totalSessions: 156,
      patientRating: 4.9,
      completionRate: 96,
      avgSessionDuration: 82,
      revenue: 1680000,
      certifications: ["Panchakarma Expert", "Ayurveda Acharya"],
    },
    {
      id: 2,
      name: "Dr. Rajesh Kumar",
      avatar: "/placeholder.svg?height=40&width=40",
      specialization: "Basti Therapy Expert",
      totalSessions: 124,
      patientRating: 4.8,
      completionRate: 94,
      avgSessionDuration: 78,
      revenue: 1450000,
      certifications: ["Basti Specialist", "Clinical Ayurveda"],
    },
    {
      id: 3,
      name: "Dr. Priya Nair",
      avatar: "/placeholder.svg?height=40&width=40",
      specialization: "Massage Therapist",
      totalSessions: 98,
      patientRating: 4.7,
      completionRate: 92,
      avgSessionDuration: 75,
      revenue: 980000,
      certifications: ["Abhyanga Expert", "Wellness Coach"],
    },
    {
      id: 4,
      name: "Dr. Amit Patel",
      avatar: "/placeholder.svg?height=40&width=40",
      specialization: "General Practitioner",
      totalSessions: 67,
      patientRating: 4.6,
      completionRate: 89,
      avgSessionDuration: 72,
      revenue: 740000,
      certifications: ["Ayurveda Practitioner"],
    },
  ]

  const performanceMetrics = [
    { metric: "Patient Satisfaction", value: 4.8, target: 4.5, unit: "/5" },
    { metric: "Session Completion", value: 93, target: 90, unit: "%" },
    { metric: "On-time Performance", value: 87, target: 85, unit: "%" },
    { metric: "Patient Retention", value: 91, target: 85, unit: "%" },
  ]

  const monthlyPerformance = [
    { month: "Aug", meera: 32, rajesh: 28, priya: 25, amit: 18 },
    { month: "Sep", meera: 35, rajesh: 31, priya: 28, amit: 22 },
    { month: "Oct", meera: 38, rajesh: 29, priya: 32, amit: 25 },
    { month: "Nov", meera: 42, rajesh: 35, priya: 35, amit: 28 },
    { month: "Dec", meera: 45, rajesh: 38, priya: 38, amit: 31 },
  ]

  return (
    <div className="space-y-6">
      {/* Performance Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {performanceMetrics.map((metric) => (
          <Card key={metric.metric}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.metric}</CardTitle>
              {metric.metric === "Patient Satisfaction" && <Star className="h-4 w-4 text-saffron" />}
              {metric.metric === "Session Completion" && <Award className="h-4 w-4 text-herbal-green" />}
              {metric.metric === "On-time Performance" && <Clock className="h-4 w-4 text-teal" />}
              {metric.metric === "Patient Retention" && <Users className="h-4 w-4 text-herbal-green" />}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {metric.value}
                {metric.unit}
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3 text-herbal-green" />
                <span className="text-herbal-green">Above target</span>
                <span>
                  ({metric.target}
                  {metric.unit})
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Therapist Performance Cards */}
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
        {therapistData.map((therapist) => (
          <Card key={therapist.id}>
            <CardHeader>
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={therapist.avatar || "/placeholder.svg"} alt={therapist.name} />
                  <AvatarFallback>
                    {therapist.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <CardTitle className="text-lg">{therapist.name}</CardTitle>
                  <CardDescription>{therapist.specialization}</CardDescription>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-saffron text-saffron" />
                    <span className="font-medium">{therapist.patientRating}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">{therapist.totalSessions} sessions</div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-muted-foreground">Completion Rate</div>
                  <div className="font-medium">{therapist.completionRate}%</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Avg Duration</div>
                  <div className="font-medium">{therapist.avgSessionDuration} min</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Revenue</div>
                  <div className="font-medium">₹{(therapist.revenue / 100000).toFixed(1)}L</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Sessions</div>
                  <div className="font-medium">{therapist.totalSessions}</div>
                </div>
              </div>

              <div>
                <div className="text-sm text-muted-foreground mb-2">Certifications</div>
                <div className="flex flex-wrap gap-1">
                  {therapist.certifications.map((cert) => (
                    <Badge key={cert} variant="outline" className="text-xs">
                      {cert}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Performance Score</span>
                  <span className="font-medium">{Math.round((therapist.patientRating / 5) * 100)}%</span>
                </div>
                <Progress value={(therapist.patientRating / 5) * 100} className="h-2" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Monthly Performance Chart */}
      <Card className="overflow-auto">
        <CardHeader>
          <CardTitle>Monthly Session Volume by Therapist</CardTitle>
          <CardDescription>Sessions completed per therapist over time</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyPerformance}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="meera" name="Dr. Meera" fill="#2FA27E" />
              <Bar dataKey="rajesh" name="Dr. Rajesh" fill="#8ECFBB" />
              <Bar dataKey="priya" name="Dr. Priya" fill="#F4A261" />
              <Bar dataKey="amit" name="Dr. Amit" fill="#2A9D8F" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Performance Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Insights</CardTitle>
          <CardDescription>Key observations and recommendations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="p-4 bg-herbal-green/10 rounded-lg border border-herbal-green/20">
              <div className="flex items-center gap-2 mb-2">
                <Award className="h-4 w-4 text-herbal-green" />
                <h4 className="font-medium">Top Performer</h4>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                Dr. Meera leads with highest patient satisfaction (4.9/5) and session volume
              </p>
              <Badge variant="outline" className="bg-herbal-green/10 text-herbal-green border-herbal-green/20">
                156 sessions
              </Badge>
            </div>
            <div className="p-4 bg-saffron/10 rounded-lg border border-saffron/20">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-saffron" />
                <h4 className="font-medium">Growth Opportunity</h4>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                Dr. Amit shows potential for increased session volume and specialization training
              </p>
              <Badge variant="outline" className="bg-saffron/10 text-saffron border-saffron/20">
                +46% growth
              </Badge>
            </div>
            <div className="p-4 bg-teal/10 rounded-lg border border-teal/20">
              <div className="flex items-center gap-2 mb-2">
                <Star className="h-4 w-4 text-teal" />
                <h4 className="font-medium">Consistency</h4>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                All therapists maintain above 4.6/5 rating, showing excellent service quality
              </p>
              <Badge variant="outline" className="bg-teal/10 text-teal border-teal/20">
                4.8 avg rating
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { TrendingUp, CheckCircle, Clock, AlertCircle } from "lucide-react"

interface TreatmentAnalyticsProps {
  dateRange: string
  center: string
}

export function TreatmentAnalytics({ dateRange, center }: TreatmentAnalyticsProps) {
  const treatmentOutcomes = [
    {
      treatment: "Virechana",
      totalSessions: 156,
      completed: 142,
      inProgress: 14,
      successRate: 91,
      avgDuration: 7.2,
      patientSatisfaction: 4.8,
    },
    {
      treatment: "Basti",
      totalSessions: 124,
      completed: 118,
      inProgress: 6,
      successRate: 95,
      avgDuration: 8.5,
      patientSatisfaction: 4.9,
    },
    {
      treatment: "Abhyanga",
      totalSessions: 98,
      completed: 95,
      inProgress: 3,
      successRate: 97,
      avgDuration: 1.0,
      patientSatisfaction: 4.7,
    },
    {
      treatment: "Swedana",
      totalSessions: 67,
      completed: 64,
      inProgress: 3,
      successRate: 96,
      avgDuration: 1.5,
      patientSatisfaction: 4.6,
    },
  ]

  const monthlyTrends = [
    { month: "Aug", virechana: 32, basti: 28, abhyanga: 45, swedana: 22 },
    { month: "Sep", virechana: 38, basti: 31, abhyanga: 42, swedana: 25 },
    { month: "Oct", virechana: 35, basti: 29, abhyanga: 48, swedana: 28 },
    { month: "Nov", virechana: 42, basti: 35, abhyanga: 52, swedana: 31 },
    { month: "Dec", virechana: 45, basti: 38, abhyanga: 55, swedana: 34 },
  ]

  const protocolCompliance = [
    { protocol: "Pre-treatment Preparation", compliance: 94, issues: 8 },
    { protocol: "Session Timing", compliance: 87, issues: 15 },
    { protocol: "Post-care Instructions", compliance: 91, issues: 12 },
    { protocol: "Follow-up Scheduling", compliance: 89, issues: 14 },
    { protocol: "Documentation", compliance: 96, issues: 5 },
  ]

  return (
    <div className="space-y-6">
      {/* Treatment Outcomes Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {treatmentOutcomes.map((treatment) => (
          <Card key={treatment.treatment}>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">{treatment.treatment}</CardTitle>
              <CardDescription>{treatment.totalSessions} total sessions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Success Rate</span>
                <Badge
                  variant="outline"
                  className={
                    treatment.successRate >= 95
                      ? "bg-herbal-green/10 text-herbal-green border-herbal-green/20"
                      : treatment.successRate >= 90
                        ? "bg-saffron/10 text-saffron border-saffron/20"
                        : "bg-red-100 text-red-600 border-red-200"
                  }
                >
                  {treatment.successRate}%
                </Badge>
              </div>
              <Progress value={treatment.successRate} className="h-2" />
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex items-center gap-1">
                  <CheckCircle className="h-3 w-3 text-herbal-green" />
                  <span>{treatment.completed} completed</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3 text-saffron" />
                  <span>{treatment.inProgress} active</span>
                </div>
              </div>
              <div className="pt-2 border-t">
                <div className="flex justify-between text-xs">
                  <span>Avg Duration</span>
                  <span className="font-medium">{treatment.avgDuration} days</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span>Satisfaction</span>
                  <span className="font-medium">{treatment.patientSatisfaction}/5</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
        {/* Monthly Treatment Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Treatment Trends</CardTitle>
            <CardDescription>Treatment volume over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="virechana" stackId="a" fill="#2FA27E" />
                <Bar dataKey="basti" stackId="a" fill="#8ECFBB" />
                <Bar dataKey="abhyanga" stackId="a" fill="#F4A261" />
                <Bar dataKey="swedana" stackId="a" fill="#2A9D8F" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Protocol Compliance */}
        <Card>
          <CardHeader>
            <CardTitle>Protocol Compliance</CardTitle>
            <CardDescription>Adherence to treatment protocols</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {protocolCompliance.map((protocol) => (
                <div key={protocol.protocol} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{protocol.protocol}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{protocol.compliance}%</span>
                      {protocol.issues > 10 && <AlertCircle className="h-3 w-3 text-saffron" />}
                    </div>
                  </div>
                  <Progress value={protocol.compliance} className="h-2" />
                  <div className="text-xs text-muted-foreground">{protocol.issues} issues reported</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Treatment Success Factors */}
      <Card>
        <CardHeader>
          <CardTitle>Treatment Success Factors</CardTitle>
          <CardDescription>Key factors contributing to successful outcomes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="p-4 bg-herbal-green/10 rounded-lg border border-herbal-green/20">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-herbal-green" />
                <h4 className="font-medium">Patient Preparation</h4>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                Patients who follow pre-treatment guidelines show 23% better outcomes
              </p>
              <Badge variant="outline" className="bg-herbal-green/10 text-herbal-green border-herbal-green/20">
                94% compliance
              </Badge>
            </div>
            <div className="p-4 bg-saffron/10 rounded-lg border border-saffron/20">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-4 w-4 text-saffron" />
                <h4 className="font-medium">Timing Consistency</h4>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                Regular session timing improves treatment effectiveness by 18%
              </p>
              <Badge variant="outline" className="bg-saffron/10 text-saffron border-saffron/20">
                87% adherence
              </Badge>
            </div>
            <div className="p-4 bg-teal/10 rounded-lg border border-teal/20">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="h-4 w-4 text-teal" />
                <h4 className="font-medium">Follow-up Care</h4>
              </div>
              <p className="text-sm text-muted-foreground mb-2">Proper follow-up reduces relapse rates by 31%</p>
              <Badge variant="outline" className="bg-teal/10 text-teal border-teal/20">
                91% completion
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

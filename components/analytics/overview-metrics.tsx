"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { TrendingUp, TrendingDown, Users, Calendar, DollarSign, Star, Activity, Clock } from "lucide-react"

interface OverviewMetricsProps {
  dateRange: string
  center: string
}

export function OverviewMetrics({ dateRange, center }: OverviewMetricsProps) {
  // Mock data - in real app, this would come from API based on dateRange and center
  const kpiData = [
    {
      title: "Total Patients",
      value: "1,247",
      change: "+12.5%",
      trend: "up",
      icon: Users,
      color: "text-herbal-green",
    },
    {
      title: "Active Treatments",
      value: "89",
      change: "+8.2%",
      trend: "up",
      icon: Activity,
      color: "text-saffron",
    },
    {
      title: "Monthly Revenue",
      value: "₹4,85,000",
      change: "+15.3%",
      trend: "up",
      icon: DollarSign,
      color: "text-teal",
    },
    {
      title: "Avg. Satisfaction",
      value: "4.8/5",
      change: "+0.2",
      trend: "up",
      icon: Star,
      color: "text-herbal-green",
    },
    {
      title: "Capacity Utilization",
      value: "87%",
      change: "-2.1%",
      trend: "down",
      icon: Calendar,
      color: "text-saffron",
    },
    {
      title: "Avg. Session Duration",
      value: "78 min",
      change: "+5 min",
      trend: "up",
      icon: Clock,
      color: "text-teal",
    },
  ]

  const chartData = [
    { date: "Dec 1", patients: 45, revenue: 125000, satisfaction: 4.6 },
    { date: "Dec 8", patients: 52, revenue: 142000, satisfaction: 4.7 },
    { date: "Dec 15", patients: 48, revenue: 138000, satisfaction: 4.8 },
    { date: "Dec 22", patients: 61, revenue: 165000, satisfaction: 4.9 },
    { date: "Dec 29", patients: 58, revenue: 158000, satisfaction: 4.8 },
  ]

  const treatmentDistribution = [
    { name: "Virechana", value: 35, color: "#2FA27E" },
    { name: "Basti", value: 28, color: "#8ECFBB" },
    { name: "Abhyanga", value: 22, color: "#F4A261" },
    { name: "Swedana", value: 15, color: "#2A9D8F" },
  ]

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {kpiData.map((kpi) => (
          <Card key={kpi.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
              <kpi.icon className={`h-4 w-4 ${kpi.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                {kpi.trend === "up" ? (
                  <TrendingUp className="h-3 w-3 text-herbal-green" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-red-500" />
                )}
                <span className={kpi.trend === "up" ? "text-herbal-green" : "text-red-500"}>{kpi.change}</span>
                <span>from last period</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid gap-4 xl:grid-cols-2">
        {/* Patient & Revenue Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Patient & Revenue Trends</CardTitle>
            <CardDescription>Weekly overview of key metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Area
                  yAxisId="left"
                  type="monotone"
                  dataKey="patients"
                  stackId="1"
                  stroke="#2FA27E"
                  fill="#2FA27E"
                  fillOpacity={0.3}
                />
                <Line yAxisId="right" type="monotone" dataKey="revenue" stroke="#F4A261" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Treatment Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Treatment Distribution</CardTitle>
            <CardDescription>Popular treatments this period</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {treatmentDistribution.map((treatment) => (
                <div key={treatment.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: treatment.color }} />
                    <span className="font-medium">{treatment.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-20 bg-muted rounded-full h-2">
                      <div
                        className="h-2 rounded-full"
                        style={{
                          width: `${treatment.value}%`,
                          backgroundColor: treatment.color,
                        }}
                      />
                    </div>
                    <span className="text-sm font-medium w-8">{treatment.value}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest updates and milestones</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-3 bg-herbal-green/10 rounded-lg border border-herbal-green/20">
              <div className="w-2 h-2 bg-herbal-green rounded-full" />
              <div className="flex-1">
                <p className="text-sm font-medium">New patient milestone reached</p>
                <p className="text-xs text-muted-foreground">1,247 total patients - 12% growth this month</p>
              </div>
              <Badge variant="outline" className="text-xs">
                Today
              </Badge>
            </div>
            <div className="flex items-center gap-4 p-3 bg-saffron/10 rounded-lg border border-saffron/20">
              <div className="w-2 h-2 bg-saffron rounded-full" />
              <div className="flex-1">
                <p className="text-sm font-medium">High satisfaction scores</p>
                <p className="text-xs text-muted-foreground">Average rating improved to 4.8/5 this week</p>
              </div>
              <Badge variant="outline" className="text-xs">
                2 days ago
              </Badge>
            </div>
            <div className="flex items-center gap-4 p-3 bg-teal/10 rounded-lg border border-teal/20">
              <div className="w-2 h-2 bg-teal rounded-full" />
              <div className="flex-1">
                <p className="text-sm font-medium">Revenue target achieved</p>
                <p className="text-xs text-muted-foreground">Monthly revenue exceeded target by 15%</p>
              </div>
              <Badge variant="outline" className="text-xs">
                1 week ago
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

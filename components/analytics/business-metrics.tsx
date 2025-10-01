"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { DollarSign, TrendingUp, Users, Calendar, Target, CreditCard } from "lucide-react"

interface BusinessMetricsProps {
  dateRange: string
  center: string
}

export function BusinessMetrics({ dateRange, center }: BusinessMetricsProps) {
  const revenueMetrics = {
    totalRevenue: 4850000,
    monthlyGrowth: 15.3,
    averageSessionValue: 3200,
    revenuePerPatient: 12800,
  }

  const revenueData = [
    { month: "Aug", revenue: 3800000, sessions: 1250, patients: 320 },
    { month: "Sep", revenue: 4100000, sessions: 1340, patients: 345 },
    { month: "Oct", revenue: 4300000, sessions: 1420, patients: 368 },
    { month: "Nov", revenue: 4600000, sessions: 1580, patients: 392 },
    { month: "Dec", revenue: 4850000, sessions: 1680, patients: 415 },
  ]

  const treatmentRevenue = [
    { treatment: "Virechana", revenue: 1680000, sessions: 156, avgValue: 10769 },
    { treatment: "Basti", revenue: 1450000, sessions: 124, avgValue: 11694 },
    { treatment: "Abhyanga", revenue: 980000, sessions: 98, avgValue: 10000 },
    { treatment: "Swedana", revenue: 740000, sessions: 67, avgValue: 11045 },
  ]

  const paymentMethods = [
    { method: "Cash", amount: 1940000, percentage: 40 },
    { method: "Card", amount: 1455000, percentage: 30 },
    { method: "UPI", amount: 970000, percentage: 20 },
    { method: "Insurance", amount: 485000, percentage: 10 },
  ]

  const operationalMetrics = [
    { metric: "Capacity Utilization", value: 87, target: 85, status: "above" },
    { metric: "Average Session Duration", value: 78, target: 75, status: "above" },
    { metric: "No-show Rate", value: 8, target: 10, status: "below" },
    { metric: "Cancellation Rate", value: 12, target: 15, status: "below" },
  ]

  return (
    <div className="space-y-6">
      {/* Revenue Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-herbal-green" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{(revenueMetrics.totalRevenue / 100000).toFixed(1)}L</div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 text-herbal-green" />
              <span className="text-herbal-green">+{revenueMetrics.monthlyGrowth}%</span>
              <span>from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Session Value</CardTitle>
            <Target className="h-4 w-4 text-saffron" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{revenueMetrics.averageSessionValue.toLocaleString()}</div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 text-herbal-green" />
              <span className="text-herbal-green">+8%</span>
              <span>from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue per Patient</CardTitle>
            <Users className="h-4 w-4 text-teal" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{revenueMetrics.revenuePerPatient.toLocaleString()}</div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 text-herbal-green" />
              <span className="text-herbal-green">+12%</span>
              <span>from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Growth</CardTitle>
            <TrendingUp className="h-4 w-4 text-herbal-green" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{revenueMetrics.monthlyGrowth}%</div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <span>Consistent growth trend</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid gap-4 xl:grid-cols-2">
        {/* Revenue Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trends</CardTitle>
            <CardDescription>Monthly revenue and session volume</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip
                  formatter={(value, name) => [
                    name === "revenue" ? `₹${((value as number) / 100000).toFixed(1)}L` : value,
                    name === "revenue" ? "Revenue" : name === "sessions" ? "Sessions" : "Patients",
                  ]}
                />
                <Area type="monotone" dataKey="revenue" stackId="1" stroke="#2FA27E" fill="#2FA27E" fillOpacity={0.3} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Treatment Revenue Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue by Treatment</CardTitle>
            <CardDescription>Revenue contribution by treatment type</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={treatmentRevenue}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="treatment" />
                <YAxis />
                <Tooltip formatter={(value) => [`₹${((value as number) / 100000).toFixed(1)}L`, "Revenue"]} />
                <Bar dataKey="revenue" fill="#2FA27E" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Payment Methods & Operational Metrics */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Payment Methods */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Payment Methods
            </CardTitle>
            <CardDescription>Revenue breakdown by payment type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {paymentMethods.map((method) => (
                <div key={method.method} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="font-medium">{method.method}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-24 bg-muted rounded-full h-2">
                      <div className="bg-herbal-green h-2 rounded-full" style={{ width: `${method.percentage}%` }} />
                    </div>
                    <span className="text-sm font-medium w-16">₹{(method.amount / 100000).toFixed(1)}L</span>
                    <Badge variant="outline" className="text-xs w-8">
                      {method.percentage}%
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Operational Metrics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Operational Metrics
            </CardTitle>
            <CardDescription>Key operational performance indicators</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {operationalMetrics.map((metric) => (
                <div key={metric.metric} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{metric.metric}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">
                        {metric.value}
                        {metric.metric.includes("Rate") ? "%" : metric.metric.includes("Duration") ? " min" : "%"}
                      </span>
                      <Badge
                        variant="outline"
                        className={
                          (metric.status === "above" &&
                            metric.metric !== "No-show Rate" &&
                            metric.metric !== "Cancellation Rate") ||
                          (metric.status === "below" &&
                            (metric.metric === "No-show Rate" || metric.metric === "Cancellation Rate"))
                            ? "bg-herbal-green/10 text-herbal-green border-herbal-green/20"
                            : "bg-saffron/10 text-saffron border-saffron/20"
                        }
                      >
                        Target: {metric.target}
                        {metric.metric.includes("Rate") ? "%" : metric.metric.includes("Duration") ? " min" : "%"}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download } from "lucide-react"
import { OverviewMetrics } from "@/components/analytics/overview-metrics"
import { TreatmentAnalytics } from "@/components/analytics/treatment-analytics"
import { PatientSatisfaction } from "@/components/analytics/patient-satisfaction"
import { BusinessMetrics } from "@/components/analytics/business-metrics"
import { TherapistPerformance } from "@/components/analytics/therapist-performance"
import { DetailedReports } from "@/components/analytics/detailed-reports"

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState("30d")
  const [selectedCenter, setSelectedCenter] = useState("all")

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-balance">Analytics & Reports</h1>
          <p className="text-muted-foreground">Comprehensive insights into your practice performance</p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={selectedCenter} onValueChange={setSelectedCenter}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Centers</SelectItem>
              <SelectItem value="main">Main Clinic</SelectItem>
              <SelectItem value="branch">Branch Office</SelectItem>
              <SelectItem value="wellness">Wellness Center</SelectItem>
            </SelectContent>
          </Select>
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-herbal-gradient hover:opacity-90">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Main Analytics Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="treatments">Treatments</TabsTrigger>
          <TabsTrigger value="satisfaction">Satisfaction</TabsTrigger>
          <TabsTrigger value="business">Business</TabsTrigger>
          <TabsTrigger value="therapists">Therapists</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <OverviewMetrics dateRange={dateRange} center={selectedCenter} />
        </TabsContent>

        <TabsContent value="treatments">
          <TreatmentAnalytics dateRange={dateRange} center={selectedCenter} />
        </TabsContent>

        <TabsContent value="satisfaction">
          <PatientSatisfaction dateRange={dateRange} center={selectedCenter} />
        </TabsContent>

        <TabsContent value="business">
          <BusinessMetrics dateRange={dateRange} center={selectedCenter} />
        </TabsContent>

        <TabsContent value="therapists">
          <TherapistPerformance dateRange={dateRange} center={selectedCenter} />
        </TabsContent>

        <TabsContent value="reports">
          <DetailedReports dateRange={dateRange} center={selectedCenter} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

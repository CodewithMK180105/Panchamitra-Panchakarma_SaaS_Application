"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Download, FileText, BarChart3, Calendar, Search } from "lucide-react"

interface DetailedReportsProps {
  dateRange: string
  center: string
}

export function DetailedReports({ dateRange, center }: DetailedReportsProps) {
  const [selectedReports, setSelectedReports] = useState<string[]>([])
  const [reportFormat, setReportFormat] = useState("pdf")
  const [searchTerm, setSearchTerm] = useState("")

  const availableReports = [
    {
      id: "patient-summary",
      title: "Patient Summary Report",
      description: "Comprehensive patient data, treatment history, and outcomes",
      category: "Patient Management",
      lastGenerated: "2 hours ago",
      size: "2.4 MB",
    },
    {
      id: "financial-summary",
      title: "Financial Summary",
      description: "Revenue, expenses, and profitability analysis",
      category: "Financial",
      lastGenerated: "1 day ago",
      size: "1.8 MB",
    },
    {
      id: "treatment-outcomes",
      title: "Treatment Outcomes Analysis",
      description: "Success rates, patient satisfaction, and clinical effectiveness",
      category: "Clinical",
      lastGenerated: "3 hours ago",
      size: "3.2 MB",
    },
    {
      id: "therapist-performance",
      title: "Therapist Performance Report",
      description: "Individual therapist metrics, ratings, and productivity",
      category: "HR & Performance",
      lastGenerated: "5 hours ago",
      size: "1.5 MB",
    },
    {
      id: "capacity-utilization",
      title: "Capacity Utilization Report",
      description: "Room usage, scheduling efficiency, and resource optimization",
      category: "Operations",
      lastGenerated: "1 day ago",
      size: "1.2 MB",
    },
    {
      id: "patient-feedback",
      title: "Patient Feedback Analysis",
      description: "Detailed feedback analysis, sentiment trends, and improvement areas",
      category: "Quality Assurance",
      lastGenerated: "6 hours ago",
      size: "2.1 MB",
    },
    {
      id: "inventory-usage",
      title: "Inventory & Supplies Usage",
      description: "Medicine consumption, oil usage, and supply chain analytics",
      category: "Inventory",
      lastGenerated: "12 hours ago",
      size: "0.9 MB",
    },
    {
      id: "marketing-roi",
      title: "Marketing ROI Analysis",
      description: "Campaign performance, patient acquisition costs, and conversion rates",
      category: "Marketing",
      lastGenerated: "2 days ago",
      size: "1.7 MB",
    },
  ]

  const reportCategories = [
    "All",
    "Patient Management",
    "Financial",
    "Clinical",
    "HR & Performance",
    "Operations",
    "Quality Assurance",
    "Inventory",
    "Marketing",
  ]

  const handleReportSelection = (reportId: string, checked: boolean) => {
    if (checked) {
      setSelectedReports([...selectedReports, reportId])
    } else {
      setSelectedReports(selectedReports.filter((id) => id !== reportId))
    }
  }

  const handleGenerateReports = () => {
    console.log("Generating reports:", selectedReports, "Format:", reportFormat)
    // Handle report generation
  }

  const filteredReports = availableReports.filter(
    (report) =>
      report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      {/* Report Generation Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Generate Custom Reports
          </CardTitle>
          <CardDescription>Select reports to generate and download</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <Label htmlFor="search">Search Reports</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search by report name or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="format">Format</Label>
              <Select value={reportFormat} onValueChange={setReportFormat}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="excel">Excel</SelectItem>
                  <SelectItem value="csv">CSV</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              {selectedReports.length} report{selectedReports.length !== 1 ? "s" : ""} selected
            </div>
            <Button
              onClick={handleGenerateReports}
              disabled={selectedReports.length === 0}
              className="bg-herbal-gradient hover:opacity-90"
            >
              <Download className="h-4 w-4 mr-2" />
              Generate Reports
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Available Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Available Reports</CardTitle>
          <CardDescription>Select reports to include in your download</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-6">
            {reportCategories.map((category) => (
              <Button
                key={category}
                variant={category === "All" ? "default" : "outline"}
                size="sm"
                className={category === "All" ? "bg-herbal-gradient hover:opacity-90" : ""}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Reports Grid */}
          <div className="grid gap-4 lg:grid-cols-2">
            {filteredReports.map((report) => (
              <Card key={report.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Checkbox
                        checked={selectedReports.includes(report.id)}
                        onCheckedChange={(checked) => handleReportSelection(report.id, checked as boolean)}
                      />
                      <div>
                        <CardTitle className="text-lg">{report.title}</CardTitle>
                        <Badge variant="outline" className="text-xs mt-1">
                          {report.category}
                        </Badge>
                      </div>
                    </div>
                    <BarChart3 className="h-5 w-5 text-herbal-green" />
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardDescription className="mb-3">{report.description}</CardDescription>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-4">
                      <span>Last generated: {report.lastGenerated}</span>
                      <span>Size: {report.size}</span>
                    </div>
                    <Button size="sm" variant="ghost" className="h-6 px-2">
                      <Download className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Scheduled Reports */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Scheduled Reports
          </CardTitle>
          <CardDescription>Automatically generated reports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div>
                <h4 className="font-medium">Weekly Performance Summary</h4>
                <p className="text-sm text-muted-foreground">Every Monday at 9:00 AM</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-herbal-green/10 text-herbal-green border-herbal-green/20">
                  Active
                </Badge>
                <Button size="sm" variant="ghost">
                  Edit
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div>
                <h4 className="font-medium">Monthly Financial Report</h4>
                <p className="text-sm text-muted-foreground">1st of every month at 10:00 AM</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-herbal-green/10 text-herbal-green border-herbal-green/20">
                  Active
                </Badge>
                <Button size="sm" variant="ghost">
                  Edit
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div>
                <h4 className="font-medium">Quarterly Outcomes Analysis</h4>
                <p className="text-sm text-muted-foreground">End of each quarter</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-saffron/10 text-saffron border-saffron/20">
                  Paused
                </Badge>
                <Button size="sm" variant="ghost">
                  Edit
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

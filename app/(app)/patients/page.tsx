"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Plus, Filter, Phone, Mail, MapPin, Activity, Heart } from "lucide-react"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

// ✅ Define TypeScript types
interface Patient {
  id: number
  name: string
  age: number
  phone: string
  email: string
  address: string
  condition: string
  treatment: string
  status: "Active" | "Completed"
  progress: number
  lastVisit: string
  nextAppointment?: string | null
  avatar?: string
}

// ✅ Sample Data
const patients: Patient[] = [
  {
    id: 1,
    name: "Priya Sharma",
    age: 34,
    phone: "+91 98765 43210",
    email: "priya.sharma@email.com",
    address: "Mumbai, Maharashtra",
    condition: "Chronic Stress",
    treatment: "Panchakarma Detox",
    status: "Active",
    progress: 75,
    lastVisit: "2024-01-15",
    nextAppointment: "2024-01-22",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "Rajesh Kumar",
    age: 45,
    phone: "+91 87654 32109",
    email: "rajesh.kumar@email.com",
    address: "Delhi, India",
    condition: "Digestive Issues",
    treatment: "Virechana Therapy",
    status: "Completed",
    progress: 100,
    lastVisit: "2024-01-10",
    nextAppointment: null,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    name: "Anita Patel",
    age: 28,
    phone: "+91 76543 21098",
    email: "anita.patel@email.com",
    address: "Ahmedabad, Gujarat",
    condition: "Anxiety & Insomnia",
    treatment: "Shirodhara",
    status: "Active",
    progress: 45,
    lastVisit: "2024-01-12",
    nextAppointment: "2024-01-20",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export default function PatientsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)
  const [isAddingPatient, setIsAddingPatient] = useState(false)
  const [loading, setLoading] = useState(false)

  // ✅ Filter logic
  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.condition.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddPatient = async () => {
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setLoading(false)
    setIsAddingPatient(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-herbal-green/5 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* ✅ Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
        >
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Patient Management</h1>
            <p className="text-sm sm:text-base text-muted-foreground">Manage and track patient treatments</p>
          </div>

          <Dialog open={isAddingPatient} onOpenChange={setIsAddingPatient}>
            <DialogTrigger asChild>
              <Button className="bg-herbal-gradient hover:opacity-90 text-white w-full sm:w-auto">
                <Plus className="h-4 w-4 mr-2" />
                Add Patient
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Patient</DialogTitle>
                <DialogDescription>Enter patient details to create a new record</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="Enter full name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="age">Age</Label>
                    <Input id="age" type="number" placeholder="Enter age" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" placeholder="+91 XXXXX XXXXX" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="email@example.com" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" placeholder="Enter address" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="condition">Primary Condition</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select condition" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="stress">Chronic Stress</SelectItem>
                      <SelectItem value="digestive">Digestive Issues</SelectItem>
                      <SelectItem value="anxiety">Anxiety & Insomnia</SelectItem>
                      <SelectItem value="pain">Chronic Pain</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea id="notes" placeholder="Enter any additional notes" />
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsAddingPatient(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddPatient} disabled={loading}>
                  {loading && <LoadingSpinner className="h-4 w-4 mr-2" />}
                  Add Patient
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </motion.div>

        {/* ✅ Search + Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search patients by name or condition..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" className="w-full sm:w-auto">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </motion.div>

        {/* ✅ Patients Grid - Fully Responsive */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredPatients.map((patient, index) => (
            <motion.div
              key={patient.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                className="hover:shadow-lg transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedPatient(patient)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={patient.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {patient.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{patient.name}</CardTitle>
                        <CardDescription>Age: {patient.age}</CardDescription>
                      </div>
                    </div>
                    <Badge variant={patient.status === "Active" ? "default" : "secondary"}>{patient.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Heart className="h-4 w-4 mr-2 text-herbal-green" />
                    {patient.condition}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Activity className="h-4 w-4 mr-2 text-herbal-green" />
                    {patient.treatment}
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{patient.progress}%</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div
                        className="bg-herbal-gradient h-2 rounded-full transition-all duration-300"
                        style={{ width: `${patient.progress}%` }}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 items-center justify-between text-xs sm:text-sm text-muted-foreground">
                    <span>Last Visit: {patient.lastVisit}</span>
                    {patient.nextAppointment && <span>Next: {patient.nextAppointment}</span>}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* ✅ Patient Details Modal */}
        {selectedPatient && (
          <Dialog open={!!selectedPatient} onOpenChange={() => setSelectedPatient(null)}>
            <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={selectedPatient.avatar || "/placeholder.svg"} />
                    <AvatarFallback>
                      {selectedPatient.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  {selectedPatient.name}
                </DialogTitle>
                <DialogDescription>Patient Details and Treatment History</DialogDescription>
              </DialogHeader>

              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 mb-8 sm:mb-0">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="treatment">Treatment</TabsTrigger>
                  <TabsTrigger value="history">History</TabsTrigger>
                  <TabsTrigger value="notes">Notes</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Contact Information</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="flex items-center text-sm break-all">
                          <Phone className="h-4 w-4 mr-2 text-herbal-green" />
                          {selectedPatient.phone}
                        </div>
                        <div className="flex items-center text-sm break-all">
                          <Mail className="h-4 w-4 mr-2 text-herbal-green" />
                          {selectedPatient.email}
                        </div>
                        <div className="flex items-center text-sm break-words">
                          <MapPin className="h-4 w-4 mr-2 text-herbal-green" />
                          {selectedPatient.address}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Treatment Status</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Progress</span>
                          <span className="text-sm font-medium">{selectedPatient.progress}%</span>
                        </div>
                        <div className="w-full bg-secondary rounded-full h-2">
                          <div
                            className="bg-herbal-gradient h-2 rounded-full"
                            style={{ width: `${selectedPatient.progress}%` }}
                          />
                        </div>
                        <Badge variant={selectedPatient.status === "Active" ? "default" : "secondary"}>
                          {selectedPatient.status}
                        </Badge>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="treatment" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Current Treatment Plan</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <h4 className="font-medium">Primary Condition</h4>
                        <p className="text-sm text-muted-foreground">{selectedPatient.condition}</p>
                      </div>
                      <div>
                        <h4 className="font-medium">Treatment Type</h4>
                        <p className="text-sm text-muted-foreground">{selectedPatient.treatment}</p>
                      </div>
                      <div>
                        <h4 className="font-medium">Next Appointment</h4>
                        <p className="text-sm text-muted-foreground">
                          {selectedPatient.nextAppointment || "No upcoming appointments"}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="history" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Treatment History</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="border-l-2 border-herbal-green pl-4 space-y-1">
                        <h4 className="font-medium">Last Session</h4>
                        <p className="text-sm text-muted-foreground">Date: {selectedPatient.lastVisit}</p>
                        <p className="text-sm text-muted-foreground">Treatment: Abhyanga Massage</p>
                        <p className="text-sm text-muted-foreground">Duration: 90 minutes</p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="notes" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Clinical Notes</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Textarea
                        placeholder="Add clinical notes..."
                        className="min-h-[200px]"
                        defaultValue="Patient showing good progress with current treatment plan. Stress levels have decreased significantly."
                      />
                      <Button className="mt-3 w-full sm:w-auto">Save Notes</Button>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  )
}

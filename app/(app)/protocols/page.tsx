"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
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
import { Search, Plus, BookOpen, Clock, Users, Star, Download, Copy } from "lucide-react"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

const protocols = [
  {
    id: 1,
    name: "Panchakarma Detox Protocol",
    description: "Complete 21-day Panchakarma detoxification program",
    category: "Detoxification",
    duration: "21 days",
    sessions: 15,
    difficulty: "Advanced",
    rating: 4.8,
    reviews: 124,
    steps: [
      { day: 1, treatment: "Consultation & Assessment", duration: "60 min" },
      { day: 2, treatment: "Abhyanga (Oil Massage)", duration: "90 min" },
      { day: 3, treatment: "Swedana (Steam Therapy)", duration: "45 min" },
      { day: 4, treatment: "Virechana (Purgation)", duration: "120 min" },
    ],
    contraindications: ["Pregnancy", "Severe heart conditions", "Active infections"],
    materials: ["Sesame oil", "Herbal decoctions", "Steam chamber"],
  },
  {
    id: 2,
    name: "Stress Relief Protocol",
    description: "7-day intensive stress management program",
    category: "Mental Health",
    duration: "7 days",
    sessions: 10,
    difficulty: "Beginner",
    rating: 4.6,
    reviews: 89,
    steps: [
      { day: 1, treatment: "Initial Assessment", duration: "45 min" },
      { day: 2, treatment: "Shirodhara", duration: "60 min" },
      { day: 3, treatment: "Meditation Session", duration: "30 min" },
      { day: 4, treatment: "Abhyanga", duration: "75 min" },
    ],
    contraindications: ["Severe depression", "Psychosis"],
    materials: ["Medicated oils", "Meditation cushions", "Calming herbs"],
  },
  {
    id: 3,
    name: "Digestive Health Protocol",
    description: "14-day program for digestive system restoration",
    category: "Digestive Health",
    duration: "14 days",
    sessions: 12,
    difficulty: "Intermediate",
    rating: 4.7,
    reviews: 156,
    steps: [
      { day: 1, treatment: "Digestive Assessment", duration: "45 min" },
      { day: 2, treatment: "Herbal Medicine Consultation", duration: "30 min" },
      { day: 3, treatment: "Abdominal Massage", duration: "60 min" },
      { day: 4, treatment: "Dietary Counseling", duration: "45 min" },
    ],
    contraindications: ["Acute gastritis", "Intestinal obstruction"],
    materials: ["Digestive herbs", "Massage oils", "Dietary supplements"],
  },
]

export default function ProtocolsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedProtocol, setSelectedProtocol] = useState(null)
  const [isCreatingProtocol, setIsCreatingProtocol] = useState(false)
  const [loading, setLoading] = useState(false)

  const categories = ["all", "Detoxification", "Mental Health", "Digestive Health", "Pain Management", "Respiratory"]

  const filteredProtocols = protocols.filter((protocol) => {
    const matchesSearch =
      protocol.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      protocol.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || protocol.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleCreateProtocol = async () => {
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setLoading(false)
    setIsCreatingProtocol(false)
  }

  const handleDownloadProtocol = async (protocol) => {
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setLoading(false)
    // Simulate download
    console.log(`Downloaded protocol: ${protocol.name}`)
  }

  const handleCopyProtocol = async (protocol) => {
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setLoading(false)
    console.log(`Copied protocol: ${protocol.name}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-herbal-green/5 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
        >
          <div>
            <h1 className="text-3xl font-bold text-foreground">Treatment Protocols</h1>
            <p className="text-muted-foreground">Standardized treatment plans and procedures</p>
          </div>
          <Dialog open={isCreatingProtocol} onOpenChange={setIsCreatingProtocol}>
            <DialogTrigger asChild>
              <Button className="bg-herbal-gradient hover:opacity-90 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Create Protocol
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Protocol</DialogTitle>
                <DialogDescription>Design a new treatment protocol</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Protocol Name</Label>
                    <Input id="name" placeholder="Enter protocol name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="detox">Detoxification</SelectItem>
                        <SelectItem value="mental">Mental Health</SelectItem>
                        <SelectItem value="digestive">Digestive Health</SelectItem>
                        <SelectItem value="pain">Pain Management</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Describe the protocol purpose and benefits" />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration</Label>
                    <Input id="duration" placeholder="e.g., 14 days" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sessions">Sessions</Label>
                    <Input id="sessions" type="number" placeholder="Number of sessions" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="difficulty">Difficulty</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select difficulty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contraindications">Contraindications</Label>
                  <Textarea id="contraindications" placeholder="List any contraindications or precautions" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="materials">Required Materials</Label>
                  <Textarea id="materials" placeholder="List required materials and equipment" />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsCreatingProtocol(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateProtocol} disabled={loading}>
                  {loading ? <LoadingSpinner className="h-4 w-4 mr-2" /> : null}
                  Create Protocol
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search protocols by name or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category === "all" ? "All Categories" : category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </motion.div>

        {/* Protocols Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProtocols.map((protocol, index) => (
            <motion.div
              key={protocol.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                className="hover:shadow-lg transition-all duration-300 cursor-pointer h-full"
                onClick={() => setSelectedProtocol(protocol)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-lg">{protocol.name}</CardTitle>
                      <CardDescription>{protocol.description}</CardDescription>
                    </div>
                    <Badge variant="outline">{protocol.category}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center text-muted-foreground">
                      <Clock className="h-4 w-4 mr-2 text-herbal-green" />
                      {protocol.duration}
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Users className="h-4 w-4 mr-2 text-herbal-green" />
                      {protocol.sessions} sessions
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{protocol.rating}</span>
                      <span className="text-sm text-muted-foreground">({protocol.reviews})</span>
                    </div>
                    <Badge
                      variant={
                        protocol.difficulty === "Beginner"
                          ? "secondary"
                          : protocol.difficulty === "Intermediate"
                            ? "default"
                            : "destructive"
                      }
                    >
                      {protocol.difficulty}
                    </Badge>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 bg-transparent"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDownloadProtocol(protocol)
                      }}
                      disabled={loading}
                    >
                      {loading ? <LoadingSpinner className="h-3 w-3 mr-1" /> : <Download className="h-3 w-3 mr-1" />}
                      Download
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 bg-transparent"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleCopyProtocol(protocol)
                      }}
                      disabled={loading}
                    >
                      {loading ? <LoadingSpinner className="h-3 w-3 mr-1" /> : <Copy className="h-3 w-3 mr-1" />}
                      Copy
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Protocol Details Modal */}
        {selectedProtocol && (
          <Dialog open={!!selectedProtocol} onOpenChange={() => setSelectedProtocol(null)}>
            <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3">
                  <BookOpen className="h-5 w-5 text-herbal-green" />
                  {selectedProtocol.name}
                </DialogTitle>
                <DialogDescription>{selectedProtocol.description}</DialogDescription>
              </DialogHeader>

              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="steps">Treatment Steps</TabsTrigger>
                  <TabsTrigger value="materials">Materials</TabsTrigger>
                  <TabsTrigger value="safety">Safety</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Protocol Details</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Duration:</span>
                          <span className="text-sm font-medium">{selectedProtocol.duration}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Sessions:</span>
                          <span className="text-sm font-medium">{selectedProtocol.sessions}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Difficulty:</span>
                          <Badge
                            variant={
                              selectedProtocol.difficulty === "Beginner"
                                ? "secondary"
                                : selectedProtocol.difficulty === "Intermediate"
                                  ? "default"
                                  : "destructive"
                            }
                          >
                            {selectedProtocol.difficulty}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Ratings & Reviews</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                          <span className="text-lg font-bold">{selectedProtocol.rating}</span>
                          <span className="text-sm text-muted-foreground">out of 5</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{selectedProtocol.reviews} reviews</p>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="steps" className="space-y-4">
                  <div className="space-y-3">
                    {selectedProtocol.steps.map((step, index) => (
                      <Card key={index}>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 bg-herbal-gradient rounded-full flex items-center justify-center text-white text-sm font-medium">
                                {step.day}
                              </div>
                              <div>
                                <h4 className="font-medium">{step.treatment}</h4>
                                <p className="text-sm text-muted-foreground">Day {step.day}</p>
                              </div>
                            </div>
                            <Badge variant="outline">{step.duration}</Badge>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="materials" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Required Materials & Equipment</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {selectedProtocol.materials.map((material, index) => (
                          <li key={index} className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-herbal-green rounded-full" />
                            <span>{material}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="safety" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-red-600">Contraindications & Precautions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {selectedProtocol.contraindications.map((contraindication, index) => (
                          <li key={index} className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-red-500 rounded-full" />
                            <span>{contraindication}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                        <p className="text-sm text-yellow-800 dark:text-yellow-200">
                          <strong>Important:</strong> Always conduct a thorough assessment before beginning any
                          protocol. Consult with senior practitioners for complex cases.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => handleDownloadProtocol(selectedProtocol)} disabled={loading}>
                  {loading ? <LoadingSpinner className="h-4 w-4 mr-2" /> : <Download className="h-4 w-4 mr-2" />}
                  Download PDF
                </Button>
                <Button onClick={() => handleCopyProtocol(selectedProtocol)} disabled={loading}>
                  {loading ? <LoadingSpinner className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                  Copy Protocol
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  )
}

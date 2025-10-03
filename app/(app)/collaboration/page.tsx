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
import {
  Users,
  MessageSquare,
  Video,
  Calendar,
  Share2,
  Plus,
  Search,
  Bell,
  Clock,
} from "lucide-react"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

// ✅ Types
interface Participant {
  name: string
  role: string
  avatar?: string
}

interface Collaboration {
  id: number
  title: string
  description: string
  participants: Participant[]
  status: string
  lastActivity: string
  messages: number
  files: number
}

interface Message {
  id: number
  sender: string
  message: string
  timestamp: string
  avatar?: string
}

// ✅ Dummy Data
const collaborations: Collaboration[] = [
  {
    id: 1,
    title: "Panchakarma Research Study",
    description: "Collaborative research on modern Panchakarma techniques",
    participants: [
      { name: "Dr. Priya Sharma", role: "Lead Researcher", avatar: "/placeholder.svg?height=32&width=32" },
      { name: "Dr. Rajesh Kumar", role: "Clinical Specialist", avatar: "/placeholder.svg?height=32&width=32" },
      { name: "Dr. Anita Patel", role: "Data Analyst", avatar: "/placeholder.svg?height=32&width=32" },
    ],
    status: "Active",
    lastActivity: "2 hours ago",
    messages: 24,
    files: 12,
  },
  {
    id: 2,
    title: "Patient Case Discussion",
    description: "Complex case requiring multi-specialist consultation",
    participants: [
      { name: "Dr. Suresh Gupta", role: "Primary Physician", avatar: "/placeholder.svg?height=32&width=32" },
      { name: "Dr. Meera Singh", role: "Ayurveda Specialist", avatar: "/placeholder.svg?height=32&width=32" },
    ],
    status: "Urgent",
    lastActivity: "30 minutes ago",
    messages: 8,
    files: 5,
  },
]

const messages: Message[] = [
  {
    id: 1,
    sender: "Dr. Priya Sharma",
    message: "The latest research data shows promising results for our Panchakarma protocol.",
    timestamp: "2 hours ago",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: 2,
    sender: "Dr. Rajesh Kumar",
    message: "I've uploaded the patient progress reports. Please review when you have time.",
    timestamp: "4 hours ago",
    avatar: "/placeholder.svg?height=32&width=32",
  },
]

export default function CollaborationPage() {
  const [selectedCollaboration, setSelectedCollaboration] = useState<Collaboration | null>(null)
  const [isCreatingCollaboration, setIsCreatingCollaboration] = useState(false)
  const [loading, setLoading] = useState(false)
  const [newMessage, setNewMessage] = useState("")

  const handleCreateCollaboration = async (): Promise<void> => {
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setLoading(false)
    setIsCreatingCollaboration(false)
  }

  const handleSendMessage = async (): Promise<void> => {
    if (!newMessage.trim()) return
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setNewMessage("")
    setLoading(false)
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
            <h1 className="text-3xl font-bold text-foreground">Collaboration Hub</h1>
            <p className="text-muted-foreground">Connect and collaborate with healthcare professionals</p>
          </div>
          <Dialog open={isCreatingCollaboration} onOpenChange={setIsCreatingCollaboration}>
            <DialogTrigger asChild>
              <Button className="bg-herbal-gradient hover:opacity-90 text-white">
                <Plus className="h-4 w-4 mr-2" />
                New Collaboration
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Create New Collaboration</DialogTitle>
                <DialogDescription>Start a new collaboration project or discussion</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" placeholder="Enter collaboration title" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Describe the collaboration purpose" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Collaboration Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="research">Research Study</SelectItem>
                      <SelectItem value="case">Case Discussion</SelectItem>
                      <SelectItem value="training">Training Program</SelectItem>
                      <SelectItem value="consultation">Consultation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="participants">Invite Participants</Label>
                  <Input id="participants" placeholder="Enter email addresses separated by commas" />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsCreatingCollaboration(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateCollaboration} disabled={loading}>
                  {loading && <LoadingSpinner className="h-4 w-4 mr-2" />}
                  Create Collaboration
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4"
        >
          {[ 
            { icon: Video, title: "Start Video Call", subtitle: "Quick consultation" },
            { icon: MessageSquare, title: "Send Message", subtitle: "Quick message" },
            { icon: Calendar, title: "Schedule Meeting", subtitle: "Plan ahead" },
            { icon: Share2, title: "Share Files", subtitle: "Upload documents" }
          ].map((item, i) => (
            <Card key={i} className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4 flex items-center space-x-3">
                <div className="p-2 bg-herbal-green/10 rounded-lg">
                  <item.icon className="h-5 w-5 text-herbal-green" />
                </div>
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-muted-foreground">{item.subtitle}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

          {/* Left: Collaboration List */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 space-y-4"
          >
            <div className="flex flex-col md:flex-row items-center justify-between">
              <h2 className="text-xl font-semibold">Active Collaborations</h2>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input placeholder="Search collaborations..." className="pl-10 w-64" />
              </div>
            </div>

            <div className="space-y-4">
              {collaborations.map((collab, index) => (
                <motion.div
                  key={collab.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card
                    className="hover:shadow-lg transition-all duration-300 cursor-pointer"
                    onClick={() => setSelectedCollaboration(collab)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <CardTitle className="text-lg">{collab.title}</CardTitle>
                          <CardDescription>{collab.description}</CardDescription>
                        </div>
                        <Badge variant={collab.status === "Urgent" ? "destructive" : "default"}>{collab.status}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <div className="flex -space-x-2">
                          {collab.participants.slice(0, 3).map((p, i) => (
                            <Avatar key={i} className="h-6 w-6 border-2 border-background">
                              <AvatarImage src={p.avatar} />
                              <AvatarFallback className="text-xs">
                                {p.name.split(" ").map(n => n[0]).join("")}
                              </AvatarFallback>
                            </Avatar>
                          ))}
                          {collab.participants.length > 3 && (
                            <div className="h-6 w-6 rounded-full bg-muted border-2 border-background flex items-center justify-center">
                              <span className="text-xs">+{collab.participants.length - 3}</span>
                            </div>
                          )}
                        </div>
                        <span className="text-sm text-muted-foreground">{collab.participants.length} participants</span>
                      </div>

                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <MessageSquare className="h-4 w-4" />
                            <span>{collab.messages}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Share2 className="h-4 w-4" />
                            <span>{collab.files}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{collab.lastActivity}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Recent Activity */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            <h2 className="text-xl font-semibold">Recent Activity</h2>

            {/* Notifications */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Bell className="h-5 w-5 text-herbal-green" />
                  Notifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {messages.map((msg) => (
                  <div key={msg.id} className="flex space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={msg.avatar} />
                      <AvatarFallback>
                        {msg.sender.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">{msg.sender}</p>
                        <p className="text-xs text-muted-foreground">{msg.timestamp}</p>
                      </div>
                      <p className="text-sm text-muted-foreground">{msg.message}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Message */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Quick Message</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Textarea
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="min-h-[100px]"
                />
                <Button onClick={handleSendMessage} disabled={loading || !newMessage.trim()} className="w-full">
                  {loading && <LoadingSpinner className="h-4 w-4 mr-2" />}
                  Send Message
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Collaboration Details Modal */}
        {selectedCollaboration && (
          <Dialog open={!!selectedCollaboration} onOpenChange={() => setSelectedCollaboration(null)}>
            <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-herbal-green" />
                  {selectedCollaboration.title}
                </DialogTitle>
                <DialogDescription>{selectedCollaboration.description}</DialogDescription>
              </DialogHeader>

              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="messages">Messages</TabsTrigger>
                  <TabsTrigger value="files">Files</TabsTrigger>
                  <TabsTrigger value="participants">Participants</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Status</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Badge variant={selectedCollaboration.status === "Urgent" ? "destructive" : "default"}>
                          {selectedCollaboration.status}
                        </Badge>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Last Activity</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm">{selectedCollaboration.lastActivity}</p>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="messages" className="space-y-4">
                  <div className="space-y-4 max-h-[400px] overflow-y-auto">
                    {messages.map((msg) => (
                      <div key={msg.id} className="flex space-x-3">
                        <Avatar>
                          <AvatarImage src={msg.avatar} />
                          <AvatarFallback>
                            {msg.sender.split(" ").map(n => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between">
                            <p className="font-medium">{msg.sender}</p>
                            <p className="text-xs text-muted-foreground">{msg.timestamp}</p>
                          </div>
                          <p className="text-sm text-muted-foreground">{msg.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Type a message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="flex-1"
                    />
                    <Button onClick={handleSendMessage} disabled={loading || !newMessage.trim()}>
                      {loading ? <LoadingSpinner className="h-4 w-4" /> : "Send"}
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="participants" className="space-y-4">
                  <div className="space-y-3">
                    {selectedCollaboration.participants.map((p, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarImage src={p.avatar} />
                            <AvatarFallback>
                              {p.name.split(" ").map(n => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{p.name}</p>
                            <p className="text-sm text-muted-foreground">{p.role}</p>
                          </div>
                        </div>
                        <Badge variant="outline">Active</Badge>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  )
}

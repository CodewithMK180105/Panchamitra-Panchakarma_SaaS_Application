"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Users,
  Star,
  Plus,
  Search,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
} from "lucide-react"
import { motion } from "framer-motion"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

export default function CentersPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCenter, setSelectedCenter] = useState<any>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isAddCenterDialogOpen, setIsAddCenterDialogOpen] = useState(false);

  const centers = [
    {
      id: 1,
      name: "Ayurvedic Wellness Center",
      location: "Mumbai, Maharashtra",
      address: "123 Wellness Street, Andheri West, Mumbai - 400058",
      phone: "+91 98765 43210",
      email: "info@ayurvedawellness.com",
      rating: 4.8,
      totalPatients: 1250,
      activeTherapists: 8,
      operatingHours: "9:00 AM - 8:00 PM",
      status: "Active",
      specialties: ["Panchakarma", "Abhyanga", "Shirodhara"],
    },
    {
      id: 2,
      name: "Holistic Healing Hub",
      location: "Bangalore, Karnataka",
      address: "456 Healing Avenue, Koramangala, Bangalore - 560034",
      phone: "+91 87654 32109",
      email: "contact@holistichub.com",
      rating: 4.6,
      totalPatients: 890,
      activeTherapists: 6,
      operatingHours: "8:00 AM - 7:00 PM",
      status: "Active",
      specialties: ["Virechana", "Basti", "Nasya"],
    },
    {
      id: 3,
      name: "Traditional Ayurveda Clinic",
      email: "info@traditionalayurveda.com",
      phone: "+91 76543 21098",
      address: "789 Heritage Road, Kochi, Kerala - 682001",
      location: "Kerala, India",
      rating: 4.9,
      totalPatients: 2100,
      activeTherapists: 12,
      operatingHours: "7:00 AM - 9:00 PM",
      status: "Active",
      specialties: ["Panchakarma", "Kizhi", "Pizhichil"],
    },
  ]

  const handleAddCenter = (center: any) => {
    setIsAddCenterDialogOpen(true)
  }
  
  const handleEdit = (center: any) => {
    setSelectedCenter(center)
    setIsEditDialogOpen(true)
  }

  const handleDelete = (center: any) => {
    setSelectedCenter(center)
    setIsDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    console.log("Deleted center:", selectedCenter)
    setIsDeleteDialogOpen(false)
  }

  const filteredCenters = centers.filter(
    (center) =>
      center.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      center.location.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Treatment Centers</h1>
          <p className="text-muted-foreground">Manage your Panchakarma treatment centers</p>
        </div>
        <Button
          onClick={handleAddCenter}
          disabled={isLoading}
          className="cursor-pointer bg-herbal-gradient hover:opacity-90 text-white"

        >
          {/* {isLoading ? (
            <>
              <LoadingSpinner size="sm" className="mr-2" />
              Adding...
            </>
          ) : (
            <>
              <Plus className="mr-2 h-4 w-4" />
              Add Center
            </>
          )} */}
          <Plus className="mr-2 h-4 w-4" />
          Add Center
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search centers by name or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" className="cursor-pointer">
          <Filter className="mr-2 h-4 w-4" />
          Filters
        </Button>
      </div>

      {/* Centers Grid */}
      <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {filteredCenters.map((center, index) => (
          <motion.div
            key={center.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="h-full hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{center.name}</CardTitle>
                    <CardDescription className="flex items-center gap-1 mt-1">
                      <MapPin className="h-3 w-3" />
                      {center.location}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{center.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{center.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{center.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{center.operatingHours}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="font-medium">{center.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{center.totalPatients} patients</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium">Specialties:</p>
                  <div className="flex flex-wrap gap-1">
                    {center.specialties.map((specialty) => (
                      <Badge key={specialty} variant="outline" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 cursor-pointer"
                    onClick={() => handleEdit(center)}
                  >
                    <Edit className="mr-2 h-3 w-3" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:text-red-700 cursor-pointer"
                    onClick={() => handleDelete(center)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* ✏️ Add Center Dialog */}
      <Dialog open={isAddCenterDialogOpen} onOpenChange={setIsAddCenterDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>Add Center</DialogTitle>
            <DialogDescription>
              Add the details of the treatment center. Make sure all fields are accurate.
            </DialogDescription>
          </DialogHeader>
            <div className="space-y-4 py-2 max-h-[50vh] overflow-y-auto pr-1 custom-scrollbar">
              {/* Name */}
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" className="mt-1" />
              </div>

              {/* Email */}
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  className="mt-1"
                  type="email"
                  placeholder="example@center.com"
                />
              </div>

              {/* Phone */}
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" className="mt-1" />
              </div>

              {/* Address */}
              <div>
                <Label htmlFor="email">Address</Label>
                <Input
                  id="address"
                  className="mt-1"
                  type="text"
                  placeholder="eg: 107, Hiranand Building, Gokhale Road."
                />
              </div>

              {/* Location */}
              <div>
                <Label htmlFor="location">Location</Label>
                <Input id="location" className="mt-1" placeholder="Mumbai, Maharashtra" />
              </div>

              {/* Specialization / Services */}
              <div>
                <Label htmlFor="services">Specialization / Services</Label>
                <Input
                  id="services"
                  className="mt-1"
                  placeholder="e.g. Physiotherapy, Dental, Ayurveda"
                />
              </div>

              {/* Operating Hours */}
              <div>
                <Label htmlFor="hours">Operating Hours</Label>
                <Input
                  className="mt-1"
                  id="hours"
                  placeholder="e.g. Mon–Sat: 9 AM – 7 PM"
                />
              </div>

              {/* Description */}
              <div>
                <Label htmlFor="description">Description</Label>
                <textarea
                  id="description"
                  className="mt-1 w-full rounded-md border p-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
                  rows={4}
                  placeholder="Short description about the center..."
                />
              </div>
            </div>

          <DialogFooter>
            <Button className="cursor-pointer" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button className="cursor-pointer bg-herbal-gradient text-white">Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* ✏️ Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>Edit Center</DialogTitle>
            <DialogDescription>
              Update the details of the treatment center. Make sure all fields are accurate.
            </DialogDescription>
          </DialogHeader>

          {selectedCenter && (
            <div className="space-y-4 py-2 max-h-[50vh] overflow-y-auto pr-1 custom-scrollbar">
              {/* Name */}
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" className="mt-1" defaultValue={selectedCenter.name} />
              </div>

              {/* Email */}
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  className="mt-1"
                  type="email"
                  placeholder="example@center.com"
                  defaultValue={selectedCenter.email}
                />
              </div>

              {/* Phone */}
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" className="mt-1" defaultValue={selectedCenter.phone} />
              </div>

              {/* Address */}
              <div>
                <Label htmlFor="email">Address</Label>
                <Input
                  id="address"
                  className="mt-1"
                  type="text"
                  placeholder={selectedCenter.address}
                  defaultValue={selectedCenter.address}
                />
              </div>

              {/* Location */}
              <div>
                <Label htmlFor="location">Location</Label>
                <Input id="location" className="mt-1" defaultValue={selectedCenter.location} />
              </div>        

              {/* Specialization / Services */}
              <div>
                <Label htmlFor="services">Specialization / Services</Label>
                <Input
                  id="services"
                  className="mt-1"
                  placeholder="e.g. Physiotherapy, Dental, Ayurveda"
                  defaultValue={selectedCenter.services}
                />
              </div>

              {/* Operating Hours */}
              <div>
                <Label htmlFor="hours">Operating Hours</Label>
                <Input
                  className="mt-1"
                  id="hours"
                  placeholder="e.g. Mon–Sat: 9 AM – 7 PM"
                  defaultValue={selectedCenter.operatingHours}
                />
              </div>

              {/* Description */}
              <div>
                <Label htmlFor="description">Description</Label>
                <textarea
                  id="description"
                  className="mt-1 w-full rounded-md border p-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
                  rows={4}
                  placeholder="Short description about the center..."
                  defaultValue={selectedCenter.description}
                />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button className="cursor-pointer" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button className="cursor-pointer bg-herbal-gradient text-white">Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 🗑 Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Delete Center</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete <strong>{selectedCenter?.name}</strong>? This action
              cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Yes, Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {filteredCenters.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No centers found matching your search.</p>
        </div>
      )}
    </div>
  )
}

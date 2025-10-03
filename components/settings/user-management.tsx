"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { Users, Plus, Edit, Trash2, Shield, Mail, Phone } from "lucide-react"

export function UserManagement() {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Dr. Meera Sharma",
      email: "meera@clinic.com",
      phone: "+91 98765 43210",
      role: "admin",
      status: "active",
      avatar: "/placeholder.svg?height=40&width=40",
      lastLogin: "2 hours ago",
      permissions: ["manage_patients", "manage_schedule", "view_reports", "manage_users"],
    },
    {
      id: 2,
      name: "Dr. Rajesh Kumar",
      email: "rajesh@clinic.com",
      phone: "+91 98765 43211",
      role: "therapist",
      status: "active",
      avatar: "/placeholder.svg?height=40&width=40",
      lastLogin: "1 day ago",
      permissions: ["manage_patients", "manage_schedule", "view_reports"],
    },
    {
      id: 3,
      name: "Priya Receptionist",
      email: "priya@clinic.com",
      phone: "+91 98765 43212",
      role: "staff",
      status: "active",
      avatar: "/placeholder.svg?height=40&width=40",
      lastLogin: "3 hours ago",
      permissions: ["manage_schedule", "view_patients"],
    },
    {
      id: 4,
      name: "Dr. Amit Patel",
      email: "amit@clinic.com",
      phone: "+91 98765 43213",
      role: "therapist",
      status: "inactive",
      avatar: "/placeholder.svg?height=40&width=40",
      lastLogin: "1 week ago",
      permissions: ["manage_patients", "manage_schedule"],
    },
  ])

  const [showAddUser, setShowAddUser] = useState(false)
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    phone: "",
    role: "staff",
  })

  const roles = [
    { value: "admin", label: "Administrator", color: "bg-red-100 text-red-800" },
    { value: "therapist", label: "Therapist", color: "bg-herbal-green/10 text-herbal-green" },
    { value: "staff", label: "Staff", color: "bg-blue-100 text-blue-800" },
  ]

  const permissions = [
    { id: "manage_patients", label: "Manage Patients", description: "Create, edit, and view patient records" },
    { id: "manage_schedule", label: "Manage Schedule", description: "Create and modify appointments" },
    { id: "view_reports", label: "View Reports", description: "Access analytics and reports" },
    { id: "manage_users", label: "Manage Users", description: "Add, edit, and remove users" },
    { id: "manage_billing", label: "Manage Billing", description: "Handle payments and invoicing" },
    { id: "system_settings", label: "System Settings", description: "Modify system configuration" },
  ]

  const handleAddUser = () => {
    const user = {
      id: users.length + 1,
      ...newUser,
      status: "active",
      avatar: "/placeholder.svg?height=40&width=40",
      lastLogin: "Never",
      permissions: newUser.role === "admin" ? permissions.map((p) => p.id) : ["manage_schedule", "view_patients"],
    }
    setUsers([...users, user])
    setNewUser({ name: "", email: "", phone: "", role: "staff" })
    setShowAddUser(false)
  }

  const toggleUserStatus = (userId: number) => {
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, status: user.status === "active" ? "inactive" : "active" } : user,
      ),
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">User Management</h3>
          <p className="text-sm text-muted-foreground">Manage staff accounts, roles, and permissions</p>
        </div>
        <Dialog open={showAddUser} onOpenChange={setShowAddUser}>
          <DialogTrigger asChild>
            <Button className="bg-herbal-gradient hover:opacity-90 cursor-pointer">
              <Plus className="h-4 w-4 mr-2" />
              Add User
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
              <DialogDescription>Create a new user account for your clinic</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="userName">Full Name</Label>
                <Input
                  id="userName"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  placeholder="Enter full name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="userEmail">Email</Label>
                <Input
                  id="userEmail"
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  placeholder="Enter email address"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="userPhone">Phone</Label>
                <Input
                  id="userPhone"
                  value={newUser.phone}
                  onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                  placeholder="Enter phone number"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="userRole">Role</Label>
                <Select value={newUser.role} onValueChange={(value) => setNewUser({ ...newUser, role: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((role) => (
                      <SelectItem key={role.value} value={role.value}>
                        {role.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end gap-3">
                <Button className="cursor-pointer" variant="outline" onClick={() => setShowAddUser(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddUser} className="bg-herbal-gradient hover:opacity-90 cursor-pointer">
                  Add User
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Users List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Team Members
          </CardTitle>
          <CardDescription>Manage your clinic staff and their access levels</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 grid sm:grid-cols-2 gap-2 lg:flex flex-col">
            {users.map((user) => (
              <div
                key={user.id}
                className="p-4 border rounded-lg flex flex-col gap-4 lg:grid lg:grid-cols-3 lg:items-center lg:gap-6"
              >
                {/* 👇 Mobile layout (<lg) */}
                <div className="flex flex-col items-center text-center gap-3 lg:hidden">
                  {/* Avatar */}
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                    <AvatarFallback>
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>

                  {/* Name */}
                  <h4 className="font-semibold text-lg truncate">{user.name}</h4>

                  {/* Contact info */}
                  <div className="flex flex-col items-center gap-1 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Mail className="h-3 w-3" />
                      <span className="break-all">{user.email}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Phone className="h-3 w-3" />
                      <span>{user.phone}</span>
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="flex flex-wrap justify-center gap-2">
                    <Badge className={roles.find((r) => r.value === user.role)?.color}>
                      {roles.find((r) => r.value === user.role)?.label}
                    </Badge>
                    <Badge variant={user.status === "active" ? "default" : "secondary"}>
                      {user.status}
                    </Badge>
                  </div>

                  {/* Last login */}
                  <span className="text-xs text-muted-foreground">
                    Last login: {user.lastLogin}
                  </span>

                  {/* Actions */}
                  <div className="flex items-center justify-center gap-3 pt-2">
                    <Switch
                      checked={user.status === "active"}
                      onCheckedChange={() => toggleUserStatus(user.id)}
                    />
                    <Button size="icon" variant="ghost" className="rounded-full">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="rounded-full text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* 👇 lg and above — Grid Layout */}
                {/* 1️⃣ Column 1 — Avatar + Name */}
                <div className="hidden lg:flex items-center gap-4">
                  <Avatar className="h-12 w-12 shrink-0">
                    <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                    <AvatarFallback>
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{user.name}</h4>
                    <span className="text-xs text-muted-foreground block">
                      Last login: {user.lastLogin}
                    </span>
                  </div>
                </div>

                {/* 2️⃣ Column 2 — Contact + Role */}
                <div className="hidden lg:flex flex-col gap-1 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Mail className="h-3 w-3" />
                    <span className="break-all">{user.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-3 w-3" />
                    <span>{user.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    <Badge className={roles.find((r) => r.value === user.role)?.color}>
                      {roles.find((r) => r.value === user.role)?.label}
                    </Badge>
                    <Badge variant={user.status === "active" ? "default" : "secondary"}>
                      {user.status}
                    </Badge>
                  </div>
                </div>

                {/* 3️⃣ Column 3 — Actions */}
                <div className="hidden lg:flex items-center justify-end gap-2">
                  <Switch
                    checked={user.status === "active"}
                    onCheckedChange={() => toggleUserStatus(user.id)}
                  />
                  <Button size="sm" variant="ghost">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

            ))}
          </div>
        </CardContent>
      </Card>

      {/* Role Permissions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Role Permissions
          </CardTitle>
          <CardDescription>Configure what each role can access and modify</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {roles.map((role) => (
              <div key={role.value} className="space-y-3">
                <h4 className="font-medium flex items-center gap-2">
                  <Badge className={role.color}>{role.label}</Badge>
                </h4>
                <div className="grid gap-3 lg:grid-cols-2 pl-4">
                  {permissions.map((permission) => (
                    <div key={permission.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div>
                        <div className="font-medium text-sm">{permission.label}</div>
                        <div className="text-xs text-muted-foreground">{permission.description}</div>
                      </div>
                      <Switch
                        checked={
                          role.value === "admin" ||
                          (role.value === "therapist" &&
                            ["manage_patients", "manage_schedule", "view_reports"].includes(permission.id)) ||
                          (role.value === "staff" && ["manage_schedule", "view_patients"].includes(permission.id))
                        }
                        disabled={role.value === "admin"}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

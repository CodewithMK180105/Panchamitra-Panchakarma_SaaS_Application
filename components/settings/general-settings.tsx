"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Building, MapPin, Phone, Mail, Clock, Globe } from "lucide-react"

export function GeneralSettings() {
  const [clinicInfo, setClinicInfo] = useState({
    name: "Ayurveda Wellness Center",
    description: "Traditional Panchakarma treatments with modern facilities",
    address: "123 Wellness Street, Mumbai, Maharashtra 400001",
    phone: "+91 98765 43210",
    email: "info@ayurvedawellness.com",
    website: "www.ayurvedawellness.com",
    timezone: "Asia/Kolkata",
    language: "en",
    currency: "INR",
  })

  const [preferences, setPreferences] = useState({
    defaultSessionDuration: 60,
    bookingWindow: 30,
    cancellationPolicy: 24,
    autoConfirmBookings: true,
    sendReminders: true,
    allowOnlineBooking: true,
    showPricing: true,
  })

  const handleSave = () => {
    console.log("Saving general settings:", { clinicInfo, preferences })
    // Handle save logic
  }

  return (
    <div className="space-y-6">
      {/* Clinic Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="h-5 w-5" />
            Clinic Information
          </CardTitle>
          <CardDescription>Basic information about your clinic</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="clinicName">Clinic Name</Label>
              <Input
                id="clinicName"
                value={clinicInfo.name}
                onChange={(e) => setClinicInfo({ ...clinicInfo, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <div className="relative">
                <Globe className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="website"
                  value={clinicInfo.website}
                  onChange={(e) => setClinicInfo({ ...clinicInfo, website: e.target.value })}
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={clinicInfo.description}
              onChange={(e) => setClinicInfo({ ...clinicInfo, description: e.target.value })}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Textarea
                id="address"
                value={clinicInfo.address}
                onChange={(e) => setClinicInfo({ ...clinicInfo, address: e.target.value })}
                className="pl-10"
                rows={2}
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="phone"
                  value={clinicInfo.phone}
                  onChange={(e) => setClinicInfo({ ...clinicInfo, phone: e.target.value })}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={clinicInfo.email}
                  onChange={(e) => setClinicInfo({ ...clinicInfo, email: e.target.value })}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Regional Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Regional Settings
          </CardTitle>
          <CardDescription>Timezone, language, and currency preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="timezone">Timezone</Label>
              <Select
                value={clinicInfo.timezone}
                onValueChange={(value) => setClinicInfo({ ...clinicInfo, timezone: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Asia/Kolkata">Asia/Kolkata (IST)</SelectItem>
                  <SelectItem value="Asia/Dubai">Asia/Dubai (GST)</SelectItem>
                  <SelectItem value="America/New_York">America/New_York (EST)</SelectItem>
                  <SelectItem value="Europe/London">Europe/London (GMT)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <Select
                value={clinicInfo.language}
                onValueChange={(value) => setClinicInfo({ ...clinicInfo, language: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="hi">Hindi</SelectItem>
                  <SelectItem value="mr">Marathi</SelectItem>
                  <SelectItem value="ta">Tamil</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="currency">Currency</Label>
              <Select
                value={clinicInfo.currency}
                onValueChange={(value) => setClinicInfo({ ...clinicInfo, currency: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="INR">INR (₹)</SelectItem>
                  <SelectItem value="USD">USD ($)</SelectItem>
                  <SelectItem value="EUR">EUR (€)</SelectItem>
                  <SelectItem value="GBP">GBP (£)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Booking Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Booking Preferences
          </CardTitle>
          <CardDescription>Default settings for appointments and bookings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="sessionDuration">Default Session Duration (minutes)</Label>
              <Input
                id="sessionDuration"
                type="number"
                value={preferences.defaultSessionDuration}
                onChange={(e) =>
                  setPreferences({ ...preferences, defaultSessionDuration: Number.parseInt(e.target.value) })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bookingWindow">Booking Window (days)</Label>
              <Input
                id="bookingWindow"
                type="number"
                value={preferences.bookingWindow}
                onChange={(e) => setPreferences({ ...preferences, bookingWindow: Number.parseInt(e.target.value) })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cancellationPolicy">Cancellation Policy (hours)</Label>
              <Input
                id="cancellationPolicy"
                type="number"
                value={preferences.cancellationPolicy}
                onChange={(e) =>
                  setPreferences({ ...preferences, cancellationPolicy: Number.parseInt(e.target.value) })
                }
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Auto-confirm Bookings</Label>
                <p className="text-sm text-muted-foreground">
                  Automatically confirm new bookings without manual review
                </p>
              </div>
              <Switch
                checked={preferences.autoConfirmBookings}
                onCheckedChange={(checked) => setPreferences({ ...preferences, autoConfirmBookings: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Send Reminders</Label>
                <p className="text-sm text-muted-foreground">Send automatic appointment reminders to patients</p>
              </div>
              <Switch
                checked={preferences.sendReminders}
                onCheckedChange={(checked) => setPreferences({ ...preferences, sendReminders: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Allow Online Booking</Label>
                <p className="text-sm text-muted-foreground">Enable patients to book appointments online</p>
              </div>
              <Switch
                checked={preferences.allowOnlineBooking}
                onCheckedChange={(checked) => setPreferences({ ...preferences, allowOnlineBooking: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Show Pricing</Label>
                <p className="text-sm text-muted-foreground">Display treatment prices to patients</p>
              </div>
              <Switch
                checked={preferences.showPricing}
                onCheckedChange={(checked) => setPreferences({ ...preferences, showPricing: checked })}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} className="bg-herbal-gradient hover:opacity-90 cursor-pointer">
          Save Changes
        </Button>
      </div>
    </div>
  )
}

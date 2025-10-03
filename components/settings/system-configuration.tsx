"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Bell, Mail, MessageSquare, Smartphone, Zap, Database, Cloud } from "lucide-react"

export function SystemConfiguration() {
  const [notifications, setNotifications] = useState({
    emailEnabled: true,
    smsEnabled: true,
    pushEnabled: true,
    appointmentReminders: true,
    paymentReminders: true,
    systemAlerts: true,
    marketingEmails: false,
  })

  const [integrations, setIntegrations] = useState({
    emailProvider: "smtp",
    smsProvider: "twilio",
    paymentGateway: "razorpay",
    calendarSync: "google",
  })

  const [systemSettings, setSystemSettings] = useState({
    maintenanceMode: false,
    debugMode: false,
    autoBackup: true,
    backupFrequency: "daily",
    sessionTimeout: 30,
    maxFileSize: 10,
  })

  const [apiConfig, setApiConfig] = useState({
    webhookUrl: "https://your-clinic.com/api/webhooks",
    allowedOrigins: "https://your-domain.com\nhttps://app.your-domain.com",
  })

  const handleSave = () => {
    console.log("Saving system configuration:", { notifications, integrations, systemSettings, apiConfig })
  }

  return (
    <div className="space-y-6">
      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notification Settings
          </CardTitle>
          <CardDescription>Configure how and when notifications are sent</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-4">
              <h4 className="font-medium">Notification Channels</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <Label>Email Notifications</Label>
                  </div>
                  <Switch
                    checked={notifications.emailEnabled}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, emailEnabled: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-muted-foreground" />
                    <Label>SMS Notifications</Label>
                  </div>
                  <Switch
                    checked={notifications.smsEnabled}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, smsEnabled: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Smartphone className="h-4 w-4 text-muted-foreground" />
                    <Label>Push Notifications</Label>
                  </div>
                  <Switch
                    checked={notifications.pushEnabled}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, pushEnabled: checked })}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">Notification Types</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Appointment Reminders</Label>
                  <Switch
                    checked={notifications.appointmentReminders}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, appointmentReminders: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Payment Reminders</Label>
                  <Switch
                    checked={notifications.paymentReminders}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, paymentReminders: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label>System Alerts</Label>
                  <Switch
                    checked={notifications.systemAlerts}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, systemAlerts: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Marketing Emails</Label>
                  <Switch
                    checked={notifications.marketingEmails}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, marketingEmails: checked })}
                  />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Integration Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Integration Settings
          </CardTitle>
          <CardDescription>Configure third-party service integrations</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="emailProvider">Email Provider</Label>
              <Select
                value={integrations.emailProvider}
                onValueChange={(value) => setIntegrations({ ...integrations, emailProvider: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="smtp">SMTP Server</SelectItem>
                  <SelectItem value="sendgrid">SendGrid</SelectItem>
                  <SelectItem value="mailgun">Mailgun</SelectItem>
                  <SelectItem value="ses">Amazon SES</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="smsProvider">SMS Provider</Label>
              <Select
                value={integrations.smsProvider}
                onValueChange={(value) => setIntegrations({ ...integrations, smsProvider: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="twilio">Twilio</SelectItem>
                  <SelectItem value="textlocal">TextLocal</SelectItem>
                  <SelectItem value="msg91">MSG91</SelectItem>
                  <SelectItem value="aws-sns">AWS SNS</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="paymentGateway">Payment Gateway</Label>
              <Select
                value={integrations.paymentGateway}
                onValueChange={(value) => setIntegrations({ ...integrations, paymentGateway: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="razorpay">Razorpay</SelectItem>
                  <SelectItem value="payu">PayU</SelectItem>
                  <SelectItem value="stripe">Stripe</SelectItem>
                  <SelectItem value="paypal">PayPal</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="calendarSync">Calendar Sync</Label>
              <Select
                value={integrations.calendarSync}
                onValueChange={(value) => setIntegrations({ ...integrations, calendarSync: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="google">Google Calendar</SelectItem>
                  <SelectItem value="outlook">Outlook Calendar</SelectItem>
                  <SelectItem value="apple">Apple Calendar</SelectItem>
                  <SelectItem value="none">None</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">Email Service</h4>
                <Badge variant="outline" className="bg-herbal-green/10 text-herbal-green border-herbal-green/20">
                  Connected
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">SMTP server configured and active</p>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">SMS Service</h4>
                <Badge variant="outline" className="bg-herbal-green/10 text-herbal-green border-herbal-green/20">
                  Connected
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">Twilio API integrated successfully</p>
            </div>
            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">Payment Gateway</h4>
                <Badge variant="outline" className="bg-saffron/10 text-saffron border-saffron/20">
                  Setup Required
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">Configure Razorpay credentials</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* System Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            System Settings
          </CardTitle>
          <CardDescription>Advanced system configuration and maintenance</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-4">
              <h4 className="font-medium">System Status</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Maintenance Mode</Label>
                    <p className="text-sm text-muted-foreground">Temporarily disable user access</p>
                  </div>
                  <Switch
                    checked={systemSettings.maintenanceMode}
                    onCheckedChange={(checked) => setSystemSettings({ ...systemSettings, maintenanceMode: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Debug Mode</Label>
                    <p className="text-sm text-muted-foreground">Enable detailed error logging</p>
                  </div>
                  <Switch
                    checked={systemSettings.debugMode}
                    onCheckedChange={(checked) => setSystemSettings({ ...systemSettings, debugMode: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Auto Backup</Label>
                    <p className="text-sm text-muted-foreground">Automatically backup data</p>
                  </div>
                  <Switch
                    checked={systemSettings.autoBackup}
                    onCheckedChange={(checked) => setSystemSettings({ ...systemSettings, autoBackup: checked })}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">Performance Settings</h4>
              <div className="space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                  <Input
                    id="sessionTimeout"
                    type="number"
                    value={systemSettings.sessionTimeout}
                    onChange={(e) =>
                      setSystemSettings({ ...systemSettings, sessionTimeout: Number.parseInt(e.target.value) })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxFileSize">Max File Size (MB)</Label>
                  <Input
                    id="maxFileSize"
                    type="number"
                    value={systemSettings.maxFileSize}
                    onChange={(e) =>
                      setSystemSettings({ ...systemSettings, maxFileSize: Number.parseInt(e.target.value) })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="backupFrequency">Backup Frequency</Label>
                  <Select
                    value={systemSettings.backupFrequency}
                    onValueChange={(value) => setSystemSettings({ ...systemSettings, backupFrequency: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hourly">Hourly</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* API Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Cloud className="h-5 w-5" />
            API Configuration
          </CardTitle>
          <CardDescription>Manage API keys and external service connections</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="apiKey">API Key</Label>
              <div className="flex gap-2">
                <Input id="apiKey" type="password" value="••••••••••••••••••••••••••••••••" readOnly />
                <Button variant="outline" className="cursor-pointer">Regenerate</Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="webhookUrl">Webhook URL</Label>
              <Input
                id="webhookUrl"
                value={apiConfig.webhookUrl}
                onChange={(e) => setApiConfig({ ...apiConfig, webhookUrl: e.target.value })}
                placeholder="Enter webhook URL"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="allowedOrigins">Allowed Origins</Label>
              <Textarea
                id="allowedOrigins"
                value={apiConfig.allowedOrigins}
                onChange={(e) => setApiConfig({ ...apiConfig, allowedOrigins: e.target.value })}
                placeholder="https://your-domain.com&#10;https://app.your-domain.com"
                rows={3}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} className="bg-herbal-gradient hover:opacity-90 cursor-pointer">
          Save Configuration
        </Button>
      </div>
    </div>
  )
}

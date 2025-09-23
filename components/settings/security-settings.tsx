"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Shield, Key, Eye, AlertTriangle, CheckCircle, Clock } from "lucide-react"

export function SecuritySettings() {
  const [passwordSettings, setPasswordSettings] = useState({
    requireStrongPassword: true,
    passwordExpiry: 90,
    preventReuse: 5,
    lockoutAttempts: 5,
    lockoutDuration: 30,
  })

  const [twoFactorAuth, setTwoFactorAuth] = useState({
    enabled: false,
    method: "app",
    backupCodes: false,
  })

  const [sessionSettings, setSessionSettings] = useState({
    sessionTimeout: 30,
    concurrentSessions: 3,
    logoutInactive: true,
  })

  const [auditSettings, setAuditSettings] = useState({
    loginAttempts: true,
    dataChanges: true,
    systemAccess: true,
    retentionDays: 90,
  })

  const securityEvents = [
    {
      type: "login",
      user: "Dr. Meera Sharma",
      action: "Successful login",
      timestamp: "2024-01-10 09:15:23",
      ip: "192.168.1.100",
      status: "success",
    },
    {
      type: "password",
      user: "Dr. Rajesh Kumar",
      action: "Password changed",
      timestamp: "2024-01-09 14:30:12",
      ip: "192.168.1.101",
      status: "success",
    },
    {
      type: "failed_login",
      user: "Unknown",
      action: "Failed login attempt",
      timestamp: "2024-01-09 11:45:33",
      ip: "203.0.113.1",
      status: "warning",
    },
    {
      type: "data_access",
      user: "Priya Receptionist",
      action: "Patient record accessed",
      timestamp: "2024-01-08 16:20:45",
      ip: "192.168.1.102",
      status: "info",
    },
  ]

  const handleEnable2FA = () => {
    setTwoFactorAuth({ ...twoFactorAuth, enabled: true })
  }

  const handleSave = () => {
    console.log("Saving security settings:", { passwordSettings, twoFactorAuth, sessionSettings, auditSettings })
  }

  return (
    <div className="space-y-6">
      {/* Security Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Security Overview
          </CardTitle>
          <CardDescription>Current security status and recommendations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="p-4 bg-herbal-green/10 rounded-lg border border-herbal-green/20">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="h-4 w-4 text-herbal-green" />
                <h4 className="font-medium">Password Policy</h4>
              </div>
              <p className="text-sm text-muted-foreground">Strong password requirements enabled</p>
            </div>
            <div className="p-4 bg-saffron/10 rounded-lg border border-saffron/20">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-saffron" />
                <h4 className="font-medium">Two-Factor Auth</h4>
              </div>
              <p className="text-sm text-muted-foreground">Not enabled - recommended for admin users</p>
            </div>
            <div className="p-4 bg-herbal-green/10 rounded-lg border border-herbal-green/20">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="h-4 w-4 text-herbal-green" />
                <h4 className="font-medium">Audit Logging</h4>
              </div>
              <p className="text-sm text-muted-foreground">All security events are being logged</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Password Policy */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="h-5 w-5" />
            Password Policy
          </CardTitle>
          <CardDescription>Configure password requirements and security</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Require Strong Passwords</Label>
              <p className="text-sm text-muted-foreground">
                Enforce minimum 8 characters with uppercase, lowercase, numbers, and symbols
              </p>
            </div>
            <Switch
              checked={passwordSettings.requireStrongPassword}
              onCheckedChange={(checked) =>
                setPasswordSettings({ ...passwordSettings, requireStrongPassword: checked })
              }
            />
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="passwordExpiry">Password Expiry (days)</Label>
              <Input
                id="passwordExpiry"
                type="number"
                value={passwordSettings.passwordExpiry}
                onChange={(e) =>
                  setPasswordSettings({ ...passwordSettings, passwordExpiry: Number.parseInt(e.target.value) })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="preventReuse">Prevent Password Reuse</Label>
              <Input
                id="preventReuse"
                type="number"
                value={passwordSettings.preventReuse}
                onChange={(e) =>
                  setPasswordSettings({ ...passwordSettings, preventReuse: Number.parseInt(e.target.value) })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lockoutAttempts">Lockout After Attempts</Label>
              <Input
                id="lockoutAttempts"
                type="number"
                value={passwordSettings.lockoutAttempts}
                onChange={(e) =>
                  setPasswordSettings({ ...passwordSettings, lockoutAttempts: Number.parseInt(e.target.value) })
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Two-Factor Authentication */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Two-Factor Authentication
          </CardTitle>
          <CardDescription>Add an extra layer of security to user accounts</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!twoFactorAuth.enabled ? (
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Two-factor authentication is not enabled. We recommend enabling it for all admin users to enhance
                security.
              </AlertDescription>
            </Alert>
          ) : (
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>Two-factor authentication is enabled and protecting your account.</AlertDescription>
            </Alert>
          )}

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Enable Two-Factor Authentication</Label>
              <p className="text-sm text-muted-foreground">Require a second form of authentication for login</p>
            </div>
            <Switch checked={twoFactorAuth.enabled} onCheckedChange={handleEnable2FA} />
          </div>

          {twoFactorAuth.enabled && (
            <div className="space-y-4 p-4 bg-muted rounded-lg">
              <div className="space-y-2">
                <Label>Authentication Method</Label>
                <div className="flex gap-2">
                  <Button
                    variant={twoFactorAuth.method === "app" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTwoFactorAuth({ ...twoFactorAuth, method: "app" })}
                  >
                    Authenticator App
                  </Button>
                  <Button
                    variant={twoFactorAuth.method === "sms" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTwoFactorAuth({ ...twoFactorAuth, method: "sms" })}
                  >
                    SMS
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <Label>Generate Backup Codes</Label>
                <Button variant="outline" size="sm">
                  Generate Codes
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Session Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Session Management
          </CardTitle>
          <CardDescription>Control user session behavior and timeouts</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
              <Input
                id="sessionTimeout"
                type="number"
                value={sessionSettings.sessionTimeout}
                onChange={(e) =>
                  setSessionSettings({ ...sessionSettings, sessionTimeout: Number.parseInt(e.target.value) })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="concurrentSessions">Max Concurrent Sessions</Label>
              <Input
                id="concurrentSessions"
                type="number"
                value={sessionSettings.concurrentSessions}
                onChange={(e) =>
                  setSessionSettings({ ...sessionSettings, concurrentSessions: Number.parseInt(e.target.value) })
                }
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Auto-logout Inactive Users</Label>
              <p className="text-sm text-muted-foreground">
                Automatically log out users after the session timeout period
              </p>
            </div>
            <Switch
              checked={sessionSettings.logoutInactive}
              onCheckedChange={(checked) => setSessionSettings({ ...sessionSettings, logoutInactive: checked })}
            />
          </div>
        </CardContent>
      </Card>

      {/* Audit & Monitoring */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Audit & Monitoring
          </CardTitle>
          <CardDescription>Configure security event logging and monitoring</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <h4 className="font-medium">Log Events</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-sm">Login Attempts</Label>
                  <Switch
                    checked={auditSettings.loginAttempts}
                    onCheckedChange={(checked) => setAuditSettings({ ...auditSettings, loginAttempts: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-sm">Data Changes</Label>
                  <Switch
                    checked={auditSettings.dataChanges}
                    onCheckedChange={(checked) => setAuditSettings({ ...auditSettings, dataChanges: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-sm">System Access</Label>
                  <Switch
                    checked={auditSettings.systemAccess}
                    onCheckedChange={(checked) => setAuditSettings({ ...auditSettings, systemAccess: checked })}
                  />
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium">Retention</h4>
              <div className="space-y-2">
                <Label htmlFor="retentionDays">Log Retention (days)</Label>
                <Input
                  id="retentionDays"
                  type="number"
                  value={auditSettings.retentionDays}
                  onChange={(e) =>
                    setAuditSettings({ ...auditSettings, retentionDays: Number.parseInt(e.target.value) })
                  }
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Security Events */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Security Events</CardTitle>
          <CardDescription>Latest security-related activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {securityEvents.map((event, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      event.status === "success"
                        ? "bg-herbal-green"
                        : event.status === "warning"
                          ? "bg-saffron"
                          : "bg-blue-500"
                    }`}
                  />
                  <div>
                    <div className="font-medium text-sm">{event.action}</div>
                    <div className="text-xs text-muted-foreground">
                      {event.user} • {event.timestamp} • {event.ip}
                    </div>
                  </div>
                </div>
                <Badge
                  variant="outline"
                  className={
                    event.status === "success"
                      ? "bg-herbal-green/10 text-herbal-green border-herbal-green/20"
                      : event.status === "warning"
                        ? "bg-saffron/10 text-saffron border-saffron/20"
                        : "bg-blue-100 text-blue-800 border-blue-200"
                  }
                >
                  {event.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} className="bg-herbal-gradient hover:opacity-90">
          Save Security Settings
        </Button>
      </div>
    </div>
  )
}

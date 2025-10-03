"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Database, Download, Upload, Shield, Clock, HardDrive } from "lucide-react"

export function DataManagement() {
  const [backupSettings, setBackupSettings] = useState({
    autoBackup: true,
    frequency: "daily",
    retention: 30,
    includeFiles: true,
    compression: true,
  })

  const [storageInfo, setStorageInfo] = useState({
    used: 2.4,
    total: 10,
    patients: 1.2,
    files: 0.8,
    system: 0.4,
  })

  const [dataRetention, setDataRetention] = useState({
    patientRecords: 7,
    auditLogs: 2,
    backups: 6,
    tempFiles: 30,
  })

  const backupHistory = [
    {
      id: "backup-001",
      date: "2024-01-10 02:00:00",
      type: "Automatic",
      size: "2.1 GB",
      status: "completed",
      duration: "12 min",
    },
    {
      id: "backup-002",
      date: "2024-01-09 02:00:00",
      type: "Automatic",
      size: "2.0 GB",
      status: "completed",
      duration: "11 min",
    },
    {
      id: "backup-003",
      date: "2024-01-08 14:30:00",
      type: "Manual",
      size: "2.0 GB",
      status: "completed",
      duration: "10 min",
    },
    {
      id: "backup-004",
      date: "2024-01-08 02:00:00",
      type: "Automatic",
      size: "1.9 GB",
      status: "failed",
      duration: "5 min",
    },
  ]

  const handleManualBackup = () => {
    console.log("Starting manual backup...")
  }

  const handleRestore = (backupId: string) => {
    console.log("Restoring from backup:", backupId)
  }

  const handleExportData = () => {
    console.log("Exporting data...")
  }

  const handleSave = () => {
    console.log("Saving data management settings:", { backupSettings, dataRetention })
  }

  return (
    <div className="space-y-6">
      {/* Storage Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HardDrive className="h-5 w-5" />
            Storage Overview
          </CardTitle>
          <CardDescription>Current storage usage and capacity</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Storage Used</span>
              <span>
                {storageInfo.used}GB / {storageInfo.total}GB
              </span>
            </div>
            <Progress value={(storageInfo.used / storageInfo.total) * 100} className="h-3" />
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="p-3 bg-herbal-green/10 rounded-lg border border-herbal-green/20">
              <div className="text-sm text-muted-foreground">Patient Records</div>
              <div className="text-lg font-semibold">{storageInfo.patients}GB</div>
              <div className="text-xs text-muted-foreground">
                {Math.round((storageInfo.patients / storageInfo.used) * 100)}% of total
              </div>
            </div>
            <div className="p-3 bg-saffron/10 rounded-lg border border-saffron/20">
              <div className="text-sm text-muted-foreground">Files & Media</div>
              <div className="text-lg font-semibold">{storageInfo.files}GB</div>
              <div className="text-xs text-muted-foreground">
                {Math.round((storageInfo.files / storageInfo.used) * 100)}% of total
              </div>
            </div>
            <div className="p-3 bg-teal/10 rounded-lg border border-teal/20">
              <div className="text-sm text-muted-foreground">System Data</div>
              <div className="text-lg font-semibold">{storageInfo.system}GB</div>
              <div className="text-xs text-muted-foreground">
                {Math.round((storageInfo.system / storageInfo.used) * 100)}% of total
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Backup Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Backup Settings
          </CardTitle>
          <CardDescription>Configure automatic backups and data protection</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Automatic Backups</Label>
              <p className="text-sm text-muted-foreground">Automatically backup your data at scheduled intervals</p>
            </div>
            <Switch
              checked={backupSettings.autoBackup}
              onCheckedChange={(checked) => setBackupSettings({ ...backupSettings, autoBackup: checked })}
            />
          </div>

          {backupSettings.autoBackup && (
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="frequency">Backup Frequency</Label>
                <Select
                  value={backupSettings.frequency}
                  onValueChange={(value) => setBackupSettings({ ...backupSettings, frequency: value })}
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
              <div className="space-y-2">
                <Label htmlFor="retention">Retention Period (days)</Label>
                <Input
                  id="retention"
                  type="number"
                  value={backupSettings.retention}
                  onChange={(e) => setBackupSettings({ ...backupSettings, retention: Number.parseInt(e.target.value) })}
                />
              </div>
              <div className="space-y-2">
                <Label>Backup Options</Label>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Include Files</Label>
                    <Switch
                      checked={backupSettings.includeFiles}
                      onCheckedChange={(checked) => setBackupSettings({ ...backupSettings, includeFiles: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Compression</Label>
                    <Switch
                      checked={backupSettings.compression}
                      onCheckedChange={(checked) => setBackupSettings({ ...backupSettings, compression: checked })}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3">
            <Button onClick={handleManualBackup} className="bg-herbal-gradient hover:opacity-90 cursor-pointer">
              <Database className="h-4 w-4 mr-2" />
              Create Manual Backup
            </Button>
            <Button className="cursor-pointer" variant="outline" onClick={handleExportData}>
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Backup History */}
      <Card>
        <CardHeader>
          <CardTitle>Backup History</CardTitle>
          <CardDescription>Recent backup operations and their status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {backupHistory.map((backup) => (
              <div key={backup.id} className="flex flex-col md:flex-row items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      backup.status === "completed" ? "bg-herbal-green" : "bg-red-500"
                    }`}
                  />
                  <div>
                    <div className="font-medium text-sm">{backup.id}</div>
                    <div className="text-xs text-muted-foreground">
                      {backup.date} • {backup.type} • {backup.size} • {backup.duration}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className={
                      backup.status === "completed"
                        ? "bg-herbal-green/10 text-herbal-green border-herbal-green/20"
                        : "bg-red-100 text-red-600 border-red-200"
                    }
                  >
                    {backup.status}
                  </Badge>
                  {backup.status === "completed" && (
                    <Button className="cursor-pointer" size="sm" variant="ghost" onClick={() => handleRestore(backup.id)}>
                      <Upload className="h-3 w-3 mr-1" />
                      Restore
                    </Button>
                  )}
                  <Button className="cursor-pointer" size="sm" variant="ghost">
                    <Download className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Data Retention */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Data Retention Policy
          </CardTitle>
          <CardDescription>Configure how long different types of data are kept</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="patientRecords">Patient Records (years)</Label>
              <Input
                id="patientRecords"
                type="number"
                value={dataRetention.patientRecords}
                onChange={(e) =>
                  setDataRetention({ ...dataRetention, patientRecords: Number.parseInt(e.target.value) })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="auditLogs">Audit Logs (years)</Label>
              <Input
                id="auditLogs"
                type="number"
                value={dataRetention.auditLogs}
                onChange={(e) => setDataRetention({ ...dataRetention, auditLogs: Number.parseInt(e.target.value) })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="backups">Backup Files (months)</Label>
              <Input
                id="backups"
                type="number"
                value={dataRetention.backups}
                onChange={(e) => setDataRetention({ ...dataRetention, backups: Number.parseInt(e.target.value) })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tempFiles">Temporary Files (days)</Label>
              <Input
                id="tempFiles"
                type="number"
                value={dataRetention.tempFiles}
                onChange={(e) => setDataRetention({ ...dataRetention, tempFiles: Number.parseInt(e.target.value) })}
              />
            </div>
          </div>

          <Alert>
            <Shield className="h-4 w-4" />
            <AlertDescription>
              All data operations are logged and auditable. Ensure you have proper authorization before performing
              sensitive operations.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Data Privacy & Compliance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Data Privacy & Compliance
          </CardTitle>
          <CardDescription>Manage data privacy settings and compliance requirements</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">GDPR Compliance</h4>
              <p className="text-sm text-muted-foreground mb-3">Tools for managing data subject rights and consent</p>
              <div className="space-y-2">
                <Button size="sm" variant="outline" className="w-full bg-transparent cursor-pointer">
                  Export Patient Data
                </Button>
                <Button size="sm" variant="outline" className="w-full bg-transparent cursor-pointer">
                  Delete Patient Data
                </Button>
              </div>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Data Anonymization</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Remove personally identifiable information from old records
              </p>
              <div className="space-y-2">
                <Button size="sm" variant="outline" className="w-full bg-transparent cursor-pointer">
                  Anonymize Old Records
                </Button>
                <Button size="sm" variant="outline" className="w-full bg-transparent cursor-pointer">
                  View Anonymization Log
                </Button>
              </div>
            </div>
          </div>

          <Alert>
            <Shield className="h-4 w-4" />
            <AlertDescription>
              All data operations are logged and auditable. Ensure you have proper authorization before performing
              sensitive operations.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} className="bg-herbal-gradient hover:opacity-90 cursor-pointer">
          Save Data Management Settings
        </Button>
      </div>
    </div>
  )
}

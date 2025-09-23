"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Plus, Calendar, Users, MapPin, MoreHorizontal, ArrowRight, Pause, Play } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { Session } from "@/app/(app)/scheduler/page"

interface SchedulerToolbarProps {
  selectedSessions: Session[]
  onBulkAction: (action: string, sessionIds: string[]) => void
  onAutoGenerate: () => void
}

export function SchedulerToolbar({ selectedSessions, onBulkAction, onAutoGenerate }: SchedulerToolbarProps) {
  const selectedIds = selectedSessions.map((s) => s.id)

  return (
    <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg border">
      <div className="flex items-center gap-4">
        {/* Create Actions */}
        <div className="flex items-center gap-2">
          <Button className="bg-herbal-gradient hover:opacity-90" onClick={onAutoGenerate}>
            <Plus className="mr-2 h-4 w-4" />
            Auto-Generate Plan
          </Button>
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            New Session
          </Button>
        </div>

        <Separator orientation="vertical" className="h-6" />

        {/* Assignment Actions */}
        <div className="flex items-center gap-2">
          <Select>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Assign Therapist" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="dr-meera">Dr. Meera</SelectItem>
              <SelectItem value="dr-anand">Dr. Anand</SelectItem>
              <SelectItem value="dr-kavya">Dr. Kavya</SelectItem>
              <SelectItem value="dr-priya">Dr. Priya</SelectItem>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Assign Room" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="room-1">Room 1</SelectItem>
              <SelectItem value="room-2">Room 2</SelectItem>
              <SelectItem value="room-3">Room 3</SelectItem>
              <SelectItem value="room-4">Room 4</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Selection Info */}
        {selectedSessions.length > 0 && (
          <>
            <Badge variant="secondary">{selectedSessions.length} selected</Badge>
            <Separator orientation="vertical" className="h-6" />
          </>
        )}

        {/* Bulk Actions */}
        {selectedSessions.length > 0 && (
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => onBulkAction("shift", selectedIds)}>
              <ArrowRight className="mr-2 h-4 w-4" />
              Shift Days
            </Button>
            <Button variant="outline" size="sm" onClick={() => onBulkAction("pause", selectedIds)}>
              <Pause className="mr-2 h-4 w-4" />
              Pause Plan
            </Button>
            <Button variant="outline" size="sm" onClick={() => onBulkAction("resume", selectedIds)}>
              <Play className="mr-2 h-4 w-4" />
              Resume Plan
            </Button>
          </div>
        )}

        {/* More Actions */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Schedule Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Calendar className="mr-2 h-4 w-4" />
              Export Schedule
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Users className="mr-2 h-4 w-4" />
              Resource Report
            </DropdownMenuItem>
            <DropdownMenuItem>
              <MapPin className="mr-2 h-4 w-4" />
              Room Utilization
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Import Sessions</DropdownMenuItem>
            <DropdownMenuItem>Batch Operations</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

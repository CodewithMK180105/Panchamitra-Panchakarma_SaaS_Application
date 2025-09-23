"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Star, ThumbsUp, ThumbsDown, Heart } from "lucide-react"

interface SessionFeedbackModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SessionFeedbackModal({ open, onOpenChange }: SessionFeedbackModalProps) {
  const [rating, setRating] = useState(0)
  const [feedback, setFeedback] = useState("")
  const [therapistRating, setTherapistRating] = useState(0)
  const [wouldRecommend, setWouldRecommend] = useState<boolean | null>(null)

  const handleSubmit = () => {
    // Handle feedback submission
    console.log("Feedback:", { rating, feedback, therapistRating, wouldRecommend })
    onOpenChange(false)
    // Reset form
    setRating(0)
    setFeedback("")
    setTherapistRating(0)
    setWouldRecommend(null)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-saffron" />
            Session Feedback
          </DialogTitle>
          <DialogDescription>Help us improve by sharing your experience with today's session</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Overall Rating */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Overall Session Rating</CardTitle>
              <CardDescription>How would you rate today's session?</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button key={star} onClick={() => setRating(star)} className="transition-colors">
                    <Star
                      className={`h-8 w-8 ${
                        star <= rating ? "fill-saffron text-saffron" : "text-muted-foreground hover:text-saffron"
                      }`}
                    />
                  </button>
                ))}
              </div>
              {rating > 0 && (
                <p className="text-center text-sm text-muted-foreground mt-2">
                  {rating === 1 && "Poor"}
                  {rating === 2 && "Fair"}
                  {rating === 3 && "Good"}
                  {rating === 4 && "Very Good"}
                  {rating === 5 && "Excellent"}
                </p>
              )}
            </CardContent>
          </Card>

          {/* Therapist Rating */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Therapist Performance</CardTitle>
              <CardDescription>How would you rate your therapist today?</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button key={star} onClick={() => setTherapistRating(star)} className="transition-colors">
                    <Star
                      className={`h-6 w-6 ${
                        star <= therapistRating
                          ? "fill-herbal-green text-herbal-green"
                          : "text-muted-foreground hover:text-herbal-green"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recommendation */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Would you recommend this treatment?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={() => setWouldRecommend(true)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                    wouldRecommend === true
                      ? "bg-herbal-green text-white border-herbal-green"
                      : "border-muted-foreground/20 hover:border-herbal-green"
                  }`}
                >
                  <ThumbsUp className="h-4 w-4" />
                  Yes
                </button>
                <button
                  onClick={() => setWouldRecommend(false)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                    wouldRecommend === false
                      ? "bg-red-500 text-white border-red-500"
                      : "border-muted-foreground/20 hover:border-red-500"
                  }`}
                >
                  <ThumbsDown className="h-4 w-4" />
                  No
                </button>
              </div>
            </CardContent>
          </Card>

          {/* Written Feedback */}
          <div className="space-y-2">
            <Label htmlFor="feedback">Additional Comments</Label>
            <Textarea
              id="feedback"
              placeholder="Share your thoughts about the session, therapist, or any suggestions for improvement..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              rows={4}
            />
          </div>

          {/* Submit */}
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Skip
            </Button>
            <Button onClick={handleSubmit} disabled={rating === 0} className="bg-herbal-gradient hover:opacity-90">
              <Heart className="h-4 w-4 mr-2" />
              Submit Feedback
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

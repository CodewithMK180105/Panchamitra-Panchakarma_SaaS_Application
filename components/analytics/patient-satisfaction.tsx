"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Star, MessageCircle, ThumbsUp, TrendingUp } from "lucide-react"

interface PatientSatisfactionProps {
  dateRange: string
  center: string
}

export function PatientSatisfaction({ dateRange, center }: PatientSatisfactionProps) {
  const satisfactionOverview = {
    averageRating: 4.8,
    totalReviews: 1247,
    responseRate: 89,
    npsScore: 72,
  }

  const ratingDistribution = [
    { rating: "5 Stars", count: 856, percentage: 69, color: "#2FA27E" },
    { rating: "4 Stars", count: 248, percentage: 20, color: "#8ECFBB" },
    { rating: "3 Stars", count: 87, percentage: 7, color: "#F4A261" },
    { rating: "2 Stars", count: 31, percentage: 2, color: "#E76F51" },
    { rating: "1 Star", count: 25, percentage: 2, color: "#D62828" },
  ]

  const satisfactionTrends = [
    { month: "Aug", rating: 4.6, reviews: 98 },
    { month: "Sep", rating: 4.7, reviews: 112 },
    { month: "Oct", rating: 4.7, reviews: 125 },
    { month: "Nov", rating: 4.8, reviews: 134 },
    { month: "Dec", rating: 4.8, reviews: 142 },
  ]

  const feedbackCategories = [
    { category: "Treatment Effectiveness", positive: 92, negative: 8, neutral: 0 },
    { category: "Therapist Professionalism", positive: 95, negative: 3, neutral: 2 },
    { category: "Facility Cleanliness", positive: 88, negative: 7, neutral: 5 },
    { category: "Scheduling Convenience", positive: 82, negative: 12, neutral: 6 },
    { category: "Communication", positive: 87, negative: 8, neutral: 5 },
    { category: "Value for Money", positive: 79, negative: 15, neutral: 6 },
  ]

  const recentFeedback = [
    {
      patient: "Priya S.",
      rating: 5,
      comment: "Excellent Virechana treatment. Dr. Meera was very professional and caring.",
      date: "2 days ago",
      treatment: "Virechana",
    },
    {
      patient: "Rajesh K.",
      rating: 5,
      comment: "Amazing experience with Basti therapy. Felt completely rejuvenated.",
      date: "3 days ago",
      treatment: "Basti",
    },
    {
      patient: "Anita M.",
      rating: 4,
      comment: "Good treatment overall. Would appreciate more flexible scheduling options.",
      date: "5 days ago",
      treatment: "Abhyanga",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Satisfaction Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
            <Star className="h-4 w-4 text-saffron" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{satisfactionOverview.averageRating}/5</div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 text-herbal-green" />
              <span className="text-herbal-green">+0.2</span>
              <span>from last period</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reviews</CardTitle>
            <MessageCircle className="h-4 w-4 text-herbal-green" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{satisfactionOverview.totalReviews.toLocaleString()}</div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 text-herbal-green" />
              <span className="text-herbal-green">+12%</span>
              <span>from last period</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Response Rate</CardTitle>
            <ThumbsUp className="h-4 w-4 text-teal" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{satisfactionOverview.responseRate}%</div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 text-herbal-green" />
              <span className="text-herbal-green">+5%</span>
              <span>from last period</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">NPS Score</CardTitle>
            <Star className="h-4 w-4 text-herbal-green" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{satisfactionOverview.npsScore}</div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 text-herbal-green" />
              <span className="text-herbal-green">+8</span>
              <span>from last period</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Rating Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Rating Distribution</CardTitle>
            <CardDescription>Breakdown of patient ratings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {ratingDistribution.map((item) => (
                <div key={item.rating} className="flex items-center gap-3">
                  <div className="w-16 text-sm">{item.rating}</div>
                  <div className="flex-1">
                    <Progress value={item.percentage} className="h-2" />
                  </div>
                  <div className="w-12 text-sm text-right">{item.count}</div>
                  <div className="w-8 text-xs text-muted-foreground">{item.percentage}%</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Satisfaction Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Satisfaction Trends</CardTitle>
            <CardDescription>Rating trends over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={satisfactionTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={[4.0, 5.0]} />
                <Tooltip />
                <Line type="monotone" dataKey="rating" stroke="#2FA27E" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Feedback Categories */}
      <Card>
        <CardHeader>
          <CardTitle>Feedback by Category</CardTitle>
          <CardDescription>Patient sentiment across different aspects</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {feedbackCategories.map((category) => (
              <div key={category.category} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{category.category}</span>
                  <Badge
                    variant="outline"
                    className={
                      category.positive >= 90
                        ? "bg-herbal-green/10 text-herbal-green border-herbal-green/20"
                        : category.positive >= 80
                          ? "bg-saffron/10 text-saffron border-saffron/20"
                          : "bg-red-100 text-red-600 border-red-200"
                    }
                  >
                    {category.positive}% positive
                  </Badge>
                </div>
                <div className="flex h-2 rounded-full overflow-hidden">
                  <div className="bg-herbal-green" style={{ width: `${category.positive}%` }} />
                  <div className="bg-muted" style={{ width: `${category.neutral}%` }} />
                  <div className="bg-red-400" style={{ width: `${category.negative}%` }} />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{category.positive}% positive</span>
                  <span>{category.neutral}% neutral</span>
                  <span>{category.negative}% negative</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Feedback */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Patient Feedback</CardTitle>
          <CardDescription>Latest reviews and comments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentFeedback.map((feedback, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{feedback.patient}</span>
                    <Badge variant="outline" className="text-xs">
                      {feedback.treatment}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 ${
                          i < feedback.rating ? "fill-saffron text-saffron" : "text-muted-foreground"
                        }`}
                      />
                    ))}
                    <span className="text-xs text-muted-foreground ml-2">{feedback.date}</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{feedback.comment}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

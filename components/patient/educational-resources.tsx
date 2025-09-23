"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Play, Download, ExternalLink, Clock } from "lucide-react"

export function EducationalResources() {
  const resources = [
    {
      type: "article",
      title: "Understanding Virechana: The Detoxification Process",
      description: "Learn about the ancient Ayurvedic cleansing therapy and what to expect during treatment.",
      duration: "5 min read",
      category: "Treatment Guide",
      featured: true,
    },
    {
      type: "video",
      title: "Pre-Treatment Preparation Guidelines",
      description: "Essential steps to prepare your body and mind for Panchakarma therapy.",
      duration: "12 min",
      category: "Preparation",
    },
    {
      type: "pdf",
      title: "Dietary Guidelines During Treatment",
      description: "Comprehensive nutrition guide for optimal healing during your therapy.",
      duration: "Download",
      category: "Nutrition",
    },
    {
      type: "article",
      title: "Post-Treatment Care and Recovery",
      description: "How to maintain the benefits of your treatment and continue healing at home.",
      duration: "7 min read",
      category: "Recovery",
    },
    {
      type: "video",
      title: "Breathing Exercises for Relaxation",
      description: "Simple pranayama techniques to enhance your treatment experience.",
      duration: "8 min",
      category: "Wellness",
    },
    {
      type: "article",
      title: "Understanding Your Body's Detox Signals",
      description: "Recognize normal detoxification symptoms and when to contact your practitioner.",
      duration: "6 min read",
      category: "Health Education",
    },
  ]

  const categories = ["All", "Treatment Guide", "Preparation", "Nutrition", "Recovery", "Wellness", "Health Education"]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Educational Resources
          </CardTitle>
          <CardDescription>Deepen your understanding of Ayurveda and your healing journey</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-6">
            {categories.map((category) => (
              <Button
                key={category}
                variant={category === "All" ? "default" : "outline"}
                size="sm"
                className={category === "All" ? "bg-herbal-gradient hover:opacity-90" : ""}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Resources Grid */}
          <div className="grid gap-4 md:grid-cols-2">
            {resources.map((resource, index) => (
              <Card
                key={index}
                className={`cursor-pointer hover:shadow-md transition-shadow ${
                  resource.featured ? "ring-2 ring-herbal-green/20 bg-herbal-green/5" : ""
                }`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      {resource.type === "article" && <BookOpen className="h-4 w-4 text-herbal-green" />}
                      {resource.type === "video" && <Play className="h-4 w-4 text-saffron" />}
                      {resource.type === "pdf" && <Download className="h-4 w-4 text-teal" />}
                      <Badge variant="outline" className="text-xs">
                        {resource.category}
                      </Badge>
                    </div>
                    {resource.featured && <Badge className="bg-herbal-gradient text-white text-xs">Featured</Badge>}
                  </div>
                  <CardTitle className="text-lg leading-tight">{resource.title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardDescription className="mb-3">{resource.description}</CardDescription>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {resource.duration}
                    </div>
                    <Button size="sm" variant="ghost" className="h-8 px-2">
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Tips */}
      <Card>
        <CardHeader>
          <CardTitle>Daily Wellness Tips</CardTitle>
          <CardDescription>Simple practices to enhance your healing journey</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-3 bg-herbal-green/10 rounded-lg border border-herbal-green/20">
              <h4 className="font-medium text-sm mb-1">Morning Routine</h4>
              <p className="text-sm text-muted-foreground">
                Start your day with warm water and lemon to support digestion and detoxification.
              </p>
            </div>
            <div className="p-3 bg-saffron/10 rounded-lg border border-saffron/20">
              <h4 className="font-medium text-sm mb-1">Mindful Eating</h4>
              <p className="text-sm text-muted-foreground">
                Eat slowly and mindfully, focusing on the taste, texture, and nourishment of your food.
              </p>
            </div>
            <div className="p-3 bg-teal/10 rounded-lg border border-teal/20">
              <h4 className="font-medium text-sm mb-1">Evening Wind-down</h4>
              <p className="text-sm text-muted-foreground">
                Practice gentle breathing exercises before bed to promote restful sleep and recovery.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

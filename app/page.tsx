"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MarketingNavbar } from "@/components/marketing-navbar"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import {
  Leaf,
  Calendar,
  Users,
  BarChart3,
  Shield,
  Zap,
  Star,
  ArrowRight,
  Play,
  Award,
  Clock,
  Heart,
  Brain,
  Sparkles,
} from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(false)
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleGetStarted = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLoading(false)
    router.push("/auth/register")
  }

  const handleViewDemo = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
    router.push("/dashboard")
  }

  const handleContactSales = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 800))
    setIsLoading(false)
    router.push("/contact")
  }

  const features = [
    {
      icon: Calendar,
      title: "Smart Scheduling",
      description: "Intelligent treatment planning with drag-and-drop calendar and automated protocol generation",
      color: "text-blue-500",
    },
    {
      icon: Users,
      title: "Patient Management",
      description: "Complete patient profiles with treatment history, progress tracking, and personalized care plans",
      color: "text-green-500",
    },
    {
      icon: BarChart3,
      title: "Analytics & Insights",
      description: "Comprehensive reporting on treatment outcomes, patient satisfaction, and clinic performance",
      color: "text-purple-500",
    },
    {
      icon: Shield,
      title: "Secure & Compliant",
      description: "HIPAA-compliant data protection with role-based access control and audit trails",
      color: "text-red-500",
    },
    {
      icon: Zap,
      title: "Real-time Tracking",
      description: "Live session monitoring, automated notifications, and instant feedback collection",
      color: "text-yellow-500",
    },
    {
      icon: Leaf,
      title: "Protocol Library",
      description: "Standardized Panchakarma protocols with customizable templates and evidence-based practices",
      color: "text-herbal-green",
    },
  ]

  const testimonials = [
    {
      name: "Dr. Priya Sharma",
      role: "Ayurvedic Practitioner",
      content:
        "This platform has revolutionized how I manage my Panchakarma treatments. The automated scheduling and patient tracking save me hours every week.",
      rating: 5,
      avatar: "/indian-doctor-woman.jpg",
    },
    {
      name: "Dr. Rajesh Kumar",
      role: "Wellness Center Director",
      content:
        "The analytics and reporting features help us track treatment outcomes and improve our protocols. Highly recommended for any Ayurvedic practice.",
      rating: 5,
      avatar: "/indian-doctor-man.jpg",
    },
    {
      name: "Dr. Meera Patel",
      role: "Panchakarma Specialist",
      content:
        "Patient feedback collection and progress tracking have never been easier. My patients love the mobile-friendly interface.",
      rating: 5,
      avatar: "/indian-doctor-woman-2.jpg",
    },
  ]

  const stats = [
    { number: "500+", label: "Practitioners" },
    { number: "10K+", label: "Patients Treated" },
    { number: "95%", label: "Satisfaction Rate" },
    { number: "24/7", label: "Support" },
  ]

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-herbal-green/5">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <MarketingNavbar />

      {/* Hero Section with Enhanced Gradients */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-muted/20 to-herbal-green/5">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-12">
          <div className="h-48 w-48 md:h-72 md:w-72 rounded-full bg-herbal-gradient opacity-20 blur-3xl" />
        </div>
        <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12">
          <div className="h-48 w-48 md:h-72 md:w-72 rounded-full bg-gradient-to-r from-teal-400 to-saffron-400 opacity-20 blur-3xl" />
        </div>

        <div className="container relative mx-auto px-4 py-16 sm:py-20 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mx-auto max-w-4xl text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-6 sm:mb-8 flex justify-center"
            >
              <Badge className="bg-herbal-gradient text-white px-4 sm:px-6 py-2 text-xs sm:text-sm font-medium">
                <Leaf className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                Panchakarma Management System
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mb-4 sm:mb-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-balance leading-tight"
            >
              Modern Ayurvedic Treatment
              <span className="block bg-herbal-gradient bg-clip-text text-transparent font-extrabold"> Platform</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-6 sm:mb-8 text-base sm:text-lg lg:text-xl text-muted-foreground text-pretty max-w-2xl mx-auto px-4 sm:px-0"
            >
              Streamline your Panchakarma practice with our comprehensive SaaS platform. Manage patients, schedule
              treatments, track progress, and analyze outcomes—all in one place.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-col gap-3 sm:gap-4 sm:flex-row sm:justify-center px-4 sm:px-0"
            >
              <Button
                size="lg"
                className="bg-herbal-gradient hover:opacity-90 text-white shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto"
                onClick={handleGetStarted}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <LoadingSpinner size="sm" className="mr-2" />
                    Starting...
                  </>
                ) : (
                  <>
                    Start Free Trial
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="shadow-lg hover:shadow-xl transition-all duration-300 bg-transparent w-full sm:w-auto"
                onClick={handleViewDemo}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <LoadingSpinner size="sm" className="mr-2" />
                    Loading...
                  </>
                ) : (
                  <>
                    <Play className="mr-2 h-4 w-4" />
                    View Demo
                  </>
                )}
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-12 sm:mt-16 grid grid-cols-2 gap-6 sm:gap-8 sm:grid-cols-4"
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-herbal-green">{stat.number}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 sm:py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-12 sm:mb-16 text-center"
          >
            <Badge variant="outline" className="mb-4">
              Features
            </Badge>
            <h2 className="mb-4 text-2xl sm:text-3xl lg:text-4xl font-bold px-4 sm:px-0">
              Everything you need to manage Panchakarma treatments
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4 sm:px-0">
              Comprehensive tools designed specifically for Ayurvedic practitioners
            </p>
          </motion.div>

          <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 h-full group">
                  <CardHeader className="p-4 sm:p-6">
                    <div
                      className={`h-10 w-10 sm:h-12 sm:w-12 rounded-lg bg-gradient-to-br from-background to-muted flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <feature.icon className={`h-5 w-5 sm:h-6 sm:w-6 ${feature.color}`} />
                    </div>
                    <CardTitle className="text-lg sm:text-xl">{feature.title}</CardTitle>
                    <CardDescription className="text-sm sm:text-base">{feature.description}</CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-herbal-green/5 via-background to-teal-50/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <Badge variant="outline" className="mb-4">
              How It Works
            </Badge>
            <h2 className="mb-4 text-3xl font-bold lg:text-4xl">Simple steps to get started</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get your Panchakarma practice up and running in minutes
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Sign Up & Setup",
                description: "Create your account and configure your clinic settings in under 5 minutes",
                icon: Users,
              },
              {
                step: "02",
                title: "Add Patients & Protocols",
                description: "Import existing patients and choose from our library of proven Panchakarma protocols",
                icon: Calendar,
              },
              {
                step: "03",
                title: "Start Managing",
                description:
                  "Schedule treatments, track progress, and analyze outcomes with our comprehensive dashboard",
                icon: BarChart3,
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="relative mb-6">
                  <div className="mx-auto h-16 w-16 rounded-full bg-herbal-gradient flex items-center justify-center text-white font-bold text-lg">
                    {item.step}
                  </div>
                  <div className="absolute -top-2 -right-2 h-8 w-8 rounded-full bg-saffron-400 flex items-center justify-center">
                    <item.icon className="h-4 w-4 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Integration & Security Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Badge variant="outline" className="mb-4">
                Security & Integration
              </Badge>
              <h2 className="mb-6 text-3xl font-bold lg:text-4xl">
                Enterprise-grade security meets seamless integration
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Your patient data is protected with bank-level security while integrating seamlessly with your existing
                workflow.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { icon: Shield, title: "HIPAA Compliant", desc: "Full compliance with healthcare regulations" },
                  { icon: Zap, title: "Real-time Sync", desc: "Instant updates across all devices" },
                  { icon: Users, title: "Team Collaboration", desc: "Multi-user access with role permissions" },
                  { icon: Award, title: "99.9% Uptime", desc: "Reliable service you can count on" },
                ].map((item, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-herbal-gradient/10">
                      <item.icon className="h-4 w-4 text-herbal-green" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">{item.title}</h4>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-herbal-green/20 to-teal-400/20 blur-3xl rounded-3xl" />
              <div className="relative bg-card rounded-2xl p-8 shadow-2xl border">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    <span className="text-sm font-medium">System Status: All Systems Operational</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Data Encryption</span>
                      <span className="text-green-500">AES-256</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Backup Frequency</span>
                      <span className="text-green-500">Every 15 minutes</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Compliance</span>
                      <span className="text-green-500">HIPAA, SOC 2</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 lg:py-32 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <Badge variant="outline" className="mb-4">
              Testimonials
            </Badge>
            <h2 className="mb-4 text-3xl font-bold lg:text-4xl">Trusted by Ayurvedic practitioners worldwide</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              See what our users have to say about their experience
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="border-0 shadow-lg h-full">
                  <CardContent className="p-6">
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-4">"{testimonial.content}"</p>
                    <div className="flex items-center gap-3">
                      <img
                        src={testimonial.avatar || "/placeholder.svg"}
                        alt={testimonial.name}
                        className="h-10 w-10 rounded-full"
                      />
                      <div>
                        <div className="font-semibold">{testimonial.name}</div>
                        <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Badge variant="outline" className="mb-4">
                Benefits
              </Badge>
              <h2 className="mb-6 text-3xl font-bold lg:text-4xl">Why choose our Panchakarma management platform?</h2>
              <div className="space-y-6">
                {[
                  {
                    icon: Clock,
                    title: "Save 10+ hours per week",
                    description: "Automated scheduling and patient management",
                  },
                  {
                    icon: Heart,
                    title: "Improve patient outcomes",
                    description: "Evidence-based protocols and progress tracking",
                  },
                  { icon: Brain, title: "Data-driven insights", description: "Analytics to optimize your practice" },
                  {
                    icon: Sparkles,
                    title: "Enhanced patient experience",
                    description: "Modern, intuitive patient portal",
                  },
                ].map((benefit, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-herbal-gradient">
                      <benefit.icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{benefit.title}</h3>
                      <p className="text-muted-foreground">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute inset-0 bg-herbal-gradient opacity-20 blur-3xl rounded-3xl" />
              <img
                src="/ayurvedic-treatment-dashboard.jpg"
                alt="Dashboard Preview"
                className="relative rounded-2xl shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="bg-herbal-gradient text-white border-0 relative overflow-hidden">
              <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:30px_30px]" />
              <CardContent className="relative p-6 sm:p-8 lg:p-12 text-center">
                <Award className="h-12 w-12 sm:h-16 sm:w-16 mx-auto mb-4 sm:mb-6 opacity-80" />
                <h2 className="mb-4 text-2xl sm:text-3xl lg:text-4xl font-bold">Ready to transform your practice?</h2>
                <p className="mb-6 sm:mb-8 text-base sm:text-lg opacity-90 max-w-2xl mx-auto">
                  Join hundreds of Ayurvedic practitioners who trust our platform for their Panchakarma management.
                  Start your free trial today and experience the difference.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                  <Button
                    size="lg"
                    variant="secondary"
                    className="shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto"
                    onClick={handleGetStarted}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <LoadingSpinner size="sm" className="mr-2" />
                        Starting...
                      </>
                    ) : (
                      <>
                        Get Started Today
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20 w-full sm:w-auto"
                    onClick={handleContactSales}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <LoadingSpinner size="sm" className="mr-2" />
                        Loading...
                      </>
                    ) : (
                      "Contact Sales"
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30">
        <div className="container mx-auto px-4 py-8 sm:py-12">
          <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <Link href="/" className="flex items-center gap-2 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-herbal-gradient">
                  <Leaf className="h-5 w-5 text-white" />
                </div>
                <span className="text-lg sm:text-xl font-bold">Panchakarma</span>
              </Link>
              <p className="text-sm sm:text-base text-muted-foreground">
                Modern Ayurvedic treatment management platform for practitioners worldwide.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Product</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#features" className="hover:text-foreground transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="hover:text-foreground transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleViewDemo}
                    className="hover:text-foreground transition-colors text-left"
                    disabled={isLoading}
                  >
                    Demo
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/about" className="hover:text-foreground transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-foreground transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/legal/privacy" className="hover:text-foreground transition-colors">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="/legal/terms" className="hover:text-foreground transition-colors">
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Support</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/contact" className="hover:text-foreground transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-foreground transition-colors">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-foreground transition-colors">
                    Community
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t text-center text-sm text-muted-foreground">
            <p>&copy; 2024 Panchakarma Management System. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

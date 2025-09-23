"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { MarketingNavbar } from "@/components/marketing-navbar"
import { Check, Leaf, Star, ArrowRight, Shield, Clock, Users, Zap } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

const tiers = [
  {
    name: "Clinic",
    price: "$99",
    period: "per month",
    description: "Perfect for single clinic practices",
    features: [
      "Up to 50 patients",
      "Basic scheduling",
      "Treatment protocols",
      "Patient feedback",
      "Email notifications",
      "Basic analytics",
      "Mobile app access",
    ],
    cta: "Start Free Trial",
    popular: false,
  },
  {
    name: "Multi-Center",
    price: "$299",
    period: "per month",
    description: "Ideal for growing practices with multiple locations",
    features: [
      "Up to 200 patients",
      "Advanced scheduling",
      "Custom protocols",
      "Real-time tracking",
      "Multi-channel notifications",
      "Advanced analytics",
      "Multi-center management",
      "Therapist collaboration",
      "API access",
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "pricing",
    description: "For large healthcare organizations",
    features: [
      "Unlimited patients",
      "White-label solution",
      "Custom integrations",
      "Dedicated support",
      "Advanced security",
      "Custom reporting",
      "SSO integration",
      "Compliance tools",
      "Training & onboarding",
    ],
    cta: "Contact Sales",
    popular: false,
  },
]

export default function PricingPage() {
  const [isLoading, setIsLoading] = useState<string | null>(null)
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly")

  const handlePlanSelect = (planName: string) => {
    setIsLoading(planName)
    // Simulate loading
    setTimeout(() => {
      setIsLoading(null)
      if (planName === "Enterprise") {
        window.location.href = "/contact"
      } else {
        window.location.href = "/auth/register"
      }
    }, 1500)
  }

  const getPrice = (basePrice: string) => {
    if (basePrice === "Custom") return basePrice
    const price = Number.parseInt(basePrice.replace("$", ""))
    return billingCycle === "yearly" ? `$${Math.floor(price * 0.8)}` : basePrice
  }

  return (
    <div className="min-h-screen">
      <MarketingNavbar />

      {/* Gradient background effects */}
      <div className="relative overflow-hidden bg-gradient-to-br from-background via-muted/20 to-herbal-green/5">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-12">
          <div className="h-72 w-72 rounded-full bg-herbal-gradient opacity-10 blur-3xl" />
        </div>

        {/* Header */}
        <section className="container relative mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mx-auto max-w-3xl text-center"
          >
            <Badge className="mb-8 bg-herbal-gradient text-white px-6 py-2">
              <Leaf className="mr-2 h-4 w-4" />
              Simple, Transparent Pricing
            </Badge>
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl">
              Choose the perfect plan for your
              <span className="bg-herbal-gradient bg-clip-text text-transparent"> practice</span>
            </h1>
            <p className="mb-8 text-xl text-muted-foreground text-pretty">
              Start with a 14-day free trial. No credit card required. Cancel anytime.
            </p>

            {/* Billing cycle toggle */}
            <div className="flex items-center justify-center gap-4 mb-12">
              <span className={`text-sm ${billingCycle === "monthly" ? "text-foreground" : "text-muted-foreground"}`}>
                Monthly
              </span>
              <button
                onClick={() => setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly")}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  billingCycle === "yearly" ? "bg-herbal-green" : "bg-muted"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    billingCycle === "yearly" ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
              <span className={`text-sm ${billingCycle === "yearly" ? "text-foreground" : "text-muted-foreground"}`}>
                Yearly
              </span>
              {billingCycle === "yearly" && (
                <Badge variant="secondary" className="text-xs">
                  Save 20%
                </Badge>
              )}
            </div>
          </motion.div>
        </section>

        {/* Pricing Cards */}
        <section className="container relative mx-auto px-4 pb-20">
          <div className="grid gap-8 lg:grid-cols-3">
            {tiers.map((tier, index) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card
                  className={`relative h-full ${tier.popular ? "border-herbal-green shadow-xl scale-105 bg-gradient-to-b from-background to-herbal-green/5" : "shadow-lg hover:shadow-xl transition-shadow duration-300"}`}
                >
                  {tier.popular && (
                    <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-herbal-gradient shadow-lg">
                      <Star className="mr-1 h-3 w-3" />
                      Most Popular
                    </Badge>
                  )}
                  <CardHeader className="text-center pb-8">
                    <CardTitle className="text-2xl mb-2">{tier.name}</CardTitle>
                    <CardDescription className="text-base mb-6">{tier.description}</CardDescription>
                    <div className="space-y-2">
                      <div className="text-4xl font-bold">
                        {getPrice(tier.price)}
                        {tier.price !== "Custom" && billingCycle === "yearly" && (
                          <span className="text-lg text-muted-foreground line-through ml-2">{tier.price}</span>
                        )}
                      </div>
                      <div className="text-muted-foreground">
                        /{billingCycle === "yearly" && tier.price !== "Custom" ? "year" : tier.period}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <ul className="space-y-4">
                      {tier.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3">
                          <Check className="h-4 w-4 text-herbal-green flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      className={`w-full ${tier.popular ? "bg-herbal-gradient hover:opacity-90 shadow-lg" : "hover:shadow-lg"} transition-all duration-300`}
                      variant={tier.popular ? "default" : "outline"}
                      onClick={() => handlePlanSelect(tier.name)}
                      disabled={isLoading === tier.name}
                    >
                      {isLoading === tier.name ? (
                        <>
                          <LoadingSpinner size="sm" className="mr-2" />
                          Loading...
                        </>
                      ) : (
                        <>
                          {tier.cta}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Features comparison section */}
        <section className="container relative mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4">Why choose our platform?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Built specifically for Ayurvedic practitioners with features that matter
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Shield,
                title: "HIPAA Compliant",
                description: "Enterprise-grade security and data protection",
              },
              {
                icon: Clock,
                title: "24/7 Support",
                description: "Round-the-clock assistance when you need it",
              },
              {
                icon: Users,
                title: "Multi-user Access",
                description: "Collaborate with your entire team seamlessly",
              },
              {
                icon: Zap,
                title: "Real-time Updates",
                description: "Instant synchronization across all devices",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="h-16 w-16 mx-auto mb-4 rounded-full bg-herbal-gradient/10 flex items-center justify-center">
                  <feature.icon className="h-8 w-8 text-herbal-green" />
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="container relative mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mx-auto max-w-3xl"
          >
            <h2 className="mb-12 text-center text-3xl font-bold">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {[
                {
                  q: "Can I switch plans anytime?",
                  a: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately and we'll prorate any billing differences.",
                },
                {
                  q: "Is there a setup fee?",
                  a: "No setup fees ever. We'll help you get started with free onboarding, data migration assistance, and comprehensive training for your team.",
                },
                {
                  q: "What payment methods do you accept?",
                  a: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for annual plans. All payments are processed securely.",
                },
                {
                  q: "Is my data secure and compliant?",
                  a: "Absolutely. We're HIPAA compliant with enterprise-grade security, end-to-end encryption, regular security audits, and automated daily backups with 99.9% uptime guarantee.",
                },
                {
                  q: "Can I cancel anytime?",
                  a: "Yes, you can cancel your subscription at any time with no cancellation fees. Your data will remain accessible for 30 days after cancellation for easy export.",
                },
                {
                  q: "Do you offer training and support?",
                  a: "Yes! All plans include comprehensive onboarding, video tutorials, documentation, and email support. Higher-tier plans include phone support and dedicated account management.",
                },
              ].map((faq, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="hover:shadow-lg transition-shadow duration-300">
                    <CardHeader>
                      <CardTitle className="text-lg">{faq.q}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{faq.a}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* CTA section */}
        <section className="container relative mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="bg-herbal-gradient text-white border-0 relative overflow-hidden">
              <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:30px_30px]" />
              <CardContent className="relative p-12 text-center">
                <h2 className="mb-4 text-3xl font-bold">Ready to get started?</h2>
                <p className="mb-8 text-lg opacity-90 max-w-2xl mx-auto">
                  Join hundreds of Ayurvedic practitioners who have transformed their practice with our platform. Start
                  your free trial today - no credit card required.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    variant="secondary"
                    className="shadow-lg hover:shadow-xl transition-all duration-300"
                    onClick={() => handlePlanSelect("Free Trial")}
                    disabled={isLoading === "Free Trial"}
                  >
                    {isLoading === "Free Trial" ? (
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
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                    asChild
                  >
                    <Link href="/contact">Contact Sales</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </section>
      </div>
    </div>
  )
}

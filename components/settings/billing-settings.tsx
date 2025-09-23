"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"
import { CreditCard, DollarSign, FileText, TrendingUp, Download } from "lucide-react"

export function BillingSettings() {
  const [subscription, setSubscription] = useState({
    plan: "professional",
    status: "active",
    nextBilling: "2024-01-15",
    amount: 4999,
    currency: "INR",
  })

  const [paymentMethod, setPaymentMethod] = useState({
    type: "card",
    last4: "4242",
    expiry: "12/25",
    brand: "visa",
  })

  const [billingSettings, setBillingSettings] = useState({
    autoRenewal: true,
    invoiceEmail: "billing@clinic.com",
    taxId: "GST123456789",
    billingAddress: "123 Wellness Street, Mumbai, Maharashtra 400001",
  })

  const plans = [
    {
      id: "starter",
      name: "Starter",
      price: 1999,
      features: ["Up to 50 patients", "Basic scheduling", "Email support"],
      current: false,
    },
    {
      id: "professional",
      name: "Professional",
      price: 4999,
      features: ["Up to 500 patients", "Advanced analytics", "Priority support", "API access"],
      current: true,
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: 9999,
      features: ["Unlimited patients", "Custom integrations", "24/7 support", "White-label"],
      current: false,
    },
  ]

  const invoices = [
    { id: "INV-001", date: "2023-12-15", amount: 4999, status: "paid" },
    { id: "INV-002", date: "2023-11-15", amount: 4999, status: "paid" },
    { id: "INV-003", date: "2023-10-15", amount: 4999, status: "paid" },
  ]

  const usage = {
    patients: { current: 247, limit: 500 },
    storage: { current: 2.4, limit: 10 },
    apiCalls: { current: 1250, limit: 5000 },
  }

  return (
    <div className="space-y-6">
      {/* Current Subscription */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Current Subscription
          </CardTitle>
          <CardDescription>Your current plan and billing information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-herbal-green/10 rounded-lg border border-herbal-green/20">
            <div>
              <h3 className="font-semibold text-lg">Professional Plan</h3>
              <p className="text-muted-foreground">Perfect for growing clinics</p>
              <div className="flex items-center gap-4 mt-2">
                <Badge className="bg-herbal-green/10 text-herbal-green border-herbal-green/20">Active</Badge>
                <span className="text-sm text-muted-foreground">Next billing: {subscription.nextBilling}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">₹{subscription.amount.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">per month</div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Payment Method</Label>
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <div className="w-8 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">
                  VISA
                </div>
                <div>
                  <div className="font-medium">•••• •••• •••• {paymentMethod.last4}</div>
                  <div className="text-sm text-muted-foreground">Expires {paymentMethod.expiry}</div>
                </div>
                <Button size="sm" variant="outline" className="ml-auto bg-transparent">
                  Update
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Billing Settings</Label>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-sm">Auto-renewal</Label>
                  <Switch
                    checked={billingSettings.autoRenewal}
                    onCheckedChange={(checked) => setBillingSettings({ ...billingSettings, autoRenewal: checked })}
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-sm">Invoice Email</Label>
                  <Input
                    value={billingSettings.invoiceEmail}
                    onChange={(e) => setBillingSettings({ ...billingSettings, invoiceEmail: e.target.value })}
                    className="text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Usage Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Usage Overview
          </CardTitle>
          <CardDescription>Current usage against your plan limits</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Patients</span>
                <span>
                  {usage.patients.current} / {usage.patients.limit}
                </span>
              </div>
              <Progress value={(usage.patients.current / usage.patients.limit) * 100} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Storage</span>
                <span>
                  {usage.storage.current}GB / {usage.storage.limit}GB
                </span>
              </div>
              <Progress value={(usage.storage.current / usage.storage.limit) * 100} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>API Calls</span>
                <span>
                  {usage.apiCalls.current} / {usage.apiCalls.limit}
                </span>
              </div>
              <Progress value={(usage.apiCalls.current / usage.apiCalls.limit) * 100} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Available Plans */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Available Plans
          </CardTitle>
          <CardDescription>Upgrade or downgrade your subscription</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {plans.map((plan) => (
              <Card key={plan.id} className={`relative ${plan.current ? "ring-2 ring-herbal-green" : ""}`}>
                {plan.current && (
                  <Badge className="absolute -top-2 left-4 bg-herbal-green text-white">Current Plan</Badge>
                )}
                <CardHeader>
                  <CardTitle className="text-lg">{plan.name}</CardTitle>
                  <div className="text-2xl font-bold">₹{plan.price.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">per month</div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <ul className="space-y-2 text-sm">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-herbal-green rounded-full" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button
                    variant={plan.current ? "outline" : "default"}
                    className={`w-full ${!plan.current ? "bg-herbal-gradient hover:opacity-90" : ""}`}
                    disabled={plan.current}
                  >
                    {plan.current ? "Current Plan" : plan.price > subscription.amount ? "Upgrade" : "Downgrade"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Billing History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Billing History
          </CardTitle>
          <CardDescription>View and download your invoices</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {invoices.map((invoice) => (
              <div key={invoice.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div>
                    <div className="font-medium">{invoice.id}</div>
                    <div className="text-sm text-muted-foreground">{invoice.date}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="font-medium">₹{invoice.amount.toLocaleString()}</div>
                    <Badge variant="outline" className="bg-herbal-green/10 text-herbal-green border-herbal-green/20">
                      {invoice.status}
                    </Badge>
                  </div>
                  <Button size="sm" variant="ghost">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tax Information */}
      <Card>
        <CardHeader>
          <CardTitle>Tax Information</CardTitle>
          <CardDescription>Manage your tax details for invoicing</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="taxId">Tax ID / GST Number</Label>
              <Input
                id="taxId"
                value={billingSettings.taxId}
                onChange={(e) => setBillingSettings({ ...billingSettings, taxId: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="billingAddress">Billing Address</Label>
              <Input
                id="billingAddress"
                value={billingSettings.billingAddress}
                onChange={(e) => setBillingSettings({ ...billingSettings, billingAddress: e.target.value })}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

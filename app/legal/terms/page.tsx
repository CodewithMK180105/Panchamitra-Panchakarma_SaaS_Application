import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Leaf } from "lucide-react"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <div className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 text-center">
            <div className="mb-4 flex justify-center">
              <div className="flex items-center gap-2 rounded-full bg-herbal-gradient px-4 py-2 text-white">
                <Leaf className="h-5 w-5" />
                <span className="font-medium">Terms of Service</span>
              </div>
            </div>
            <h1 className="text-4xl font-bold tracking-tight">Terms of Service</h1>
            <p className="mt-4 text-lg text-muted-foreground">Last updated: January 1, 2024</p>
          </div>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Acceptance of Terms</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none">
                <p>
                  By accessing and using the Panchakarma Management System, you accept and agree to be bound by the
                  terms and provision of this agreement.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Use License</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none">
                <p>
                  Permission is granted to temporarily use the Panchakarma Management System for personal,
                  non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.
                </p>
                <p>Under this license you may not:</p>
                <ul>
                  <li>Modify or copy the materials</li>
                  <li>Use the materials for commercial purposes or public display</li>
                  <li>Attempt to reverse engineer any software</li>
                  <li>Remove any copyright or proprietary notations</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Service Availability</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none">
                <p>
                  We strive to maintain 99.9% uptime but cannot guarantee uninterrupted service. Scheduled maintenance
                  will be communicated in advance.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>User Responsibilities</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray max-w-none">
                <p>Users are responsible for:</p>
                <ul>
                  <li>Maintaining the confidentiality of account credentials</li>
                  <li>Ensuring compliance with applicable healthcare regulations</li>
                  <li>Proper use of patient data and privacy protection</li>
                  <li>Timely payment of subscription fees</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  For questions about these Terms of Service, please contact us at{" "}
                  <a href="mailto:legal@panchakarma.com" className="text-herbal-green hover:underline">
                    legal@panchakarma.com
                  </a>
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

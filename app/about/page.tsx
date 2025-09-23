import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Leaf, Heart, Users, Award } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 flex justify-center">
            <div className="flex items-center gap-2 rounded-full bg-herbal-gradient px-4 py-2 text-white">
              <Leaf className="h-5 w-5" />
              <span className="font-medium">About Panchakarma Management</span>
            </div>
          </div>
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-balance sm:text-5xl">
            Bridging ancient wisdom with
            <span className="text-herbal-green"> modern technology</span>
          </h1>
          <p className="mb-8 text-xl text-muted-foreground text-pretty">
            We're dedicated to empowering Ayurvedic practitioners with tools that honor traditional healing while
            embracing the efficiency of modern healthcare management.
          </p>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Card className="text-center">
            <CardHeader>
              <Heart className="mx-auto h-12 w-12 text-herbal-green mb-4" />
              <CardTitle>Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                To preserve and promote the ancient science of Panchakarma through innovative technology that enhances
                patient care and practitioner efficiency.
              </p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardHeader>
              <Users className="mx-auto h-12 w-12 text-herbal-green mb-4" />
              <CardTitle>Our Community</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Serving over 500+ Ayurvedic practitioners and 10,000+ patients worldwide, creating a global network of
                holistic healing.
              </p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardHeader>
              <Award className="mx-auto h-12 w-12 text-herbal-green mb-4" />
              <CardTitle>Our Commitment</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Continuous innovation while respecting traditional practices, ensuring every feature serves both
                practitioner and patient wellbeing.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Team Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
          <p className="text-lg text-muted-foreground">
            Healthcare professionals and technology experts working together
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            { name: "Dr. Priya Sharma", role: "Chief Medical Officer", specialty: "Panchakarma Specialist" },
            { name: "Raj Patel", role: "CTO", specialty: "Healthcare Technology" },
            { name: "Dr. Anand Kumar", role: "Clinical Advisor", specialty: "Ayurvedic Medicine" },
            { name: "Meera Singh", role: "Product Manager", specialty: "UX Design" },
          ].map((member, i) => (
            <Card key={i} className="text-center">
              <CardHeader>
                <div className="mx-auto h-20 w-20 rounded-full bg-herbal-gradient flex items-center justify-center text-white text-xl font-bold mb-4">
                  {member.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <CardTitle className="text-lg">{member.name}</CardTitle>
                <CardDescription>{member.role}</CardDescription>
              </CardHeader>
              <CardContent>
                <Badge variant="outline">{member.specialty}</Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-16">
        <Card className="bg-herbal-gradient text-white">
          <CardContent className="p-12">
            <div className="grid gap-8 md:grid-cols-4 text-center">
              <div>
                <div className="text-4xl font-bold mb-2">500+</div>
                <div className="text-lg opacity-90">Practitioners</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">10K+</div>
                <div className="text-lg opacity-90">Patients Served</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">50K+</div>
                <div className="text-lg opacity-90">Sessions Managed</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">98%</div>
                <div className="text-lg opacity-90">Satisfaction Rate</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}

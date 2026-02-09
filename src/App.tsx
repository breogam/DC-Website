import { Section, Button, Card, CardContent, Badge, Input, Textarea } from '@/components/ui'

function App() {
  return (
    <div className="min-h-screen">
      {/* Design System Preview — will be replaced with actual pages */}
      <Section>
        <div className="max-w-3xl">
          <Badge variant="brand" className="mb-4">Design System</Badge>
          <h1 className="text-4xl lg:text-5xl text-neutral-900 mb-4">
            Dynamic Colors Inc
          </h1>
          <p className="text-lg text-neutral-500 max-w-xl mb-8">
            Professional painting and home services. This is the design system
            foundation — tokens, components, and conventions are ready for
            page-level composition.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button variant="primary">Get a Free Quote</Button>
            <Button variant="outline">Our Services</Button>
            <Button variant="ghost">Learn More</Button>
          </div>
        </div>
      </Section>

      <Section surface>
        <h2 className="text-2xl text-neutral-900 mb-8">Component Samples</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card variant="interactive">
            <CardContent>
              <h3 className="text-lg text-neutral-900 mb-2">Interior Painting</h3>
              <p className="text-neutral-500 text-sm">
                Transform any room with expert color consultation and
                flawless application.
              </p>
            </CardContent>
          </Card>
          <Card variant="elevated">
            <CardContent>
              <h3 className="text-lg text-neutral-900 mb-2">Exterior Painting</h3>
              <p className="text-neutral-500 text-sm">
                Weather-resistant finishes that protect and beautify
                your home&rsquo;s exterior.
              </p>
            </CardContent>
          </Card>
          <Card variant="bordered">
            <CardContent>
              <h3 className="text-lg text-neutral-900 mb-2">Color Consultation</h3>
              <p className="text-neutral-500 text-sm">
                Expert guidance to find the perfect palette for your space
                and style.
              </p>
            </CardContent>
          </Card>
        </div>
      </Section>

      <Section>
        <h2 className="text-2xl text-neutral-900 mb-8">Contact Form</h2>
        <div className="grid gap-6 sm:grid-cols-2 max-w-2xl">
          <Input label="Full Name" placeholder="Jane Doe" />
          <Input label="Email" type="email" placeholder="jane@example.com" />
          <Input label="Phone" type="tel" placeholder="(555) 123-4567" />
          <Input label="Zip Code" placeholder="90210" />
          <div className="sm:col-span-2">
            <Textarea label="Tell us about your project" placeholder="Describe your space and what you're looking for..." />
          </div>
          <div className="sm:col-span-2">
            <Button variant="primary" size="lg" className="w-full sm:w-auto">
              Request Free Estimate
            </Button>
          </div>
        </div>
      </Section>

      <Section surface compact>
        <h2 className="text-2xl text-neutral-900 mb-6">Badges</h2>
        <div className="flex flex-wrap gap-2">
          <Badge>Default</Badge>
          <Badge variant="success">Licensed</Badge>
          <Badge variant="info">Insured</Badge>
          <Badge variant="warning">Limited Availability</Badge>
          <Badge variant="brand">Free Estimate</Badge>
          <Badge variant="outline">10+ Years</Badge>
        </div>
      </Section>
    </div>
  )
}

export default App

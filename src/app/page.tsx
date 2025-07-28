import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { PackageOpen, ShoppingCart, BarChart3, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      {/* Navigation */}
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold">OrderFlow</h1>
            <Badge variant="secondary">v1.0</Badge>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button variant="ghost" asChild>
              <Link href="/auth">Sign In</Link>
            </Button>
            <Button variant="default" asChild>
              <Link href="/auth?mode=signup">Sign Up</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container py-16 md:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
            Streamline Your Order Management
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
            A modern, efficient order management system designed to help you track, manage, and fulfill orders with ease.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <Button size="lg" className="gap-2" asChild>
              <Link href="/auth">
                <Zap className="w-4 h-4" />
                Get Started
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="gap-2" asChild>
              <Link href="#features">
                Learn More
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container py-24 space-y-16">
        <h2 className="text-3xl font-bold text-center">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
            <PackageOpen className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Order Tracking</h3>
            <p className="text-muted-foreground">Real-time tracking and monitoring of all your orders from creation to delivery.</p>
          </div>
          <div className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
            <ShoppingCart className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Inventory Management</h3>
            <p className="text-muted-foreground">Keep track of your inventory levels and get alerts when stock is running low.</p>
          </div>
          <div className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
            <BarChart3 className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Analytics</h3>
            <p className="text-muted-foreground">Detailed insights and reports to help you make data-driven decisions.</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="border-t py-16">
        <div className="container">
          <h2 className="text-center text-3xl font-bold mb-12">Powerful Features</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                title: "Real-time Updates",
                description: "Get instant notifications and updates on order status changes with our WebSocket integration."
              },
              {
                title: "Inventory Management",
                description: "Keep track of your stock levels and get alerts when items are running low."
              },
              {
                title: "Customer Portal",
                description: "Provide your customers with a self-service portal to track their orders."
              }
            ].map((feature, index) => (
              <div key={index} className="rounded-lg border p-6">
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary/5 py-16">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to get started?</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground mb-8">
            Join hundreds of businesses that trust our order management system to streamline their operations.
          </p>
          <Button size="lg" className="px-8" asChild>
            <Link href="/auth/signin">
              Sign Up Now
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} OrderFlow. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="text-sm hover:underline">
              Privacy
            </Link>
            <Link href="/terms" className="text-sm hover:underline">
              Terms
            </Link>
            <Link href="/contact" className="text-sm hover:underline">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

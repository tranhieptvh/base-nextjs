import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Code, Palette, Zap, Shield, Smartphone } from 'lucide-react';

export default function About() {
  return (
    <div className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            About Base NextJS
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A comprehensive NextJS application template designed to accelerate your development process 
            with modern tools, best practices, and production-ready features.
          </p>
        </div>

        <div className="space-y-16">
          {/* Mission */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-lg text-muted-foreground mb-6">
              We believe that every developer should have access to a solid foundation when starting 
              a new project. Base NextJS provides everything you need to build modern, scalable web 
              applications without the hassle of setting up common features from scratch.
            </p>
            <p className="text-lg text-muted-foreground">
              Our template follows industry best practices and includes comprehensive documentation 
              to help you understand and extend the codebase as your project grows.
            </p>
          </section>

          {/* Tech Stack */}
          <section>
            <h2 className="text-3xl font-bold mb-8">Technology Stack</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mb-4">
                    <Code className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle>Next.js 14+</CardTitle>
                  <CardDescription>
                    React framework with App Router, Server Components, and optimized performance.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mb-4">
                    <Code className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle>TypeScript</CardTitle>
                  <CardDescription>
                    Type-safe JavaScript for better developer experience and fewer bugs.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <div className="w-12 h-12 bg-cyan-100 dark:bg-cyan-900/20 rounded-lg flex items-center justify-center mb-4">
                    <Palette className="h-6 w-6 text-cyan-600" />
                  </div>
                  <CardTitle>Tailwind CSS</CardTitle>
                  <CardDescription>
                    Utility-first CSS framework for rapid UI development.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center mb-4">
                    <Zap className="h-6 w-6 text-purple-600" />
                  </div>
                  <CardTitle>shadcn/ui</CardTitle>
                  <CardDescription>
                    High-quality, accessible component library built on Radix UI.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center mb-4">
                    <Shield className="h-6 w-6 text-green-600" />
                  </div>
                  <CardTitle>Authentication</CardTitle>
                  <CardDescription>
                    Complete auth system with JWT tokens and protected routes.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center mb-4">
                    <Smartphone className="h-6 w-6 text-orange-600" />
                  </div>
                  <CardTitle>Responsive Design</CardTitle>
                  <CardDescription>
                    Mobile-first design that works perfectly on all devices.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </section>

          {/* Features */}
          <section>
            <h2 className="text-3xl font-bold mb-8">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Frontend Features</h3>
                <ul className="space-y-2">
                  {[
                    'Modern React with hooks and functional components',
                    'TypeScript for type safety and better DX',
                    'Tailwind CSS for utility-first styling',
                    'shadcn/ui component library',
                    'Dark/Light theme support',
                    'Responsive design patterns',
                    'Form validation with React Hook Form',
                    'State management with Zustand',
                    'Server state with React Query',
                    'Toast notifications and loading states',
                  ].map((feature) => (
                    <li key={feature} className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Developer Experience</h3>
                <ul className="space-y-2">
                  {[
                    'ESLint and Prettier for code quality',
                    'Husky for git hooks and pre-commit checks',
                    'Hot reload and fast refresh',
                    'Path mapping for clean imports',
                    'Comprehensive error handling',
                    'Loading states and error boundaries',
                    'Custom React hooks',
                    'Utility functions and helpers',
                    'API client with error handling',
                    'Environment configuration',
                  ].map((feature) => (
                    <li key={feature} className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Getting Started */}
          <section>
            <h2 className="text-3xl font-bold mb-6">Getting Started</h2>
            <div className="bg-muted/50 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Quick Start</h3>
              <div className="space-y-4">
                <div>
                  <p className="font-medium mb-2">1. Install dependencies:</p>
                  <code className="block bg-background p-3 rounded border text-sm">
                    npm install
                  </code>
                </div>
                <div>
                  <p className="font-medium mb-2">2. Set up environment variables:</p>
                  <code className="block bg-background p-3 rounded border text-sm">
                    cp env.example .env.local
                  </code>
                </div>
                <div>
                  <p className="font-medium mb-2">3. Start development server:</p>
                  <code className="block bg-background p-3 rounded border text-sm">
                    npm run dev
                  </code>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

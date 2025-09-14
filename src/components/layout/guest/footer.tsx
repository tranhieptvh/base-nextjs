import Link from 'next/link';
import { Github, Twitter, Linkedin, Mail, Star, Users, Zap, Shield, Code, Palette } from 'lucide-react';

export default function GuestFooter() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 to-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Brand & Description */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-white to-gray-200 rounded-xl flex items-center justify-center">
                  <span className="text-black font-bold text-xl">B</span>
                </div>
                <div>
                  <span className="text-2xl font-bold">Base NextJS</span>
                  <p className="text-sm text-gray-400">Modern Web Template</p>
                </div>
              </div>
              <p className="text-gray-300 mb-8 text-lg leading-relaxed">
                A comprehensive NextJS application template designed to accelerate your development process 
                with modern tools, best practices, and production-ready features.
              </p>
              
              {/* Social Links */}
              <div className="flex space-x-4">
                <a
                  href="https://github.com"
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href="https://twitter.com"
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a
                  href="https://linkedin.com"
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href="mailto:contact@example.com"
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors"
                >
                  <Mail className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Features */}
            <div>
              <h3 className="text-xl font-semibold mb-6">Key Features</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Zap className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-200">Lightning Fast</p>
                    <p className="text-sm text-gray-400">Next.js 15+ with App Router</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Shield className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-200">Secure by Default</p>
                    <p className="text-sm text-gray-400">JWT authentication system</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Code className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-200">TypeScript</p>
                    <p className="text-sm text-gray-400">Type-safe development</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Palette className="h-5 w-5 text-purple-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-200">Modern UI</p>
                    <p className="text-sm text-gray-400">Tailwind CSS + shadcn/ui</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Links & Stats */}
            <div>
              <h3 className="text-xl font-semibold mb-6">Quick Links</h3>
              <div className="space-y-3">
                <Link href="/#features" className="block text-gray-400 hover:text-white transition-colors">
                  Features
                </Link>
                <Link href="/#tech-stack" className="block text-gray-400 hover:text-white transition-colors">
                  Tech Stack
                </Link>
                <Link href="/#about" className="block text-gray-400 hover:text-white transition-colors">
                  About
                </Link>
                <Link href="/#contact" className="block text-gray-400 hover:text-white transition-colors">
                  Contact
                </Link>
                <Link href="/login" className="block text-gray-400 hover:text-white transition-colors">
                  Login
                </Link>
                <Link href="/register" className="block text-gray-400 hover:text-white transition-colors">
                  Get Started
                </Link>
              </div>

              {/* Stats */}
              <div className="mt-8 pt-6 border-t border-gray-800">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-1 mb-1">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span className="text-2xl font-bold">4.9</span>
                    </div>
                    <p className="text-xs text-gray-400">Rating</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-1 mb-1">
                      <Users className="h-4 w-4 text-blue-500" />
                      <span className="text-2xl font-bold">10K+</span>
                    </div>
                    <p className="text-xs text-gray-400">Users</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-6 mb-4 md:mb-0">
                     <p className="text-gray-400 text-sm">
                       © 2025 Base NextJS. All rights reserved.
                     </p>
              <div className="flex space-x-4">
                <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Privacy
                </Link>
                <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Terms
                </Link>
              </div>
            </div>
            <div className="text-sm text-gray-500">
              Made with ❤️ for developers
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

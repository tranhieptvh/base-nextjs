'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Menu,
  X,
  Github,
  Star,
  Users,
  Zap,
  Shield,
} from 'lucide-react';

export default function GuestHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white text-gray-900 shadow-lg border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
                <span className="text-white font-bold text-lg">B</span>
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Base NextJS
                </span>
                <p className="text-xs text-gray-500 -mt-1">Modern Web Template</p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link
              href="/#features"
              className="text-gray-700 hover:text-gray-900 transition-colors font-medium"
            >
              Features
            </Link>
            <Link
              href="/#tech-stack"
              className="text-gray-700 hover:text-gray-900 transition-colors font-medium"
            >
              Tech Stack
            </Link>
            <Link
              href="/#about"
              className="text-gray-700 hover:text-gray-900 transition-colors font-medium"
            >
              About
            </Link>
            <Link
              href="/#contact"
              className="text-gray-700 hover:text-gray-900 transition-colors font-medium"
            >
              Contact
            </Link>
          </nav>

          {/* Right side - Auth buttons and stats */}
          <div className="flex items-center space-x-6">
            {/* GitHub Link */}
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Github className="h-5 w-5" />
              <span className="text-sm font-medium">GitHub</span>
            </a>

            {/* Stats */}
            <div className="hidden md:flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 text-yellow-500" />
                <span>4.9/5</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="h-4 w-4 text-blue-500" />
                <span>10K+</span>
              </div>
            </div>

            {/* Auth buttons */}
            <div className="flex items-center space-x-3">
              <Button variant="ghost" asChild className="text-gray-700 hover:text-gray-900 hover:bg-gray-100">
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild className="bg-gradient-to-r from-gray-800 to-gray-900 text-white hover:from-gray-900 hover:to-black shadow-lg">
                <Link href="/register">Get Started</Link>
              </Button>
            </div>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden text-gray-700 hover:text-gray-900 hover:bg-gray-100"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-6 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/#features"
                className="text-gray-700 hover:text-gray-900 transition-colors px-3 py-2 rounded-lg font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </Link>
              <Link
                href="/#tech-stack"
                className="text-gray-700 hover:text-gray-900 transition-colors px-3 py-2 rounded-lg font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Tech Stack
              </Link>
              <Link
                href="/#about"
                className="text-gray-700 hover:text-gray-900 transition-colors px-3 py-2 rounded-lg font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/#contact"
                className="text-gray-700 hover:text-gray-900 transition-colors px-3 py-2 rounded-lg font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <div className="pt-4 border-t border-gray-200">
                <div className="flex space-x-3">
                  <Button variant="ghost" asChild className="flex-1 text-gray-700 hover:text-gray-900 hover:bg-gray-100">
                    <Link href="/login" onClick={() => setIsMenuOpen(false)}>Login</Link>
                  </Button>
                  <Button asChild className="flex-1 bg-gradient-to-r from-gray-800 to-gray-900 text-white hover:from-gray-900 hover:to-black">
                    <Link href="/register" onClick={() => setIsMenuOpen(false)}>Get Started</Link>
                  </Button>
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

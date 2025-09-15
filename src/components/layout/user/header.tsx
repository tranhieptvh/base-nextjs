'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth-store';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Menu,
  X,
  User,
  Settings,
  LogOut,
  Bell,
  Search,
  ChevronDown,
  BookOpen,
} from 'lucide-react';

export default function UserHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <header className="bg-white text-gray-900 shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link href="/dashboard" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-black rounded flex items-center justify-center">
                <span className="text-white font-bold text-sm">U</span>
              </div>
              <span className="text-xl font-bold">User Panel</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/dashboard"
              className="text-gray-700 hover:text-gray-900 transition-colors font-medium"
            >
              Dashboard
            </Link>
            <Link
              href="/learn"
              className="text-gray-700 hover:text-gray-900 transition-colors font-medium"
            >
              Learn
            </Link>
            <Link
              href="/settings"
              className="text-gray-700 hover:text-gray-900 transition-colors font-medium"
            >
              Settings
            </Link>
          </nav>

          {/* Right side - Auth buttons or User Menu */}
          <div className="flex items-center space-x-4">
            {user ? (
              // Authenticated user - show user menu
              <>
                {/* Search */}
                <div className="hidden sm:block">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                      type="text"
                      placeholder="Search..."
                      className="pl-10 pr-4 py-2 text-sm text-gray-900 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                    />
                  </div>
                </div>


                {/* Notifications */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                >
                  <Bell className="h-5 w-5" />
                </Button>

                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                    >
                      <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                        <User className="h-4 w-4 text-white" />
                      </div>
                      <span className="hidden sm:block text-sm">
                        {user?.full_name || user?.username || 'User'}
                      </span>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <div className="px-3 py-2">
                      <p className="text-sm font-medium">{user?.full_name || 'User'}</p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard" className="flex items-center">
                        <User className="mr-2 h-4 w-4" />
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/learn" className="flex items-center">
                        <BookOpen className="mr-2 h-4 w-4" />
                        Learn
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/settings" className="flex items-center">
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              // Guest user - show login/register buttons
              <>
                <Button variant="ghost" asChild className="text-gray-700 hover:text-gray-900 hover:bg-gray-100">
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild className="bg-black text-white hover:bg-gray-800">
                  <Link href="/register">Get Started</Link>
                </Button>
              </>
            )}

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden text-gray-700 hover:text-gray-900 hover:bg-gray-100"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-2">
              <Link
                href="/"
                className="text-gray-700 hover:text-gray-900 transition-colors px-3 py-2 rounded"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/about"
                className="text-gray-700 hover:text-gray-900 transition-colors px-3 py-2 rounded"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-gray-700 hover:text-gray-900 transition-colors px-3 py-2 rounded"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              {user ? (
                // Authenticated user - show dashboard and learn
                <>
                  <Link
                    href="/dashboard"
                    className="text-gray-700 hover:text-gray-900 transition-colors px-3 py-2 rounded"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/learn"
                    className="text-gray-700 hover:text-gray-900 transition-colors px-3 py-2 rounded"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Learn
                  </Link>
                </>
              ) : (
                // Guest user - show auth buttons
                <>
                  <Link
                    href="/login"
                    className="text-gray-700 hover:text-gray-900 transition-colors px-3 py-2 rounded"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="bg-black text-white hover:bg-gray-800 transition-colors px-3 py-2 rounded text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Get Started
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

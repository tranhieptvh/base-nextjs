'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ThemeToggle } from '@/components/theme-toggle';
import { useTheme } from 'next-themes';
import { Sun, Moon, Monitor, Palette } from 'lucide-react';

export default function SettingsPage() {
  const { theme } = useTheme();

  return (
    <div className="min-h-screen bg-muted/50">
      <div className="container py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Settings</h1>
            <p className="text-muted-foreground">
              Manage your account settings and preferences
            </p>
          </div>

          <div className="space-y-6">
            {/* Appearance Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Palette className="h-5 w-5" />
                  <span>Appearance</span>
                </CardTitle>
                <CardDescription>
                  Customize how the application looks and feels
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h3 className="text-sm font-medium">Theme</h3>
                    <p className="text-sm text-muted-foreground">
                      Choose your preferred color scheme
                    </p>
                  </div>
                  <ThemeToggle />
                </div>

                <div className="space-y-4">
                  <h4 className="text-sm font-medium">Available Themes</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className={`p-4 rounded-lg border-2 ${
                      theme === 'light' ? 'border-primary bg-primary/5' : 'border-border'
                    }`}>
                      <div className="flex items-center space-x-3 mb-2">
                        <Sun className="h-4 w-4" />
                        <span className="font-medium">Light</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Clean and bright interface
                      </p>
                    </div>

                    <div className={`p-4 rounded-lg border-2 ${
                      theme === 'dark' ? 'border-primary bg-primary/5' : 'border-border'
                    }`}>
                      <div className="flex items-center space-x-3 mb-2">
                        <Moon className="h-4 w-4" />
                        <span className="font-medium">Dark</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Easy on the eyes in low light
                      </p>
                    </div>

                    <div className={`p-4 rounded-lg border-2 ${
                      theme === 'system' ? 'border-primary bg-primary/5' : 'border-border'
                    }`}>
                      <div className="flex items-center space-x-3 mb-2">
                        <Monitor className="h-4 w-4" />
                        <span className="font-medium">System</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Follows your system preference
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Account Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Account</CardTitle>
                <CardDescription>
                  Manage your account information and security
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between py-2">
                  <div>
                    <h3 className="text-sm font-medium">Profile Information</h3>
                    <p className="text-sm text-muted-foreground">
                      Update your personal details
                    </p>
                  </div>
                  <button className="text-sm text-primary hover:underline">
                    Edit
                  </button>
                </div>

                <div className="flex items-center justify-between py-2">
                  <div>
                    <h3 className="text-sm font-medium">Password</h3>
                    <p className="text-sm text-muted-foreground">
                      Change your password
                    </p>
                  </div>
                  <button className="text-sm text-primary hover:underline">
                    Change
                  </button>
                </div>

                <div className="flex items-center justify-between py-2">
                  <div>
                    <h3 className="text-sm font-medium">Two-Factor Authentication</h3>
                    <p className="text-sm text-muted-foreground">
                      Add an extra layer of security
                    </p>
                  </div>
                  <button className="text-sm text-primary hover:underline">
                    Enable
                  </button>
                </div>
              </CardContent>
            </Card>

            {/* Notifications */}
            <Card>
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>
                  Choose what notifications you want to receive
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium">Email Notifications</h3>
                    <p className="text-sm text-muted-foreground">
                      Receive updates via email
                    </p>
                  </div>
                  <input type="checkbox" defaultChecked className="h-4 w-4" />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium">Push Notifications</h3>
                    <p className="text-sm text-muted-foreground">
                      Receive push notifications
                    </p>
                  </div>
                  <input type="checkbox" className="h-4 w-4" />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium">Marketing Emails</h3>
                    <p className="text-sm text-muted-foreground">
                      Receive promotional content
                    </p>
                  </div>
                  <input type="checkbox" className="h-4 w-4" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

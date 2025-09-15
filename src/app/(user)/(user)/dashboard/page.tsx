'use client';

import { useAuthStore } from '@/store/auth-store';
import { vocabularyService, DashboardStats, TodayReview } from '@/services/vocabulary.service';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BookOpen, 
  Brain, 
  Target, 
  CheckCircle, 
  Clock, 
  TrendingUp,
  ArrowRight,
  Star,
  BookMarked
} from 'lucide-react';
import { User } from '@/types/auth.types';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function DashboardPage() {
  const { user, logout } = useAuthStore();

  return <DashboardContent user={user} logout={async () => { await logout(); }} />;
}

function DashboardContent({ user, logout }: { user: User | null; logout: () => Promise<void> }) {
  // Local state for dashboard data
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [todayReviews, setTodayReviews] = useState<TodayReview[]>([]);
  const [isLoadingStats, setIsLoadingStats] = useState(false);
  const [isLoadingReviews, setIsLoadingReviews] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch dashboard data on component mount
  useEffect(() => {
    const fetchData = async () => {
      // Fetch dashboard stats
      setIsLoadingStats(true);
      try {
        const statsData = await vocabularyService.getDashboardStats();
        setStats(statsData);
      } catch (error: unknown) {
        const errorMessage = error instanceof Error && 'response' in error 
          ? (error as { response?: { data?: { detail?: string } } }).response?.data?.detail || 'Failed to fetch dashboard stats'
          : 'Failed to fetch dashboard stats';
        setError(errorMessage);
      } finally {
        setIsLoadingStats(false);
      }

      // Fetch today's reviews
      setIsLoadingReviews(true);
      try {
        const reviewsData = await vocabularyService.getTodayReviews();
        setTodayReviews(reviewsData.reviews);
      } catch (error: unknown) {
        const errorMessage = error instanceof Error && 'response' in error 
          ? (error as { response?: { data?: { detail?: string } } }).response?.data?.detail || 'Failed to fetch today\'s reviews'
          : 'Failed to fetch today\'s reviews';
        setError(errorMessage);
      } finally {
        setIsLoadingReviews(false);
      }
    };

    fetchData();
  }, []);

  const getProficiencyColor = (level: number) => {
    switch (level) {
      case 0: return 'bg-gray-100 text-gray-800';
      case 1: return 'bg-blue-100 text-blue-800';
      case 2: return 'bg-yellow-100 text-yellow-800';
      case 3: return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getProficiencyLabel = (level: number) => {
    switch (level) {
      case 0: return 'New';
      case 1: return 'Learning';
      case 2: return 'Familiar';
      case 3: return 'Mastered';
      default: return 'Unknown';
    }
  };

  return (
    <div className="min-h-screen bg-muted/50">
      <div className="container mx-auto py-8 px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">English Learning Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {user?.full_name || user?.username || 'User'}! Track your vocabulary progress.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Vocabulary</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.total_vocabulary || 0}</div>
              <p className="text-xs text-muted-foreground">
                Words and phrases learned
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Reviews</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.today_reviews || 0}</div>
              <p className="text-xs text-muted-foreground">
                Words to review today
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Mastered</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.proficiency_levels.mastered || 0}</div>
              <p className="text-xs text-muted-foreground">
                Words you've mastered
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Learning</CardTitle>
              <Brain className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.proficiency_levels.learning || 0}</div>
              <p className="text-xs text-muted-foreground">
                Currently learning
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Proficiency Progress */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Learning Progress</CardTitle>
            <CardDescription>
              Your vocabulary proficiency levels
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-600">{stats?.proficiency_levels.new || 0}</div>
                <div className="text-sm text-muted-foreground">New</div>
                <Progress value={stats ? (stats.proficiency_levels.new / stats.total_vocabulary) * 100 : 0} className="mt-2" />
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{stats?.proficiency_levels.learning || 0}</div>
                <div className="text-sm text-muted-foreground">Learning</div>
                <Progress value={stats ? (stats.proficiency_levels.learning / stats.total_vocabulary) * 100 : 0} className="mt-2" />
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">{stats?.proficiency_levels.familiar || 0}</div>
                <div className="text-sm text-muted-foreground">Familiar</div>
                <Progress value={stats ? (stats.proficiency_levels.familiar / stats.total_vocabulary) * 100 : 0} className="mt-2" />
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{stats?.proficiency_levels.mastered || 0}</div>
                <div className="text-sm text-muted-foreground">Mastered</div>
                <Progress value={stats ? (stats.proficiency_levels.mastered / stats.total_vocabulary) * 100 : 0} className="mt-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Today's Reviews */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Today's Reviews</CardTitle>
              <CardDescription>
                Words and phrases you need to review today
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoadingReviews ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                  <p className="text-muted-foreground mt-2">Loading reviews...</p>
                </div>
              ) : todayReviews.length === 0 ? (
                <div className="text-center py-8">
                  <BookMarked className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No reviews scheduled for today!</p>
                  <p className="text-sm text-muted-foreground mt-2">Great job staying on top of your learning.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {todayReviews.map((review) => (
                    <div key={review.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-lg">{review.word_phrase}</h3>
                            <Badge className={getProficiencyColor(review.spaced_repetition.proficiency_level)}>
                              {getProficiencyLabel(review.spaced_repetition.proficiency_level)}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-1">
                            <strong>Pronunciation:</strong> {review.pronunciation}
                          </p>
                          <p className="text-sm text-muted-foreground mb-2">
                            <strong>Meaning:</strong> {review.meaning}
                          </p>
                          {review.examples.length > 0 && (
                            <div className="mt-2">
                              <p className="text-sm font-medium mb-1">Example:</p>
                              <p className="text-sm italic">"{review.examples[0].example_sentence}"</p>
                            </div>
                          )}
                        </div>
                        <Button size="sm" variant="outline">
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Start learning and manage your vocabulary
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Link href="/learn">
                <Button className="w-full justify-start" variant="default">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Learn New Words
                </Button>
              </Link>
              <Link href="/learn">
                <Button className="w-full justify-start" variant="outline">
                  <Target className="mr-2 h-4 w-4" />
                  Review Today's Words
                </Button>
              </Link>
              <Button className="w-full justify-start" variant="outline">
                <TrendingUp className="mr-2 h-4 w-4" />
                View Progress
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <BookMarked className="mr-2 h-4 w-4" />
                My Vocabulary
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

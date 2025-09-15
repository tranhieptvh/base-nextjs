import { apiClient } from '@/lib/api';

// Types
export interface WordAnalysisResponse {
  classification: string;
  pronunciation: string;
  meaning: string;
  difficulty_level: string;
}

export interface ExampleFeedbackResponse {
  grammar_correctness: string;
  natural_usage: string;
  suggestions: string;
  alternative_examples: string[];
}

// --- New Types for Interactive Flow ---
export interface InteractiveLearningRequest {
  word_phrase: string;
  example_sentence: string;
}

export interface InteractiveLearningState {
  word_phrase: string;
  analysis_result: WordAnalysisResponse;
  example_sentence: string;
  feedback_result: ExampleFeedbackResponse;
  evaluation_result: 'good' | 'needs_improvement';
  error?: string;
}
// --- End New Types ---

export interface SaveVocabularyRequest {
  word_phrase: string;
  classification: string;
  pronunciation: string;
  meaning: string;
  example_sentence: string;
  ai_feedback: string;
}

export interface Example {
  id: number;
  example_sentence: string;
  ai_feedback: string;
  created_at: string;
}

export interface SpacedRepetition {
  proficiency_level: number;
  next_review_date: string | null;
  review_count: number;
  ease_factor: number;
}

export interface Vocabulary {
  id: number;
  word_phrase: string;
  classification: string;
  pronunciation: string;
  meaning: string;
  created_at: string;
  examples: Example[];
  spaced_repetition: SpacedRepetition | null;
}

export interface SaveVocabularyResponse {
  vocabulary: Vocabulary;
  example: Example;
  spaced_repetition: SpacedRepetition;
}

export interface DashboardStats {
  total_vocabulary: number;
  proficiency_levels: {
    new: number;
    learning: number;
    familiar: number;
    mastered: number;
  };
  today_reviews: number;
}

export interface TodayReview {
  id: number;
  word_phrase: string;
  classification: string;
  pronunciation: string;
  meaning: string;
  examples: Example[];
  spaced_repetition: SpacedRepetition;
}

export interface TodayReviewResponse {
  reviews: TodayReview[];
  total: number;
}

export interface ReviewPerformanceRequest {
  performance_score: number; // 0=again, 1=hard, 2=good, 3=easy
  time_spent: number; // seconds
}

export interface ReviewPerformanceResponse {
  proficiency_level: number;
  next_review_date: string;
  review_count: number;
  ease_factor: number;
}

export interface VocabularyListResponse {
  vocabularies: Vocabulary[];
  total: number;
  skip: number;
  limit: number;
}

export interface VocabularyFilter {
  skip?: number;
  limit?: number;
  proficiency_level?: number;
}

class VocabularyService {
  private baseUrl = '/vocabulary';

  /**
   * New: Handles an interactive learning session using a stateful graph.
   */
  async runInteractiveLearning(data: InteractiveLearningRequest): Promise<InteractiveLearningState> {
    const response = await apiClient.post(`${this.baseUrl}/learn/interactive`, data);
    return response.data as InteractiveLearningState;
  }

  /**
   * Save vocabulary item with example and create spaced repetition record
   */
  async saveVocabulary(data: SaveVocabularyRequest): Promise<SaveVocabularyResponse> {
    const response = await apiClient.post(`${this.baseUrl}/save`, data);
    // Backend now returns data wrapped in success_response format
    return response.data as SaveVocabularyResponse;
  }

  /**
   * Get dashboard statistics for the current user
   */
  async getDashboardStats(): Promise<DashboardStats> {
    const response = await apiClient.get(`${this.baseUrl}/dashboard`);
    // Backend now returns data wrapped in success_response format
    return response.data as DashboardStats;
  }

  /**
   * Get vocabulary items for today's review
   */
  async getTodayReviews(): Promise<TodayReviewResponse> {
    const response = await apiClient.get(`${this.baseUrl}/today-review`);
    // Backend now returns data wrapped in success_response format
    return response.data as TodayReviewResponse;
  }

  /**
   * Get user's vocabulary list with optional filtering
   */
  async getVocabularyList(filters: VocabularyFilter = {}): Promise<VocabularyListResponse> {
    const params = new URLSearchParams();
    if (filters.skip !== undefined) params.append('skip', filters.skip.toString());
    if (filters.limit !== undefined) params.append('limit', filters.limit.toString());
    if (filters.proficiency_level !== undefined) params.append('proficiency_level', filters.proficiency_level.toString());

    const response = await apiClient.get(`${this.baseUrl}/list?${params.toString()}`);
    // Backend now returns data wrapped in success_response format
    return response.data as VocabularyListResponse;
  }

  /**
   * Update review performance for a vocabulary item
   */
  async updateReviewPerformance(
    vocabularyId: number, 
    data: ReviewPerformanceRequest
  ): Promise<ReviewPerformanceResponse> {
    const response = await apiClient.post(`${this.baseUrl}/${vocabularyId}/review`, data);
    // Backend now returns data wrapped in success_response format
    return response.data as ReviewPerformanceResponse;
  }

  /**
   * Delete a vocabulary item and all related data
   */
  async deleteVocabulary(vocabularyId: number): Promise<void> {
    await apiClient.delete(`${this.baseUrl}/${vocabularyId}`);
  }
}

export const vocabularyService = new VocabularyService();

'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  Brain, 
  Volume2, 
  Save, 
  Loader2,
  CheckCircle,
  AlertCircle,
  Lightbulb
} from 'lucide-react';
import { 
  vocabularyService, 
  ExampleFeedbackResponse, 
  InteractiveLearningState 
} from '@/services/vocabulary.service';

export default function LearnPage() {
  // --- STATE MANAGEMENT ---
  const [wordPhrase, setWordPhrase] = useState('');
  const [exampleSentence, setExampleSentence] = useState('');
  
  // New unified state for the learning flow
  const [learningState, setLearningState] = useState<InteractiveLearningState | null>(null);
  
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Derived state for easier access in JSX
  const wordAnalysis = useMemo(() => learningState?.analysis_result, [learningState]);
  const exampleFeedback = useMemo(() => learningState?.feedback_result, [learningState]);
  const evaluationResult = useMemo(() => learningState?.evaluation_result, [learningState]);
  
  // --- API CALLS & EVENT HANDLERS ---
  
  const handleInteractiveSubmit = async () => {
    if (!wordPhrase.trim() || !exampleSentence.trim()) return;
    
    setError(null);
    setIsLoading(true);
    if (!learningState) { // Clear previous results only on the first attempt for a new word
        setLearningState(null);
    }
    
    try {
      const result = await vocabularyService.runInteractiveLearning({
        word_phrase: wordPhrase,
        example_sentence: exampleSentence
      });
      setLearningState(result);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error && 'response' in error 
        ? (error as { response?: { data?: { detail?: string } } }).response?.data?.detail || 'Failed to process request'
        : 'An error occurred during the interactive session';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!wordPhrase.trim() || !exampleSentence.trim() || !wordAnalysis || evaluationResult !== 'good') return;

    setError(null);
    setIsSaving(true);
    
    try {
      // The feedback object is now directly available from the learning state
      const feedbackString = JSON.stringify(exampleFeedback);

      await vocabularyService.saveVocabulary({
        word_phrase: wordPhrase,
        classification: wordAnalysis.classification,
        pronunciation: wordAnalysis.pronunciation,
        meaning: wordAnalysis.meaning,
        example_sentence: exampleSentence,
        ai_feedback: feedbackString
      });

      setSaved(true);
      // Reset form after successful save
      setTimeout(() => {
        setWordPhrase('');
        setExampleSentence('');
        setLearningState(null);
        setSaved(false);
      }, 2000);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error && 'response' in error 
        ? (error as { response?: { data?: { detail?: string } } }).response?.data?.detail || 'Failed to save vocabulary'
        : 'Failed to save vocabulary';
      setError(errorMessage);
    } finally {
      setIsSaving(false);
    }
  };

  const handlePlayPronunciation = () => {
    if (!wordAnalysis?.pronunciation) return;
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(wordPhrase);
      utterance.lang = 'en-US';
      speechSynthesis.speak(utterance);
    }
  };

  // --- UI HELPER FUNCTIONS ---

  const getDifficultyColor = (level: string = 'unknown') => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatFeedback = (feedback: ExampleFeedbackResponse) => (
    <div className="space-y-4">
      {/* Grammar Correctness */}
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <h4 className="font-semibold text-blue-900 mb-2 text-base">Grammar Correctness</h4>
        <p className="text-sm text-gray-700 leading-relaxed">{feedback.grammar_correctness}</p>
      </div>
      {/* ... (rest of the feedback formatting is the same) */}
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <h4 className="font-semibold text-blue-900 mb-2 text-base">Natural Usage</h4>
        <p className="text-sm text-gray-700 leading-relaxed">{feedback.natural_usage}</p>
      </div>
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <h4 className="font-semibold text-blue-900 mb-2 text-base">Suggestions for Improvement</h4>
        <p className="text-sm text-gray-700 leading-relaxed">{feedback.suggestions}</p>
      </div>
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <h4 className="font-semibold text-blue-900 mb-2 text-base">Alternative Examples</h4>
        {feedback.alternative_examples?.length > 0 ? (
          <div className="space-y-2">
            {feedback.alternative_examples.map((example, index) => (
              <div key={index} className="text-sm text-gray-700 leading-relaxed">{example}</div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500 italic">No alternative examples provided</p>
        )}
      </div>
    </div>
  );
  
  const EvaluationStatus = () => {
    if (!evaluationResult) return null;
    
    if (evaluationResult === 'good') {
      return (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
          <CheckCircle className="h-5 w-5 text-green-600" />
          <div>
            <p className="font-semibold text-green-800">Excellent Work!</p>
            <p className="text-sm text-green-700">Your example sentence is great. You can now save it to your vocabulary.</p>
          </div>
        </div>
      );
    }
    
    if (evaluationResult === 'needs_improvement') {
      return (
        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg flex items-center gap-3">
          <Lightbulb className="h-5 w-5 text-yellow-600" />
          <div>
            <p className="font-semibold text-yellow-800">Good Try!</p>
            <p className="text-sm text-yellow-700">Review the feedback above and try writing a new example to improve.</p>
          </div>
        </div>
      );
    }
    
    return null;
  };

  // --- RENDER ---
  return (
    <div className="min-h-screen bg-muted/50">
      <div className="container mx-auto py-8 px-4 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Interactive Learning</h1>
          <p className="text-muted-foreground">
            Enter a word, write an example, and get guided feedback from your AI Tutor.
          </p>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <p className="text-sm text-red-800">{error}</p>
              <Button size="sm" variant="ghost" onClick={() => setError(null)} className="ml-auto text-red-600 hover:text-red-800">×</Button>
            </div>
          </div>
        )}

        <div className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column: Word Analysis */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><BookOpen className="h-5 w-5" /> Word or Phrase</CardTitle>
                <CardDescription>Enter a new word or phrase you want to learn</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="word-phrase">Word/Phrase</Label>
                  <Input
                    id="word-phrase"
                    value={wordPhrase}
                    onChange={(e) => {
                      setWordPhrase(e.target.value);
                      // Clear state if user changes the word
                      setLearningState(null); 
                    }}
                    placeholder="e.g., ephemeral"
                    className="mt-2"
                  />
                </div>
                {wordAnalysis && (
                  <div className="space-y-4 p-4 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg border border-green-200">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-base text-gray-800">Analysis Results</h3>
                      <Badge className={`${getDifficultyColor(wordAnalysis.difficulty_level)} px-2 py-1 text-xs font-medium`}>
                        {wordAnalysis.difficulty_level.charAt(0).toUpperCase() + wordAnalysis.difficulty_level.slice(1)}
                      </Badge>
                    </div>
                    <div className="space-y-3">
                      <div className="bg-white p-3 rounded-md border border-gray-200">
                        <Label className="text-sm font-semibold text-gray-700 mb-1 block">Classification</Label>
                        <p className="text-sm text-gray-600 font-medium">{wordAnalysis.classification}</p>
                      </div>
                      <div className="bg-white p-3 rounded-md border border-gray-200">
                        <Label className="text-sm font-semibold text-gray-700 mb-1 block">Pronunciation</Label>
                        <div className="flex items-center gap-2">
                          <p className="text-sm text-gray-600 font-mono">{wordAnalysis.pronunciation}</p>
                          <Button size="sm" variant="outline" onClick={handlePlayPronunciation} title="Play pronunciation" className="h-7 w-7 p-0">
                            <Volume2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      <div className="bg-white p-3 rounded-md border border-gray-200">
                        <Label className="text-sm font-semibold text-gray-700 mb-1 block">Meaning</Label>
                        <p className="text-sm text-gray-600 leading-relaxed">{wordAnalysis.meaning}</p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Right Column: Example and Feedback */}
            <Card>
              <CardHeader>
                <CardTitle>Create and Refine Example</CardTitle>
                <CardDescription>Write a sentence, get feedback, and improve!</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="example-sentence">Your Example Sentence</Label>
                  <Textarea
                    id="example-sentence"
                    value={exampleSentence}
                    onChange={(e) => setExampleSentence(e.target.value)}
                    placeholder="Write a sentence using the word..."
                    className="min-h-[100px] mt-2"
                    disabled={isLoading}
                  />
                </div>

                <Button onClick={handleInteractiveSubmit} disabled={!wordPhrase.trim() || !exampleSentence.trim() || isLoading} className="w-full">
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Brain className="h-4 w-4 mr-2" />}
                  {evaluationResult === 'needs_improvement' ? 'Submit New Example' : 'Get Feedback'}
                </Button>

                <EvaluationStatus />

                {exampleFeedback && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                        <Brain className="h-5 w-5 text-blue-600" /> AI Feedback
                      </h3>
                      <p className="text-sm text-gray-600">Detailed analysis of your example sentence</p>
                    </div>
                    <div className="text-sm text-gray-700 leading-relaxed">
                      {formatFeedback(exampleFeedback)}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          {/* Save Card - Appears only when there's something to save */}
          {learningState && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Save className="h-5 w-5" /> Save to Vocabulary</CardTitle>
                <CardDescription>Save this word and your successful example to your personal vocabulary.</CardDescription>
              </CardHeader>
              <CardContent>
                {saved ? (
                  <div className="text-center py-8">
                    <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-green-600">Saved Successfully!</h3>
                    <p className="text-muted-foreground">Your vocabulary has been updated.</p>
                  </div>
                ) : (
                  <div>
                    <EvaluationStatus />
                    <Button onClick={handleSave} disabled={evaluationResult !== 'good' || isSaving} className="w-full mt-4">
                      {isSaving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
                      Save to Vocabulary
                    </Button>
                    {evaluationResult !== 'good' && (
                      <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                        <AlertCircle className="h-4 w-4" />
                        <span>You must have a successful evaluation to save.</span>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
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
  AlertCircle
} from 'lucide-react';
import { vocabularyService, WordAnalysisResponse, ExampleFeedbackResponse } from '@/services/vocabulary.service';

export default function LearnPage() {
  // Local state for form inputs
  const [wordPhrase, setWordPhrase] = useState('');
  const [exampleSentence, setExampleSentence] = useState('');
  const [saved, setSaved] = useState(false);
  
  // Local state for API responses
  const [wordAnalysis, setWordAnalysis] = useState<WordAnalysisResponse | null>(null);
  const [exampleFeedback, setExampleFeedback] = useState<ExampleFeedbackResponse | null>(null);
  
  // Local state for loading and error
  const [isAnalyzingWord, setIsAnalyzingWord] = useState(false);
  const [isGettingFeedback, setIsGettingFeedback] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyzeWord = async () => {
    if (!wordPhrase.trim()) return;
    
    setError(null);
    setIsAnalyzingWord(true);
    setWordAnalysis(null);
    
    try {
      const analysis = await vocabularyService.analyzeWord({ word_phrase: wordPhrase });
      setWordAnalysis(analysis);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error && 'response' in error 
        ? (error as { response?: { data?: { detail?: string } } }).response?.data?.detail || 'Failed to analyze word'
        : 'Failed to analyze word';
      setError(errorMessage);
    } finally {
      setIsAnalyzingWord(false);
    }
  };

  const handleGetFeedback = async () => {
    if (!wordPhrase.trim() || !exampleSentence.trim()) return;
    
    setError(null);
    setIsGettingFeedback(true);
    setExampleFeedback(null);
    
    try {
      const feedback = await vocabularyService.getExampleFeedback({
        word_phrase: wordPhrase,
        example_sentence: exampleSentence
      });
      setExampleFeedback(feedback);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error && 'response' in error 
        ? (error as { response?: { data?: { detail?: string } } }).response?.data?.detail || 'Failed to get feedback'
        : 'Failed to get feedback';
      setError(errorMessage);
    } finally {
      setIsGettingFeedback(false);
    }
  };

  const handleSave = async () => {
    if (!wordPhrase.trim() || !exampleSentence.trim() || !wordAnalysis || !exampleFeedback) return;

    setError(null);
    setIsSaving(true);
    
    try {
      // Convert structured feedback back to string format for storage
      const feedbackString = `**1. Grammar Correctness:**\n${exampleFeedback.grammar_correctness}\n\n**2. Natural Usage:**\n${exampleFeedback.natural_usage}\n\n**3. Suggestions for Improvement:**\n${exampleFeedback.suggestions}\n\n**4. Alternative Examples:**\n${exampleFeedback.alternative_examples.map((ex, i) => `${i + 1}. ${ex}`).join('\n')}`;

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
        setWordAnalysis(null);
        setExampleFeedback(null);
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
    
    // Use Web Speech API to pronounce the word
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(wordPhrase);
      utterance.lang = 'en-US';
      utterance.rate = 0.8;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    }
  };

  const handlePlayExample = () => {
    if (!exampleSentence.trim()) return;
    
    // Use Web Speech API to pronounce the example sentence
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(exampleSentence);
      utterance.lang = 'en-US';
      utterance.rate = 0.7;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    }
  };

  const getDifficultyColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatFeedback = (feedback: ExampleFeedbackResponse) => {
    return (
      <div className="space-y-4">
        {/* Grammar Correctness */}
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <h4 className="font-semibold text-blue-900 mb-2 text-base">Grammar Correctness</h4>
          <p className="text-sm text-gray-700 leading-relaxed">{feedback.grammar_correctness}</p>
        </div>

        {/* Natural Usage */}
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <h4 className="font-semibold text-blue-900 mb-2 text-base">Natural Usage</h4>
          <p className="text-sm text-gray-700 leading-relaxed">{feedback.natural_usage}</p>
        </div>

        {/* Suggestions */}
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <h4 className="font-semibold text-blue-900 mb-2 text-base">Suggestions for Improvement</h4>
          <p className="text-sm text-gray-700 leading-relaxed">{feedback.suggestions}</p>
        </div>

        {/* Alternative Examples */}
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <h4 className="font-semibold text-blue-900 mb-2 text-base">Alternative Examples</h4>
          {feedback.alternative_examples && feedback.alternative_examples.length > 0 ? (
            <div className="space-y-2">
              {feedback.alternative_examples.map((example, index) => (
                <div key={index} className="text-sm text-gray-700 leading-relaxed">
                  {example}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500 italic">No alternative examples provided</p>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-muted/50">
      <div className="container mx-auto py-8 px-4 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Learn New Words</h1>
          <p className="text-muted-foreground">
            Enter a word or phrase to get AI-powered analysis and create your own example.
          </p>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <p className="text-sm text-red-800">{error}</p>
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={() => setError(null)}
                className="ml-auto text-red-600 hover:text-red-800"
              >
                ×
              </Button>
            </div>
          </div>
        )}

        <div className="space-y-8">
          {/* Top Row - Word Input & Example Input */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Word Input */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Word or Phrase
                </CardTitle>
                <CardDescription>
                  Enter a new word or phrase you want to learn
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="word-phrase">Word/Phrase</Label>
                  <div className="flex gap-2 mt-2">
                    <Input
                      id="word-phrase"
                      value={wordPhrase}
                      onChange={(e) => setWordPhrase(e.target.value)}
                      placeholder="Enter word or phrase..."
                      disabled={isAnalyzingWord}
                    />
                    <Button 
                      onClick={handleAnalyzeWord}
                      disabled={!wordPhrase.trim() || isAnalyzingWord}
                    >
                      {isAnalyzingWord ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Brain className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                {/* Word Analysis Results */}
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
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={handlePlayPronunciation}
                            title="Play pronunciation"
                            className="h-7 w-7 p-0"
                          >
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

            {/* Example Input */}
            <Card>
              <CardHeader>
                <CardTitle>Create Example</CardTitle>
                <CardDescription>
                  Write a sentence using the word or phrase
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label htmlFor="example-sentence">Example Sentence</Label>
                    {exampleSentence.trim() && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={handlePlayExample}
                        title="Play example sentence"
                        className="h-7 w-7 p-0"
                      >
                        <Volume2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <Textarea
                    id="example-sentence"
                    value={exampleSentence}
                    onChange={(e) => setExampleSentence(e.target.value)}
                    placeholder="Write a sentence using the word..."
                    className="min-h-[100px]"
                    disabled={isGettingFeedback}
                  />
                </div>

                <Button 
                  onClick={handleGetFeedback}
                  disabled={!wordPhrase.trim() || !exampleSentence.trim() || isGettingFeedback}
                  variant="outline"
                  className="w-full"
                >
                  {isGettingFeedback ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <Brain className="h-4 w-4 mr-2" />
                  )}
                  Get AI Feedback
                </Button>

                {/* AI Feedback Section */}
                {exampleFeedback && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                        <Brain className="h-5 w-5 text-blue-600" />
                        AI Feedback
                      </h3>
                      <p className="text-sm text-gray-600">
                        Detailed analysis of your example sentence
                      </p>
                    </div>
                    <div className="text-sm text-gray-700 leading-relaxed">
                      {formatFeedback(exampleFeedback)}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>


          {/* Bottom Row - Save & Tips */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Save Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Save className="h-5 w-5" />
                  Save to Vocabulary
                </CardTitle>
                <CardDescription>
                  Save this word and example to your personal vocabulary
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {saved ? (
                  <div className="text-center py-8">
                    <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-green-600">Saved Successfully!</h3>
                    <p className="text-muted-foreground">Your vocabulary has been updated.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <h4 className="font-medium mb-2">Summary</h4>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <p><strong>Word:</strong> {wordPhrase || 'Not entered'}</p>
                        <p><strong>Classification:</strong> {wordAnalysis?.classification || 'Not analyzed'}</p>
                        <p><strong>Example:</strong> {exampleSentence || 'Not entered'}</p>
                      </div>
                    </div>

                    <Button 
                      onClick={handleSave}
                      disabled={!wordPhrase.trim() || !exampleSentence.trim() || !wordAnalysis || !exampleFeedback || isSaving}
                      className="w-full"
                    >
                      {isSaving ? (
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      ) : (
                        <Save className="h-4 w-4 mr-2" />
                      )}
                      Save to Vocabulary
                    </Button>

                    {(!wordPhrase.trim() || !exampleSentence.trim() || !wordAnalysis || !exampleFeedback) && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <AlertCircle className="h-4 w-4" />
                        <span>Complete all fields to save</span>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Learning Tips */}
            <Card>
              <CardHeader>
                <CardTitle>Learning Tips</CardTitle>
                <CardDescription>
                  Tips for effective vocabulary learning
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-primary">1</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Use context</p>
                    <p className="text-xs text-muted-foreground">Create meaningful examples that relate to your life</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-primary">2</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Practice regularly</p>
                    <p className="text-xs text-muted-foreground">Review words daily using spaced repetition</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-primary">3</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Make connections</p>
                    <p className="text-xs text-muted-foreground">Link new words to words you already know</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

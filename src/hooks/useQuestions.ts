import { useState, useEffect } from 'react';
import { tableTopicsQuestions } from '../data/questions';
import { saveQuestionsToStorage, loadQuestionsFromStorage, clearQuestionsFromStorage } from '../utils/localStorage';

export const useQuestions = () => {
  const [questions, setQuestions] = useState<string[]>(tableTopicsQuestions);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedQuestions = loadQuestionsFromStorage();
    if (savedQuestions && savedQuestions.length > 0) {
      setQuestions(savedQuestions);
    }
    setIsLoading(false);
  }, []);

  const saveQuestions = (newQuestions: string[]) => {
    if (newQuestions.length < 1 || newQuestions.length > 50) {
      throw new Error(`Expected between 1 and 50 questions, got ${newQuestions.length}`);
    }
    
    const allQuestionsValid = newQuestions.every(q => q.trim().length > 0);
    if (!allQuestionsValid) {
      throw new Error('All questions are required and must not be empty');
    }

    setQuestions(newQuestions);
    saveQuestionsToStorage(newQuestions);
  };

  const resetToDefaults = () => {
    setQuestions(tableTopicsQuestions);
    clearQuestionsFromStorage();
  };

  const updateQuestion = (index: number, newQuestion: string) => {
    if (index < 0 || index >= questions.length) {
      throw new Error('Invalid question index');
    }

    const updatedQuestions = [...questions];
    updatedQuestions[index] = newQuestion;
    setQuestions(updatedQuestions);
  };

  return {
    questions,
    isLoading,
    saveQuestions,
    resetToDefaults,
    updateQuestion,
    defaultQuestions: tableTopicsQuestions
  };
};
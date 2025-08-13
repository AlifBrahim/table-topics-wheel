const QUESTIONS_STORAGE_KEY = 'table-topics-questions';

export const saveQuestionsToStorage = (questions: string[]): void => {
  try {
    localStorage.setItem(QUESTIONS_STORAGE_KEY, JSON.stringify(questions));
  } catch (error) {
    console.error('Failed to save questions to localStorage:', error);
  }
};

export const loadQuestionsFromStorage = (): string[] | null => {
  try {
    const stored = localStorage.getItem(QUESTIONS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error('Failed to load questions from localStorage:', error);
    return null;
  }
};

export const clearQuestionsFromStorage = (): void => {
  try {
    localStorage.removeItem(QUESTIONS_STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear questions from localStorage:', error);
  }
};
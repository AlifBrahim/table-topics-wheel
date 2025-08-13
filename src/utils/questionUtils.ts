import { tableTopicsQuestions } from '../data/questions';

export const getRandomQuestion = (): string => {
  const randomIndex = Math.floor(Math.random() * tableTopicsQuestions.length);
  return tableTopicsQuestions[randomIndex];
};

export const getQuestionByIndex = (index: number): string => {
  if (index < 0 || index >= tableTopicsQuestions.length) {
    throw new Error(`Question index ${index} is out of range. Valid range is 0-${tableTopicsQuestions.length - 1}`);
  }
  return tableTopicsQuestions[index];
};

export const getRandomQuestionExcluding = (excludeIndices: number[]): string => {
  const availableIndices = tableTopicsQuestions
    .map((_, index) => index)
    .filter(index => !excludeIndices.includes(index));
  
  if (availableIndices.length === 0) {
    return getRandomQuestion();
  }
  
  const randomIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)];
  return tableTopicsQuestions[randomIndex];
};

export const getTotalQuestionCount = (): number => {
  return tableTopicsQuestions.length;
};
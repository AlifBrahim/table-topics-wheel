import Papa from 'papaparse';
import * as XLSX from 'xlsx';

export interface ImportResult {
  questions: string[];
  success: boolean;
  error?: string;
}

export const importQuestionsFromFile = (file: File): Promise<ImportResult> => {
  return new Promise((resolve) => {
    const fileExtension = file.name.toLowerCase().split('.').pop();
    
    if (fileExtension === 'csv') {
      importFromCSV(file, resolve);
    } else if (fileExtension === 'xlsx' || fileExtension === 'xls') {
      importFromExcel(file, resolve);
    } else {
      resolve({
        questions: [],
        success: false,
        error: 'Unsupported file format. Please upload a CSV or Excel file.'
      });
    }
  });
};

const importFromCSV = (file: File, resolve: (result: ImportResult) => void) => {
  Papa.parse(file, {
    complete: (results) => {
      try {
        const questions = extractQuestionsFromData(results.data as string[][]);
        const validationResult = validateQuestions(questions);
        resolve(validationResult);
      } catch (error) {
        resolve({
          questions: [],
          success: false,
          error: 'Error parsing CSV file. Please check the file format.'
        });
      }
    },
    error: () => {
      resolve({
        questions: [],
        success: false,
        error: 'Error reading CSV file. Please try again.'
      });
    },
    skipEmptyLines: true
  });
};

const importFromExcel = (file: File, resolve: (result: ImportResult) => void) => {
  const reader = new FileReader();
  
  reader.onload = (e) => {
    try {
      const data = new Uint8Array(e.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: 'array' });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as string[][];
      
      const questions = extractQuestionsFromData(jsonData);
      const validationResult = validateQuestions(questions);
      resolve(validationResult);
    } catch (error) {
      resolve({
        questions: [],
        success: false,
        error: 'Error parsing Excel file. Please check the file format.'
      });
    }
  };
  
  reader.onerror = () => {
    resolve({
      questions: [],
      success: false,
      error: 'Error reading Excel file. Please try again.'
    });
  };
  
  reader.readAsArrayBuffer(file);
};

const extractQuestionsFromData = (data: string[][]): string[] => {
  const questions: string[] = [];
  
  for (const row of data) {
    if (row && row.length > 0 && row[0]) {
      const question = String(row[0]).trim();
      if (question.length > 0) {
        questions.push(question);
      }
    }
  }
  
  return questions;
};

const validateQuestions = (questions: string[]): ImportResult => {
  if (questions.length === 0) {
    return {
      questions: [],
      success: false,
      error: 'No valid questions found in the file. Please ensure each row contains a question.'
    };
  }
  
  if (questions.length > 50) {
    return {
      questions: [],
      success: false,
      error: `Too many questions (${questions.length}). Maximum allowed is 50 questions.`
    };
  }
  
  const emptyQuestions = questions.filter(q => q.trim().length === 0);
  if (emptyQuestions.length > 0) {
    return {
      questions: [],
      success: false,
      error: 'Some questions are empty. Please ensure all questions have content.'
    };
  }
  
  return {
    questions,
    success: true
  };
};
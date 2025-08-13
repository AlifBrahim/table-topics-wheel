import React, { useState, useEffect } from 'react';

interface QuestionFormProps {
  questions: string[];
  onSave: (questions: string[]) => void;
  onReset: () => void;
  onClose: () => void;
  defaultQuestions: string[];
}

const QuestionForm: React.FC<QuestionFormProps> = ({
  questions,
  onSave,
  onReset,
  onClose,
  defaultQuestions
}) => {
  const [formQuestions, setFormQuestions] = useState<string[]>(questions);
  const [errors, setErrors] = useState<boolean[]>(new Array(questions.length).fill(false));
  const [isSaving, setIsSaving] = useState(false);
  const [questionCount, setQuestionCount] = useState(questions.length);

  useEffect(() => {
    setFormQuestions(questions);
    setErrors(new Array(questions.length).fill(false));
    setQuestionCount(questions.length);
  }, [questions]);

  const handleQuestionChange = (index: number, value: string) => {
    const newQuestions = [...formQuestions];
    newQuestions[index] = value;
    setFormQuestions(newQuestions);

    const newErrors = [...errors];
    newErrors[index] = value.trim().length === 0;
    setErrors(newErrors);
  };

  const clearQuestion = (index: number) => {
    handleQuestionChange(index, '');
  };

  const validateAndSave = async () => {
    const newErrors = formQuestions.map(q => q.trim().length === 0);
    setErrors(newErrors);

    const hasErrors = newErrors.some(error => error);
    if (hasErrors) {
      return;
    }

    setIsSaving(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      onSave(formQuestions);
      onClose();
    } catch (error) {
      console.error('Error saving questions:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all questions to defaults? This action cannot be undone.')) {
      setFormQuestions(defaultQuestions);
      setErrors(new Array(defaultQuestions.length).fill(false));
      setQuestionCount(defaultQuestions.length);
      onReset();
    }
  };

  const handleQuestionCountChange = (newCount: number) => {
    if (newCount < 1 || newCount > 50) return; // reasonable limits
    
    setQuestionCount(newCount);
    
    if (newCount > formQuestions.length) {
      // Add empty questions
      const additionalQuestions = new Array(newCount - formQuestions.length).fill('');
      setFormQuestions([...formQuestions, ...additionalQuestions]);
      setErrors([...errors, ...new Array(newCount - formQuestions.length).fill(false)]);
    } else if (newCount < formQuestions.length) {
      // Remove excess questions
      setFormQuestions(formQuestions.slice(0, newCount));
      setErrors(errors.slice(0, newCount));
    }
  };

  const addQuestion = () => {
    if (formQuestions.length >= 50) return; // reasonable limit
    setFormQuestions([...formQuestions, '']);
    setErrors([...errors, false]);
    setQuestionCount(formQuestions.length + 1);
  };

  const removeQuestion = (index: number) => {
    if (formQuestions.length <= 1) return; // must have at least one question
    const newQuestions = formQuestions.filter((_, i) => i !== index);
    const newErrors = errors.filter((_, i) => i !== index);
    setFormQuestions(newQuestions);
    setErrors(newErrors);
    setQuestionCount(newQuestions.length);
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <p className="text-sm text-gray-500">Edit your questions below. All fields are required.</p>
      </div>

      {/* Question Count Controls */}
      <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
        <div className="flex items-center justify-between mb-3">
          <label className="text-sm font-semibold text-gray-800">Number of Questions</label>
          <div className="flex items-center space-x-2">
            <input
              type="number"
              min="1"
              max="50"
              value={questionCount}
              onChange={(e) => handleQuestionCountChange(parseInt(e.target.value) || 1)}
              className="w-16 px-2 py-1 text-sm border border-gray-300 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500"
            />
            <button
              onClick={addQuestion}
              disabled={formQuestions.length >= 50}
              className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm flex items-center space-x-1 transition-colors"
              title="Add question"
            >
              <span>+</span>
            </button>
          </div>
        </div>
        <p className="text-xs text-gray-500">You can have between 1 and 50 questions</p>
      </div>
      
      <div className="space-y-6">
        {formQuestions.map((question, index) => (
          <div key={index} className="group">
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Question {index + 1} <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <textarea
                value={question}
                onChange={(e) => handleQuestionChange(index, e.target.value)}
                className={`w-full p-4 border-2 rounded-2xl resize-none transition-all duration-200 focus:outline-none ${
                  errors[index]
                    ? 'border-red-400 bg-red-50 focus:ring-4 focus:ring-red-100 focus:border-red-500'
                    : 'border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 hover:border-gray-300'
                }`}
                rows={2}
                placeholder="Enter your question here..."
                required
              />
              <div className="absolute top-3 right-3 flex space-x-1">
                {question && (
                  <button
                    onClick={() => clearQuestion(index)}
                    className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-100 rounded-lg transition-all duration-200"
                    title="Clear question"
                  >
                    <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                )}
                {formQuestions.length > 1 && (
                  <button
                    onClick={() => removeQuestion(index)}
                    className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-100 rounded-lg transition-all duration-200"
                    title="Remove question"
                  >
                    <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" clipRule="evenodd" />
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-4-8a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
            {errors[index] && (
              <p className="text-sm text-red-500 mt-2 flex items-center space-x-1">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span>This question is required</span>
              </p>
            )}
          </div>
        ))}
      </div>
      
      <div className="sticky bottom-0 bg-white pt-6 border-t border-gray-100 mt-8 mx-0 px-8 pb-8 -mb-8">
        <div className="flex justify-between items-center">
          <button
            onClick={handleReset}
            className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
            title="Reset to defaults"
          >
            <svg width="18" height="18" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
            </svg>
            <span>Reset</span>
          </button>
          
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="px-6 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-colors"
              disabled={isSaving}
            >
              Cancel
            </button>
            <button
              onClick={validateAndSave}
              disabled={isSaving || formQuestions.some(q => q.trim().length === 0)}
              className="px-8 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl flex items-center space-x-2"
            >
              {isSaving && (
                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              )}
              <span>{isSaving ? 'Saving...' : 'Save Questions'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionForm;
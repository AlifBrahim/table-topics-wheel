import React, { useEffect, useState } from 'react';
import QuestionForm from './QuestionForm';

interface QuestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  questions: string[];
  onSave: (questions: string[]) => void;
  onReset: () => void;
  defaultQuestions: string[];
  onQuestionCountChange: (count: number) => void;
  onImportQuestions: (questions: string[]) => void;
  continuousShuffle: boolean;
  onContinuousShuffleChange: (enabled: boolean) => void;
}

const QuestionModal: React.FC<QuestionModalProps> = ({
  isOpen,
  onClose,
  questions,
  onSave,
  onReset,
  defaultQuestions,
  onQuestionCountChange,
  onImportQuestions,
  continuousShuffle,
  onContinuousShuffleChange
}) => {
  const [displayQuestionCount, setDisplayQuestionCount] = useState(questions.length);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setDisplayQuestionCount(questions.length); // Update count when modal opens
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, questions.length]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-black/40 to-black/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={handleBackdropClick}
        style={{
          animation: 'fadeIn 0.3s ease-out'
        }}
      />
      
      {/* Modal */}
      <div
        className="relative w-full max-w-3xl mx-4 bg-white rounded-3xl shadow-2xl max-h-[85vh] flex flex-col backdrop-blur-sm"
        style={{
          animation: 'fadeIn 0.3s ease-out'
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Question Settings</h2>
                <p className="text-gray-500 mt-2">Customize your table topics questions</p>
              </div>
              
              {/* Question Count Controls */}
              <div className="flex items-center space-x-3 bg-gray-50 px-4 py-2 rounded-xl border border-gray-200">
                <label className="text-sm font-semibold text-gray-700">Questions:</label>
                <input
                  type="number"
                  min="1"
                  max="50"
                  value={displayQuestionCount}
                  onChange={(e) => {
                    const newCount = parseInt(e.target.value) || 1;
                    setDisplayQuestionCount(newCount);
                    onQuestionCountChange(newCount);
                  }}
                  className="w-16 px-2 py-1 text-sm border border-gray-300 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500"
                />
                <span className="text-xs text-gray-500">/ 50</span>
              </div>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="ml-4 p-3 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-2xl transition-all duration-200 hover:scale-105"
            aria-label="Close modal"
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto min-h-0">
          <div className="p-8 pb-0">
            <QuestionForm
              questions={questions}
              onSave={onSave}
              onReset={onReset}
              onClose={onClose}
              defaultQuestions={defaultQuestions}
              onQuestionCountChange={onQuestionCountChange}
              onImportQuestions={onImportQuestions}
              onFormQuestionsChange={(newQuestions) => setDisplayQuestionCount(newQuestions.length)}
              continuousShuffle={continuousShuffle}
              onContinuousShuffleChange={onContinuousShuffleChange}
            />
          </div>
        </div>

      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes fadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default QuestionModal;
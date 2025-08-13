import React, { useEffect } from 'react';
import QuestionForm from './QuestionForm';

interface QuestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  questions: string[];
  onSave: (questions: string[]) => void;
  onReset: () => void;
  defaultQuestions: string[];
}

const QuestionModal: React.FC<QuestionModalProps> = ({
  isOpen,
  onClose,
  questions,
  onSave,
  onReset,
  defaultQuestions
}) => {

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

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
        <div className="flex items-center justify-between p-8 border-b border-gray-100">
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Question Settings</h2>
            <p className="text-gray-500 mt-2">Customize your table topics questions</p>
          </div>
          <button
            onClick={onClose}
            className="p-3 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-2xl transition-all duration-200 hover:scale-105"
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
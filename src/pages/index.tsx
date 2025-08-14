import { useState } from "react";
import TableTopicsCard from "../components/TableTopicsCard";
import BriefcaseIcon from "../components/BriefcaseIcon";
import QuestionModal from "../components/QuestionModal";
import { useQuestions } from "../hooks/useQuestions";

export default function Home() {
  const { questions, isLoading, saveQuestions, updateQuestionsCount, resetToDefaults, defaultQuestions } = useQuestions();
  const [flippedCards, setFlippedCards] = useState<boolean[]>(
    new Array(questions.length).fill(false)
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBriefcaseOpen, setIsBriefcaseOpen] = useState(false);

  const handleCardClick = (index: number) => {
    setFlippedCards(prev => {
      const newFlippedCards = [...prev];
      newFlippedCards[index] = !newFlippedCards[index];
      return newFlippedCards;
    });
  };

  const handleBriefcaseClick = () => {
    setIsBriefcaseOpen(!isBriefcaseOpen);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setTimeout(() => setIsBriefcaseOpen(false), 300);
  };

  const handleSaveQuestions = (newQuestions: string[]) => {
    saveQuestions(newQuestions);
    setFlippedCards(new Array(newQuestions.length).fill(false));
  };

  const handleResetQuestions = () => {
    resetToDefaults();
    setFlippedCards(new Array(defaultQuestions.length).fill(false));
  };

  const handleQuestionCountChange = (count: number) => {
    if (count < 1 || count > 50) return;
    
    if (count > questions.length) {
      // Add empty questions temporarily
      const additionalQuestions = new Array(count - questions.length).fill('');
      const newQuestions = [...questions, ...additionalQuestions];
      updateQuestionsCount(newQuestions);
      setFlippedCards(new Array(count).fill(false));
    } else if (count < questions.length) {
      // Remove excess questions
      const newQuestions = questions.slice(0, count);
      updateQuestionsCount(newQuestions);
      setFlippedCards(new Array(count).fill(false));
    }
  };

  const handleImportQuestions = (importedQuestions: string[]) => {
    updateQuestionsCount(importedQuestions);
    setFlippedCards(new Array(importedQuestions.length).fill(false));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{background: 'radial-gradient(circle at center, #2B7A9B 0%, #1B5F7A 50%, #0D4A5F 100%)'}}>
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-center" style={{background: 'radial-gradient(circle at center, #2B7A9B 0%, #1B5F7A 50%, #0D4A5F 100%)'}}>
      <div className="container mx-auto px-4 mb-8 text-center">
        <h1 className="text-3xl font-bold text-white uppercase inline-block relative" style={{fontFamily: 'Gotham, Arial, sans-serif'}}>
          TABLE TOPICS GAMES
          <div className="absolute -top-1 -right-4 group">
            <div className="w-3 h-3 rounded-full border border-white flex items-center justify-center text-white text-xs italic cursor-help" style={{fontSize: '10px'}}>
              i
            </div>
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-2 text-sm text-white bg-gray-900 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
              Designed by Ahmad Azeem. Developed by Alif Ibrahim.
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900"></div>
            </div>
          </div>
        </h1>
      </div>
      
      <div className="border-t border-white mb-4"></div>
      
      <div className="overflow-x-auto pb-4 pt-4" style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        <div className="flex space-x-6 min-w-max pl-4 pr-4 py-2">
            {questions.map((question, index) => (
              <div key={index} className="flex-shrink-0">
                <TableTopicsCard 
                  isFlipped={flippedCards[index]}
                  onClick={() => handleCardClick(index)}
                  frontContent={
                    <p className="text-white text-base px-4">
                      {question}
                    </p>
                  }
                />
              </div>
            ))}
        </div>
      </div>
      
      <div className="border-t border-white mt-4"></div>
      
      {/* Briefcase Icon */}
      <div className="flex justify-center mt-8">
        <BriefcaseIcon 
          isOpen={isBriefcaseOpen} 
          onClick={handleBriefcaseClick}
        />
      </div>

      {/* Question Modal */}
      <QuestionModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        questions={questions}
        onSave={handleSaveQuestions}
        onReset={handleResetQuestions}
        defaultQuestions={defaultQuestions}
        onQuestionCountChange={handleQuestionCountChange}
        onImportQuestions={handleImportQuestions}
      />
    </div>
  );
}
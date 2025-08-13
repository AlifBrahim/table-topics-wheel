import { useState } from "react";
import TableTopicsCard from "../components/TableTopicsCard";
import BriefcaseIcon from "../components/BriefcaseIcon";
import QuestionModal from "../components/QuestionModal";
import { useQuestions } from "../hooks/useQuestions";

export default function Home() {
  const { questions, isLoading, saveQuestions, resetToDefaults, defaultQuestions } = useQuestions();
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

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{background: 'radial-gradient(circle at center, #2B7A9B 0%, #1B5F7A 50%, #0D4A5F 100%)'}}>
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-center" style={{background: 'radial-gradient(circle at center, #2B7A9B 0%, #1B5F7A 50%, #0D4A5F 100%)'}}>
      <div className="container mx-auto px-4 mb-8">
        <h1 className="text-3xl font-bold text-white text-center uppercase" style={{fontFamily: 'Gotham, Arial, sans-serif'}}>TABLE TOPICS GAMES</h1>
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
      />
    </div>
  );
}
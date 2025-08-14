import { useState, useRef } from "react";
import TableTopicsCard from "../components/TableTopicsCard";
import BriefcaseIcon from "../components/BriefcaseIcon";
import RandomizerButton from "../components/RandomizerButton";
import QuestionModal from "../components/QuestionModal";
import { useQuestions } from "../hooks/useQuestions";

export default function Home() {
  const { questions, isLoading, saveQuestions, updateQuestionsCount, resetToDefaults, defaultQuestions } = useQuestions();
  const [flippedCards, setFlippedCards] = useState<boolean[]>(
    new Array(questions.length).fill(false)
  );
  const [discardedCards, setDiscardedCards] = useState<boolean[]>(
    new Array(questions.length).fill(false)
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBriefcaseOpen, setIsBriefcaseOpen] = useState(false);
  const [isRandomizing, setIsRandomizing] = useState(false);
  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  const handleCardClick = (index: number) => {
    setFlippedCards(prev => {
      const newFlippedCards = [...prev];
      newFlippedCards[index] = !newFlippedCards[index];
      return newFlippedCards;
    });
  };

  const handleDiscardCard = (index: number) => {
    setDiscardedCards(prev => {
      const newDiscardedCards = [...prev];
      newDiscardedCards[index] = true;
      return newDiscardedCards;
    });
    // Flip card back to front when discarded
    setFlippedCards(prev => {
      const newFlippedCards = [...prev];
      newFlippedCards[index] = false;
      return newFlippedCards;
    });
    // Remove highlight if this card was selected
    if (selectedCardIndex === index) {
      setSelectedCardIndex(null);
    }
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
    setDiscardedCards(new Array(newQuestions.length).fill(false));
  };

  const handleResetQuestions = () => {
    resetToDefaults();
    setFlippedCards(new Array(defaultQuestions.length).fill(false));
    setDiscardedCards(new Array(defaultQuestions.length).fill(false));
  };

  const handleQuestionCountChange = (count: number) => {
    if (count < 1 || count > 50) return;
    
    if (count > questions.length) {
      // Add empty questions temporarily
      const additionalQuestions = new Array(count - questions.length).fill('');
      const newQuestions = [...questions, ...additionalQuestions];
      updateQuestionsCount(newQuestions);
      setFlippedCards(new Array(count).fill(false));
      setDiscardedCards(new Array(count).fill(false));
    } else if (count < questions.length) {
      // Remove excess questions
      const newQuestions = questions.slice(0, count);
      updateQuestionsCount(newQuestions);
      setFlippedCards(new Array(count).fill(false));
      setDiscardedCards(new Array(count).fill(false));
    }
  };

  const handleImportQuestions = (importedQuestions: string[]) => {
    updateQuestionsCount(importedQuestions);
    setFlippedCards(new Array(importedQuestions.length).fill(false));
    setDiscardedCards(new Array(importedQuestions.length).fill(false));
  };

  const handleRandomize = async () => {
    if (isRandomizing) return;
    
    // Get available (non-discarded) cards
    const availableIndexes = discardedCards
      .map((isDiscarded, index) => isDiscarded ? null : index)
      .filter(index => index !== null) as number[];
    
    if (availableIndexes.length === 0) return; // No cards available
    
    setIsRandomizing(true);
    setSelectedCardIndex(null);
    
    // Animate scrolling for 2.5 seconds
    const animationDuration = 2500;
    const startTime = Date.now();
    
    const animateScroll = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / animationDuration, 1);
      
      if (cardsContainerRef.current) {
        // Create a bouncing scroll effect
        const containerWidth = cardsContainerRef.current.scrollWidth - cardsContainerRef.current.clientWidth;
        const scrollPosition = Math.sin(elapsed * 0.01) * containerWidth * 0.5 + containerWidth * 0.5;
        cardsContainerRef.current.scrollLeft = scrollPosition;
      }
      
      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      } else {
        // Animation complete - select random card
        const randomIndex = availableIndexes[Math.floor(Math.random() * availableIndexes.length)];
        setSelectedCardIndex(randomIndex);
        
        // Scroll to selected card
        if (cardsContainerRef.current) {
          const cardElement = cardsContainerRef.current.children[0]?.children[randomIndex] as HTMLElement;
          if (cardElement) {
            cardElement.scrollIntoView({ behavior: 'smooth', inline: 'center' });
          }
        }
        
        // Flip the selected card to show question
        setTimeout(() => {
          setFlippedCards(prev => {
            const newFlippedCards = [...prev];
            newFlippedCards[randomIndex] = false; // Show front (question)
            return newFlippedCards;
          });
          
          setIsRandomizing(false);
        }, 800);
      }
    };
    
    animateScroll();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{background: 'radial-gradient(circle at center, #2B7A9B 0%, #1B5F7A 50%, #0D4A5F 100%)'}}>
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col" style={{background: 'radial-gradient(circle at center, #2B7A9B 0%, #1B5F7A 50%, #0D4A5F 100%)'}}>
      <div className="container mx-auto px-4 py-4 text-center flex-shrink-0">
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
      
      <div className="border-t border-white flex-shrink-0"></div>
      
      <div className="flex-1 flex justify-center overflow-visible">
        <div 
          ref={cardsContainerRef}
          className="w-full" 
          style={{scrollbarWidth: 'none', msOverflowStyle: 'none', overflowX: 'auto', overflowY: 'visible'}}
        >
          <style jsx>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          <div className="flex space-x-6 min-w-max pl-4 pr-4 pb-2 pt-8">
              {questions.map((question, index) => (
                <div 
                  key={index} 
                  className={`flex-shrink-0 transition-all duration-500 ${
                    selectedCardIndex === index && !discardedCards[index] ? 'transform scale-105' : ''
                  }`}
                >
                  <TableTopicsCard 
                    isFlipped={flippedCards[index]}
                    isDiscarded={discardedCards[index]}
                    isSelected={selectedCardIndex === index}
                    onClick={() => !isRandomizing && handleCardClick(index)}
                    onDiscard={() => handleDiscardCard(index)}
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
      </div>
      
      <div className="border-t border-white flex-shrink-0"></div>
      
      {/* Control Buttons */}
      <div className="relative py-12 flex-shrink-0 h-32">
        {/* Green Button - perfectly centered */}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <RandomizerButton 
            isRandomizing={isRandomizing}
            onClick={handleRandomize}
          />
        </div>
        
        {/* Briefcase - positioned next to green button */}
        <div className="absolute left-1/2 top-1/2 transform translate-x-8 -translate-y-1/2">
          <BriefcaseIcon 
            isOpen={isBriefcaseOpen} 
            onClick={handleBriefcaseClick}
          />
        </div>
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
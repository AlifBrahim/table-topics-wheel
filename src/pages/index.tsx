import { useState } from "react";
import TableTopicsCard from "../components/TableTopicsCard";
import { tableTopicsQuestions } from "../data/questions";

export default function Home() {
  const [flippedCards, setFlippedCards] = useState<boolean[]>(
    new Array(tableTopicsQuestions.length).fill(false)
  );

  const handleCardClick = (index: number) => {
    setFlippedCards(prev => {
      const newFlippedCards = [...prev];
      newFlippedCards[index] = !newFlippedCards[index];
      return newFlippedCards;
    });
  };

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
            {tableTopicsQuestions.map((question, index) => (
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
      
    </div>
  );
}
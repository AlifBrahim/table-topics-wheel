import React from 'react';
import Image from 'next/image';
import styles from './TableTopicsCard.module.css';

interface TableTopicsCardProps {
  isFlipped?: boolean;
  frontContent?: React.ReactNode;
  onClick?: () => void;
  isDiscarded?: boolean;
  onDiscard?: () => void;
}

const TableTopicsCard: React.FC<TableTopicsCardProps> = ({ 
  isFlipped = false, 
  frontContent,
  onClick,
  isDiscarded = false,
  onDiscard
}) => {
  const handleCardClick = () => {
    if (!isDiscarded && onClick) {
      onClick();
    }
  };

  const handleDiscardClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDiscard) {
      onDiscard();
    }
  };

  return (
    <div className={styles.cardContainer}>
      <div 
        className={`${styles.card} ${isFlipped ? styles.flipped : ''} ${isDiscarded ? styles.discarded : ''}`}
        onClick={handleCardClick}
      >
        <div className={styles.cardInner}>
          <div className={styles.cardFront}>
            <Image 
              src="/table-topics-wheel-back-card.svg"
              alt="Table Topics Card Back"
              fill
              className={styles.cardBackImage}
            />
            <div className={styles.questionContent}>
              {frontContent}
            </div>
          </div>
          <div className={styles.cardBack}>
            <Image 
              src="/table-topics-wheel-front-card.svg"
              alt="Table Topics Card Front"
              fill
              className={styles.cardFrontImage}
            />
          </div>
        </div>
      </div>
      <div className={styles.buttonArea}>
        {isFlipped && !isDiscarded && (
          <button 
            className={styles.discardButton}
            onClick={handleDiscardClick}
            aria-label="Discard card"
          >
            <Image 
              src="/card-discard.svg"
              alt="Discard"
              width={24}
              height={24}
            />
          </button>
        )}
      </div>
    </div>
  );
};

export default TableTopicsCard;
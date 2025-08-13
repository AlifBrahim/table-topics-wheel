import React from 'react';
import Image from 'next/image';
import styles from './TableTopicsCard.module.css';

interface TableTopicsCardProps {
  isFlipped?: boolean;
  frontContent?: React.ReactNode;
  onClick?: () => void;
}

const TableTopicsCard: React.FC<TableTopicsCardProps> = ({ 
  isFlipped = false, 
  frontContent,
  onClick 
}) => {
  return (
    <div 
      className={`${styles.card} ${isFlipped ? styles.flipped : ''}`}
      onClick={onClick}
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
  );
};

export default TableTopicsCard;
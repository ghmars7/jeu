import React from 'react';
import { Card }  from './types';


type CardDisplayProps = {
  card: Card;
}
  
const CardDisplay: React.FC<CardDisplayProps> = ({ card }) => {
  return (
    <div className="w-44 h-72 border rounded-xl p-2 flex flex-col items-center justify-center bg-white shadow-lg">
      <span className="text-lg font-bold">{card.rank}</span>
      <span className="text-3xl">{card.suit}</span>
    </div>
  );
};

export default CardDisplay;

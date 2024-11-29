import { FC } from 'react';
import { Card }  from './types';
import back from '../../assets/back.png'


type CardDisplayProps = {
  card: Card | null;
  isBack?: boolean;
}
  
const CardDisplay: FC<CardDisplayProps> = ({ card, isBack = false }) => {
  if (isBack || !card) {
    return (
      <div className="w-48 border rounded-xl flex items-center justify-center bg-white shadow-lg overflow-hidden">
        <img
          src={back}
          alt="Carte retournée"
          className="w-full h-full object-cover overflow-hidden"
        />
      </div>
    );
  }

  return (
    <div className="w-48 h-64 border rounded-xl p-2 flex flex-col items-center justify-center bg-white shadow-lg">
      <span className="text-lg font-bold">{card.rank}</span>
      <span className="text-3xl">{card.suit}</span>
    </div>
  );
};

export default CardDisplay;

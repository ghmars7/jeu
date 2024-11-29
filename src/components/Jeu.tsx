import { useState, useEffect } from 'react';
import CardDisplay from './Card/CardDisplay';
import { Card } from './Card/types';

const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'VALET', 'DAME', 'ROI', 'AS'];
const suits = ['♠', '♥', '♦', '♣'];

const generateDeck = (): Card[] => {
    let deck: Card[] = [];
    for (let suit of suits) {
    for (let rank of ranks) {
        deck.push({ rank, suit });
    }
    }
    return deck;
};

const Jeu = () => {
    const [deck, setDeck] = useState<Card[]>([]);
    const [playerCard, setPlayerCard] = useState<Card | null>(null);
    const [computerCard, setComputerCard] = useState<Card | null>(null);

    useEffect(() => {
        setDeck(generateDeck());
    }, []);

    const drawCards = () => {
        if (deck.length > 0) {
        const randomIndex = Math.floor(Math.random() * deck.length);
        const drawnCard = deck[randomIndex];
        setDeck(deck.filter((_, index) => index !== randomIndex));

        return drawnCard;
        }
        return null;
    };

    const startRound = () => {
        const playerCard = drawCards();
        const computerCard = drawCards();
        if (playerCard && computerCard) {
        setPlayerCard(playerCard);
        setComputerCard(computerCard);
        }
    };

    return (
        <div className="flex h-screen bg-[#313338]">
            <div className='flex-col w-full max-w-[1200px] mx-auto'>
                <div className='text-center text-white pt-4'>
                    <span className='text-2xl'>Bataille</span>
                </div>
                <div className='flex flex-row items-center justify-between h-1/2 '>
                    <div>
                        <div className="flex flex-col items-center">
                            {computerCard && <CardDisplay card={computerCard} />}
                            <h2 className="font-semibold text-lg text-white">Ordinateur</h2>
                        </div>
                    </div>

                    <div>
                        <div className="flex flex-col items-center">
                            {playerCard && <CardDisplay card={playerCard} />}
                            <h2 className="font-semibold text-lg text-white">Joueur</h2>
                        </div>
                    </div>
                </div>

                <div className='flex flex-row justify-center items-center'>
                    <div className=''>
                        <button onClick={startRound} className="bg-blue-500 text-white px-6 py-2 rounded-md shadow-lg hover:bg-blue-600 transition duration-200">
                        Jouer
                        </button>
                    </div>
                </div>
            </div>
           
            
        </div>
    );
};

export default Jeu;


/*

<div className="flex flex-col space-y-6">

                <div className="flex flex-row justify-between h-1/2 w-max">
                <div className="flex flex-col items-center">
                    {computerCard && <CardDisplay card={computerCard} />}
                    <h2 className="font-semibold text-lg text-white">Ordinateur</h2>
                </div>
              
                </div>

                <div className=''>
                    <button onClick={startRound} className="bg-blue-500 text-white px-6 py-2 rounded-md shadow-lg hover:bg-blue-600 transition duration-200">
                    Jouer
                    </button>
                </div>

            </div>


*/
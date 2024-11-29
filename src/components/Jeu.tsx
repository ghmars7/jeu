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
    const [playerDeck, setPlayerDeck] = useState<Card[]>([]);
    const [computerDeck, setComputerDeck] = useState<Card[]>([]);
    const [playerCard, setPlayerCard] = useState<Card | null>(null);
    const [computerCard, setComputerCard] = useState<Card | null>(null);
    const [roundWinner, setRoundWinner] = useState<string | null>(null);

    const [batailleDeck, setBatailleDeck] = useState<Card[]>([]);

    const getCardValue = (card: Card) => {
        const valueOrder = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'VALET', 'DAME', 'ROI', 'AS'];
        return valueOrder.indexOf(card.rank);
    };
    
    useEffect(() => {
        const shuffledDeck = generateDeck();
        shuffledDeck.sort(() => Math.random() - 0.5);

        const playerCards = shuffledDeck.slice(0, 26);
        const computerCards = shuffledDeck.slice(26, 52);

        setPlayerDeck(playerCards);
        setComputerDeck(computerCards);
        setDeck(shuffledDeck);
    }, []);


    const drawCards = () => {
        const playerCard = playerDeck[0];
        const computerCard = computerDeck[0];

        setPlayerDeck(playerDeck.slice(1));
        setComputerDeck(computerDeck.slice(1));

        return { playerCard, computerCard };
    };


    const startRound = () => {
        if (playerDeck.length === 0 || computerDeck.length === 0) {
            setRoundWinner(playerDeck.length === 0 ? 'Ordinateur' : 'Joueur');
            return;
        }

        const { playerCard, computerCard } = drawCards();
        setPlayerCard(playerCard);
        setComputerCard(computerCard);

        if (getCardValue(playerCard) > getCardValue(computerCard)) {
            setPlayerDeck((prev) => [...prev, playerCard, computerCard]); 
            setRoundWinner('Joueur');
        } else if (getCardValue(playerCard) < getCardValue(computerCard)) {
            setComputerDeck((prev) => [...prev, playerCard, computerCard]); 
            setRoundWinner('Ordinateur');
        } else if (getCardValue(playerCard) === getCardValue(computerCard)) {
            setRoundWinner('Bataille');
            handleBattle(playerCard, computerCard);
        }
        console.log(getCardValue(computerCard))
        console.log(getCardValue(playerCard))
    };


    const handleBattle = (playerCard: Card, computerCard: Card) => {
        if (playerDeck.length < 2 || computerDeck.length < 2) {
            setRoundWinner(playerDeck.length === 0 ? 'Ordinateur' : 'Joueur');
            return;
        }

        const playerHiddenCard = playerDeck[1];
        const computerHiddenCard = computerDeck[1];

        const playerVisibleCard = playerDeck[2];
        const computerVisibleCard = computerDeck[2];

        setPlayerDeck(playerDeck.slice(3));
        setComputerDeck(computerDeck.slice(3));

        
        if (getCardValue(playerVisibleCard) > getCardValue(computerVisibleCard)) {
            setPlayerDeck((prev) => [
                ...prev,
                playerCard,
                computerCard,
                playerHiddenCard,
                computerHiddenCard,
                playerVisibleCard,
                computerVisibleCard,
            ]);
            setRoundWinner('Joueur');
        } else if (getCardValue(playerVisibleCard) < getCardValue(computerVisibleCard)) {
            setComputerDeck((prev) => [
                ...prev,
                playerCard,
                computerCard,
                playerHiddenCard,
                computerHiddenCard,
                playerVisibleCard,
                computerVisibleCard,
            ]);
            setRoundWinner('Ordinateur');
        } else {
            setRoundWinner('Bataille');
            handleBattle(playerVisibleCard, computerVisibleCard);
        }
    };


    return (
        <div className="flex h-screen bg-[#313338]">
            <div className='flex-col w-full max-w-[1200px] mx-auto'>
                <div className='text-center text-white pt-4'>
                    <span className='text-2xl'>Bataille</span>
                </div>
                <div className='flex flex-row items-center justify-between h-1/2 max-w-[800px] mx-auto'>
                    <div>
                        <div className="flex flex-col items-center">
                            <CardDisplay card={computerCard || null} isBack={!computerCard} />
                            <div className="font-semibold text-lg text-white text-center">Ordinateur <br />
                                {computerDeck.length} cartes
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="flex flex-col items-center">
                            <CardDisplay card={playerCard || null} isBack={!playerCard} />                            
                            <div className="font-semibold text-lg text-white text-center">Joueur <br />
                                {playerDeck.length} cartes
                            </div>
                        </div>
                    </div>
                </div>

                <div className='flex flex-col gap-5 justify-center items-center'>
                    <h3 className="text-white text-lg font-semibold mt-4">{roundWinner && `Gagnant du tour : ${roundWinner}`}</h3>
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


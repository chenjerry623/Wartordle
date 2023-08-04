import {useState} from 'react'

const useWordle = (solution, pokelist) => {
    const [turn, setTurn] = useState(0);
    const [currentGuess, setCurrentGuess] = useState('');
    // array of arrays:
    const [guesses, setGuesses] = useState([...Array(6)]);
    // array of strings:
    const [history, setHistory] = useState([]);
    const [isCorrect, setIsCorrect] = useState(false);

    const pokemonArray = useState(pokelist);

    const currentSolution = solution.solution;



    // add a new guess into the guesses
    // update isCorrect if correct
    // increase turn
    const addNewGuess = () => {
        
        if (currentGuess === currentSolution) {
            setIsCorrect(true);
        }
        setGuesses(prevGuesses => {
            let newGuesses = [...prevGuesses];
            newGuesses[turn] = currentGuess;
            return newGuesses
        })
        setHistory(prevHistory => {
            return [...prevHistory, currentGuess]
        })
        setTurn(prevTurn => {
            return prevTurn + 1;
        })
        
        setCurrentGuess('');
    }


    // handle keyup and track current guess
    // add guess if enter is pressed
    const handleKeyup = ({key}) => {

        if (key === 'Enter' && (searchPokemon(currentGuess) !== false)) {
            if (turn > 5) {
                console.log('out of turns');
                return
            }
            if (history.includes(currentGuess)) {
                console.log('you already tried that pokemon');
                return
            }
            addNewGuess();
        }



        if (key === 'Backspace') {
            setCurrentGuess(prev => prev.slice(0, -1));

            return
        }

        if (/^[A-Za-z]$/.test(key) || key === "-") {
            setCurrentGuess(prev => prev + key)
        }
    }

    const searchPokemon = (pokemon) => {
        let found = false;
        pokemonArray[0].pokelist.map((entry) => {
            
            if (found === false) {
                if (entry.name === pokemon) {
                    found = true;
                    return entry;
                }
            }
        })
        if (found === false) {
            return false;
        }
    }


    return {turn, currentGuess, guesses, isCorrect, handleKeyup}

}

export default useWordle


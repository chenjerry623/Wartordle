import React, {useState, useEffect} from 'react'
import useWordle from '../hooks/useWordle'
import Grid from './Grid'
import Modal from './Modal';
import Categories from './Categories';

export default function Wordle({solution, pokelist, solutionImageLink}) {
    const {currentGuess, guesses, turn, isCorrect, handleKeyup} = useWordle(solution={solution}, pokelist={pokelist});
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        window.addEventListener('keyup', handleKeyup);

        if (isCorrect) {
            console.log("you win!");
            setTimeout(() => setShowModal(true), 2000)
            window.removeEventListener('keyup', handleKeyup)
        }

        if (turn > 5) {
            setTimeout(() => setShowModal(true), 2000)
            window.removeEventListener('keyup', handleKeyup)
        }

        return () => window.removeEventListener('keyup', handleKeyup)
    }, [handleKeyup, isCorrect, turn])

    

    

    return (
        <div>
            <div>Current Guess - {currentGuess}</div>
            <Categories/>
            <Grid guesses = {guesses} solution = {solution} turn = {turn} pokelist = {pokelist}/>
            {showModal && <Modal isCorrect={isCorrect} turn = {turn} solution={solution.solution} solutionImageLink={solutionImageLink}/>}
        </div>
    )
}


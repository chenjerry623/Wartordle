import React, { useEffect } from 'react'

const Modal = ({isCorrect, turn, solution, solutionImageLink}) => {

    
  return (
    <div className='modal'>
        {isCorrect && (
            <div>
                <h1>You Win!</h1>
                <p className='solution'>{solution}</p>
                <img src={solutionImageLink} height='300px'/>
                <p>You found the word in {turn} guesses</p>
            </div>
        )}
        {!isCorrect && (
            <div>
                <h1>Unlucky!</h1>
                <p className='solution'>{solution}</p>
                <img src={solutionImageLink} height='300px'/>
                <p>Better luck next time</p>
            </div>
        )}
        </div>
  )
}

export default Modal
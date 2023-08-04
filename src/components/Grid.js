

import React from 'react'
import Row from './Row'

export default function Grid({ guesses, solution, turn, pokelist }) {
    return (
        <div className='square-container'>
          {guesses.map((g, i) => {
            return <Row key={i} guess={g} solution = {solution} pokelist = {pokelist}/> 
          })}
        </div>
    )
  }
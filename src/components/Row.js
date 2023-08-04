import React from 'react'
import { useState, useEffect } from 'react';

export default function Row({guess, solution, pokelist}) {

  const pokemonArray = useState(pokelist);

  const searchPokemon = (pokemon) => {
    var result = null;
    pokemonArray[0].pokelist.map((entry) => {
        
        if (result === null) {
            if (entry.name === pokemon) {
                result = entry;
                return result;
            }
        }
    })

    if (result !== null) {
      return result;
    }
    else {
        return false;
    }
}

const getRegion = (id) => {
  if (id <= 151) {
    return "Kanto";
  } else if (id <= 251) {
    return "Johto";
  } else if (id <= 386) {
    return "Hoenn";
  } else if (id <= 493) {
    return "Sinnoh";
  } else if (id <= 649) {
    return "Unova";
  } else if (id <= 721) {
    return "Kalos";
  } else if (id <= 809) {
    return "Alola";
  } else if (id <= 905) {
    return "Galar";
  } else {
    return "Paldea";
  }
}

const currentPokemon = searchPokemon(guess);
const [currentInfo, setCurrentInfo] = useState({
  name: guess,
  type: null,
  region: null,
  weight: null,
  height: null,
  base: null,
  image:null
})


const solutionPokemon = searchPokemon(solution.solution);
const [solutionInfo, setSolutionInfo] = useState({
  name: solution.solution,
  type: null,
  region: null,
  weight: null,
  height: null,
  base: null
})

useEffect(() => {
  if (guess !== null) {
    // fetching info for guessed pokemon
    fetch(currentPokemon.url)
    .then(res => res.json())
    .then(json => {
      const pokemonInfo = json;
      const currentRegion = getRegion(pokemonInfo.id)
      fetch(pokemonInfo.species.url)
      .then(res2 => res2.json())
      .then(speciesjson => {
        const speciesInfo = speciesjson;
        fetch(speciesInfo.evolution_chain.url)
        .then(res3 => res3.json())
        .then(evolutionjson => {
          const baseForm = evolutionjson.chain.species.name;
          setCurrentInfo({
            name: guess,
            type: pokemonInfo.types[0].type.name,
            region: currentRegion,
            weight: Math.round(pokemonInfo.weight * 0.1),
            height: pokemonInfo.height * 10,
            base: baseForm,
            image:pokemonInfo.sprites.front_default
          })
        })
      })
      

    })

    fetch(solutionPokemon.url)
    .then(res => res.json())
    .then(json => {
      const solutionPokemonInfo = json;
      const currentRegion = getRegion(solutionPokemonInfo.id)

      fetch(solutionPokemonInfo.species.url)
      .then(res2 => res2.json())
      .then(speciesjson => {
        const speciesInfo = speciesjson;
        fetch(speciesInfo.evolution_chain.url)
        .then(res3 => res3.json())
        .then(evolutionjson => {
          const baseForm = evolutionjson.chain.species.name;
          setSolutionInfo({
            name: solution.solution,
            type: solutionPokemonInfo.types[0].type.name,
            region: currentRegion,
            weight: Math.round(solutionPokemonInfo.weight * 0.1),
            height: solutionPokemonInfo.height * 10,
            base: baseForm,
          })
        })
      })


      

    })
  }
  
})
  

if (guess) {

  let nameStatus = "grey";
  let typeStatus = "grey";
  let regionStatus = "grey";
  let weightStatus = "grey-nocap";
  let heightStatus = "grey-nocap";
  let baseStatus = "grey";

  if (currentInfo.name === solutionInfo.name) {
    nameStatus = "green";
  }

  if (currentInfo.type === solutionInfo.type) {
    typeStatus = "green";
  }

  if (currentInfo.region === solutionInfo.region) {
    regionStatus = "green";
  }


  let weightText = currentInfo.weight + " kg ";
  if (currentInfo.weight === solutionInfo.weight) {
    weightStatus = "green-nocap";
  } else {
    if (currentInfo.weight > solutionInfo.weight) {
      weightText = weightText + "↓";
    }

    else {
      weightText = weightText + "↑";
    }
  }

  let heightText = currentInfo.height + " cm ";

  if (currentInfo.height === solutionInfo.height) {
    heightStatus = "green-nocap";
  } else {
    if (currentInfo.height > solutionInfo.height) {
      heightText = heightText + "↓";
    } else {
      heightText = heightText + "↑";
    }
  }

  if (currentInfo.base === solutionInfo.base) {
    baseStatus = "green";
  }

  return (
    <div className="row past">
      
      <div className={nameStatus}> <img src={currentInfo.image} height='100%'/></div>
      <div className={nameStatus}>{currentInfo.name}</div>
      <div className={typeStatus}>{currentInfo.type}</div>
      <div className={regionStatus}>{currentInfo.region}</div>
      <div className={weightStatus}>{currentInfo.weight && weightText} </div>
      <div className={heightStatus}>{currentInfo.height && heightText} </div>
      <div className={baseStatus}>{currentInfo.base}</div>
    </div>
  )
}


return (
  <div className="row">
    <div className='square'></div>
    <div className='square'></div>
    <div className='square'></div>
    <div className='square'></div>
    <div className='square'></div>
    <div className='square'></div>
    <div className='square'></div>
  </div>
)

}
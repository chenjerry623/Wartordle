import Wordle from './components/Wordle';
import { useEffect, useState } from 'react';
//import solutions from './constants/solutions'


function App() {

  const [solution, setSolution] = useState();
  const [pokemonList, setPokemonList] = useState([]);
  const [solutionLink, setSolutionLink] = useState('');

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=1010')
      .then(res => res.json())
      .then(json => {
        console.log("json results: ")
        console.log(json.results);
        setPokemonList(json.results);
        const randomSolution = json.results[Math.floor(Math.random() * json.results.length)];
        setSolution(randomSolution.name);
        fetch(randomSolution.url)
        .then(res2 => res2.json())
        .then(pokejson => {
          setSolutionLink(pokejson.sprites.front_default);
        })

        // re add later
        
        
        console.log("original pokelist results: ")
        console.log(pokemonList);
      })
  }, [setSolution])



  return (
    <div className="App">
      <h1> Wartordle</h1>
      {solution && <Wordle solution = {solution} pokelist = {pokemonList} solutionImageLink = {solutionLink}/>}
      
    </div>
  )

}

export default App;

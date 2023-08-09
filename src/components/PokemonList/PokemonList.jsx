import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import "./PokemonList.css";
import Pokemon from "../Pokemon/Pokemon";
// import PokemonDetails from "../PokemonDetails/PokemonDetails";

function PokemonList() {
  // if you pass dependecy array then component wil not render again n again, so do it !

  // const [pokemonList, setPokemonList] = useState([]);
  // const [isLoading, setIsLoading] = useState(true)

  // const [POKEDEX_URL,setPokedexUrl] = useState('https://pokeapi.co/api/v2/pokemon');

  // const [nextUrl, setNextUrl] = useState('');
  // const [prevUrl, setPrevUrl] = useState('');

  const [pokemonListState, setPokemonListState] = useState({
      pokemonList: [],
      isLoading: true,
      POKEDEX_URL: 'https://pokeapi.co/api/v2/pokemon',
      nextUrl: '',
      prevUrl: '',
    }) 

    async function downloadPokemons() {
      setPokemonListState( (state) => ( { ...state, isLoading: true } ));

      const response = await axios.get(pokemonListState.POKEDEX_URL); //* download list of 20 Pokemons

      const pokemonResults = response.data.results; // array of objects {name and url(for each pokemon)}  //* details for each pokemon in its own url so we need that url to extract their info's
      console.log("Initial Response \n", response.data);

      setPokemonListState( (state) => ({
        ...state,
        nextUrl: response.data.next,
        prevUrl: response.data.previous,
      }));

      // iterating over the array of pokemon and using their url to create an array of promise that will download that 20 pokemons
      const pokemonResultPromise = pokemonResults.map((pokemon) =>
        axios.get(pokemon.url)
      ); // pokemonResultPromise will store the result of url of pokemon object

      console.log("pokemonResultPromise", pokemonResultPromise);

      // passing tthat promise to axios.all and it will await
      const pokemonData = await axios.all(pokemonResultPromise); // array of 20 pokemon detail data
      console.log("pokemonData", pokemonData);

      // const result = {
      //     name: pokemonData[0].data.name,
      //     image: pokemonData[0].data.sprites.back_default  //! this will give you the link of image from github
      // }

      //iterate on data of each pokemon and extract id, name, images, type
      
      const PokeListResult = pokemonData.map((pokeData) => {
        const pokemon = pokeData.data;
        return {
          id: pokemon.id,
          name: pokemon.name,
          image: pokemon.sprites.other ? pokemon.sprites.other.dream_world.front_default : pokemon.sprites.front_shiny,
          types: pokemon.types,
        };
      });

      console.log("result", PokeListResult);

      setPokemonListState( (state) => ({
        ...state,
        pokemonList: PokeListResult,
        isLoading: false
      }));
    }

  //! sara ka sara kamal useEffect kr rha h
  useEffect(() => {
    downloadPokemons();
  }, [pokemonListState.POKEDEX_URL]);

  

  return (
    <>
      <div className="pokemon-list-container">
        <h2 id="pokemon-list-heading">Pokemon List</h2>
        <div className="pokemon-btns">

          <button className="nav-btn" disabled={pokemonListState.prevUrl === null}
            onClick={ () => {
              const urlToSet = pokemonListState.prevUrl;
              setPokemonListState( { ...pokemonListState, POKEDEX_URL: urlToSet })
            }} > {" "} ⏮️ Prev{" "} 
            </button>

          <button className="nav-btn" disabled={pokemonListState.nextUrl === null}
           onClick={ () => {
            const urlToSet = pokemonListState.nextUrl;
            setPokemonListState( { ...pokemonListState, POKEDEX_URL: urlToSet })
          }} > {" "} Next ⏭️{" "}
          </button>

        </div>
        <div className="pokemon-list">
          {pokemonListState.isLoading ? "Loading..." : pokemonListState.pokemonList.map((pokemon) => (
                <Pokemon
                  name={pokemon.name}
                  image={pokemon.image}
                  key={pokemon.id}
                  id={pokemon.id}
                />
              ))}
        </div>
      </div>
    </>
  );
}

export default PokemonList;

import { useParams } from "react-router-dom"
import axios from "axios";
import { useEffect, useState } from "react";
import './PokemonDetails.css';

function PokemonDetails() {
    const {id }= useParams();
    // console.log(id);

    const [pokemon, setpokemon] = useState({})

    async function downloadPokemon(){
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        console.log(response.data);
        setpokemon({
            name: response.data.name,
            image: response.data.sprites.other.dream_world.front_default,
            weight: response.data.weight,
            height: response.data.height,
            types: response.data.types.map( (t) => t.type.name )
        })
    }

    useEffect( () => {
        downloadPokemon();
    }, [] )




  return (
    <>
        <div className="pokemon-details-wrapper" >
            <h1 id='pokedex-heading'>Pokedex</h1>
            <div className="pokemon-container">
                <div className="pokemon-name" >Name : {pokemon.name}</div>
                <img src={pokemon.image} alt="" className="pokemon-image" />
                <div className="pokemon-body">
                    <div>Height: {pokemon.height}</div>
                    <div>Weight: {pokemon.weight}</div>
                </div>
               
                <div className="pokemon-details-types">
                    <span id="pokemon-type">Types: </span>
                    <span id="pokemon-type-key">
                        {pokemon.types && pokemon.types.map( (t) => <div key={t}> {t} </div> )}
                    </span>
                </div>
            </div>
            

        </div>
    </>
  )
}

export default PokemonDetails
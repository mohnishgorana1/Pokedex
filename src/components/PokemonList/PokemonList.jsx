
import "./PokemonList.css";
import Pokemon from "../Pokemon/Pokemon";
import usePokemonList from "../../hooks/usePokemonList";


function PokemonList() {

  const { pokemonListState , setPokemonListState } = usePokemonList();
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

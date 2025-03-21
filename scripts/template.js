function getSmallBoxTemplate(indexPokemon) {
    return `<div id="small_box" class="small-box">
                    <div id="id_number_${indexPokemon}" class="id-number">#${pokemons[indexPokemon].id}</div>
                    <div class="name">${pokemons[indexPokemon].name}</div>
                    <div class="pokemon-type">
                        <div class="types">
                            <div><span>Grass</span></div>
                            <div><span>Poison</span></div>
                        </div>
                        <img class="pokemon-small-img" src="./assets/img/pokemon.png" alt="pokemon">
                    </div>
                </div>`
}
function getSmallBoxTemplate(indexPokemon) {
    return `<div id="small_box_${indexPokemon}" class="small-box">
                    <div id="id_number_${indexPokemon}" class="id-number">#${pokemons[indexPokemon].id}</div>
                    <div class="name">${pokemons[indexPokemon].name}</div>
                    <div class="pokemon-type">
                        <div class="types" id="types_${indexPokemon}">
                        </div>
                        <img class="pokemon-small-img" src="${pokemons[indexPokemon].sprites.other.dream_world.front_default}" alt="pokemon">
                    </div>
                </div>`
}


function getTypesTemplate(indexPokemon, indexType) {
    return `<div><span>${pokemons[indexPokemon].types[indexType].type.name}</span></div>`
}



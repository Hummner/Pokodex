function getSmallBoxTemplate(indexPokemon) {
    return `<div id="small_box_${indexPokemon}" class="small-box" onclick="showDialog(${indexPokemon})">
                    <div id="id_number_${indexPokemon}" class="id-number">#${pokemons[indexPokemon].id}</div>
                    <div class="name uppercase">${pokemons[indexPokemon].name}</div>
                    <div class="pokemon-type">
                        <div class="types" id="types_${indexPokemon}">
                        </div>
                        <img class="pokemon-small-img" src="${pokemons[indexPokemon].sprites.other.dream_world.front_default}" alt="pokemon">
                    </div>
                </div>`
}


function getTypesTemplate(indexPokemon, indexType) {
    return `<div class="uppercase"><span class="uppercase">${pokemons[indexPokemon].types[indexType].type.name}</span></div>`
}


function getDialogNavbarTemplate(indexPokemon) {
    return `<span onclick="showAbout(${indexPokemon})">About</span>
            <span onclick="showBasestats(${indexPokemon})>Base stats</span>
            <span>Gender</span>
            <span>Shiny</span>`
}


function getShowAboutTemplate(indexPokemon) {
    pokemons[indexPokemon].weight = pokemons[indexPokemon].weight / 10;
    pokemons[indexPokemon].height = pokemons[indexPokemon].height / 10;
    return `<table>
                <tr>
                    <td>Name:</td>
                    <td class="uppercase">${pokemons[indexPokemon].name}</td>
                </tr>
                <tr>
                    <td>Height:</td>
                    <td class="uppercase">${pokemons[indexPokemon].height} meter</td>
                </tr>
                <tr>
                    <td>Weight:</td>
                    <td class="uppercase">${pokemons[indexPokemon].weight} kg</td>
                </tr>
                <tr>
                    <td>Abilities:</td>
                    <td class="uppercase" id="abilities_${indexPokemon}"></td>
                </tr>
            </table>`
}
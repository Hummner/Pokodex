// name, type, id, img
const BASE_URL = "https://pokeapi.co/api/v2/pokemon";
let pokemons = [];

console.log(pokemons);


function init() {
    getPokemons();
    

}



function renderPokemons() {
    let contentRef = document.getElementById("content");
    contentRef.innerHTML = "";

    for (let indexPokemon = 0; indexPokemon < pokemons.length; indexPokemon++) {

        contentRef.innerHTML += getSmallBoxTemplate(indexPokemon);
        renderTypes(indexPokemon);
    }
}

function renderTypes(indexPokemon) {
    let typesRef = document.getElementById("types_" + indexPokemon);
    typesRef.innerHTML = "";

    for (let indexType = 0; indexType < pokemons[indexPokemon].types.length; indexType++) {
        typesRef.innerHTML += getTypesTemplate(indexPokemon, indexType);
        renderBackgroundColor(indexPokemon, indexType)
    }

    
}


function renderBackgroundColor(indexPokemon, indexType) {
    let smallBoxRef = document.getElementById("small_box_" + indexPokemon)

    let type = pokemons[indexPokemon].types[indexType].type.name;
    if (type == "fire") {
        smallBoxRef.style.background = "linear-gradient(135deg, rgb(107, 59, 40), rgb(226, 174, 153)"
    }
}



async function getPokemons() {
    

    for (let indexID = 1; indexID < 21; indexID++) {
         let pokemonData = await loadData(indexID);
         pokemons.push(pokemonData);
    }

    console.log(pokemons)
    renderPokemons();
}

 async function loadData(path="") {
    let response = await fetch(BASE_URL + "/" + path)
    let responseJSON =  await response.json();
    return responseJSON

   
}
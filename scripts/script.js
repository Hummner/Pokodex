// name, type, id, img
const BASE_URL = "https://pokeapi.co/api/v2/pokemon"


function init() {
    getPokemons();
    

}

let pokemons = [];

function renderPokemons() {
    let contentRef = document.getElementById("content");
    contentRef.innerHTML = "";

    for (let indexPokemon = 0; indexPokemon < pokemons.length; indexPokemon++) {
        contentRef.innerHTML += getSmallBoxTemplate(indexPokemon);
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
// name, type, id, img
const BASE_URL = "https://pokeapi.co/api/v2/pokemon";
let pokemons = [];
let pokemonQuantity = 20;

console.log(pokemons);


function init() {
    getPokemons();
}

function renderPokemons() {
    let contentRef = document.getElementById("content");
    let morePokemonBtn = document.getElementById("more_pokemon_btn")
    contentRef.innerHTML = "";

    for (let indexPokemon = 0; indexPokemon < 20; indexPokemon++) {

        contentRef.innerHTML += getSmallBoxTemplate(indexPokemon);
        renderTypes(indexPokemon);
    }
    morePokemonBtn.innerHTML = `<button onclick="renderMorePokemons()" class="more-button">More Pokemon</button>`;
}

function renderMorePokemons() {
    let contentRef = document.getElementById("content");

    for (let indexPokemon = 20; indexPokemon < 40; indexPokemon++) {

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
        smallBoxRef.style.background = "linear-gradient(135deg, rgb(107, 40, 40), rgb(226, 170, 153)"
    } else if (type == "water" ) {
        smallBoxRef.style.background = "linear-gradient(135deg, rgb(40, 88, 107), rgb(153, 203, 226)"
    } else if (type == "bug") {
        smallBoxRef.style.background = "linear-gradient(135deg, rgb(107, 86, 40), rgb(226, 206, 153)"
    } else if (type == "normal") {
        smallBoxRef.style.background = "linear-gradient(135deg, rgb(131, 129, 20), rgb(229, 228, 156)"
    } 
}



async function getPokemons() {
    
    for (let indexID = 1; indexID < 41; indexID++) {
         let pokemonData = await loadData(indexID);
         pokemons.push(pokemonData);
    }

    console.log(pokemons)
    renderPokemons(pokemonQuantity);
}

 async function loadData(path="") {
    let response = await fetch(BASE_URL + "/" + path);
    let responseJSON =  await response.json();
    return responseJSON;
}


function showDialog(indexPokemon) {
    let overlayRef = document.getElementById("overlay")
    overlayRef.classList.toggle("d_none");
    dialogNavbar(indexPokemon)
    
}

function dialogNavbar(indexPokemon) {
    let dialogNavbarRef = document.getElementById("overlay_nav");
    dialogNavbarRef.innerHTML = getDialogNavbarTemplate(indexPokemon);
    showAbout(indexPokemon)
} 

function showAbout(indexPokemon) {
    let detailsRef = document.getElementById("details");
    detailsRef.innerHTML = getShowAboutTemplate(indexPokemon);
    showAboutAbilities(indexPokemon);
}

function showAboutAbilities(indexPokemon) {
    let abilitiesRef = document.getElementById("abilities_" + indexPokemon);
    let abilitiesArray = [];
   
    for (let indexAbillity = 0; indexAbillity < pokemons[indexPokemon].abilities.length; indexAbillity++) {
        abilitiesArray.push(pokemons[indexPokemon].abilities[indexAbillity].ability.name);
    }
    const capitalize = abilitiesArray.map((item) => {
        return item[0].toUpperCase() + item.slice(1).toLocaleLowerCase();
    });
    abilitiesRef.innerHTML = capitalize.join(", ");
}


function showBasestats(indexPokemon) {
    
}
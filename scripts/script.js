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
    let overlayRef = document.getElementById("overlay");
    let overlayImgRef = document.getElementById("overlay_pokemon_img");
    let overlayIdNumberRef = document.getElementById("overlay_id_number");
    let noScrollBody = document.getElementById("body");
    overlayRef.classList.toggle("d_none");
    overlayImgRef.src = pokemons[indexPokemon].sprites.other.dream_world.front_default;
    overlayIdNumberRef.innerHTML = "#" + pokemons[indexPokemon].id;
    dialogNavbar(indexPokemon);
    noScrollBody.classList.add("no-scrollbar");
    
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
    showTheActiveDialog("about_btn");
}


function showBaseStats(indexPokemon) {
    let detailsRef = document.getElementById("details");
    detailsRef.innerHTML = "";
    let baseStatsArray = [];

    for (let indexBaseStat = 0; indexBaseStat < pokemons[indexPokemon].stats.length; indexBaseStat++) {
        baseStatsArray.push(pokemons[indexPokemon].stats[indexBaseStat].base_stat)
        
    }
    detailsRef.innerHTML = getShowBaseStatsTemplate(baseStatsArray);
    showTheActiveDialog("base_btn");
}

function showCries(indexPokemon) {
    let detailsRef = document.getElementById("details");
    detailsRef.innerHTML = "";
    detailsRef.innerHTML = showCriesTemplate(indexPokemon);
    showTheActiveDialog("cries_btn");
}

function showShiny(indexPokemon) {
    let detailsRef = document.getElementById("details");
    detailsRef.innerHTML = getLoadingCircle();
    detailsRef.innerHTML = getShinyTemplate(indexPokemon);
    showTheActiveDialog("shiny_btn");
}

function closeOverlayWithoutBtn(){
    let noScrollBody = document.getElementById("body");
    noScrollBody.classList.remove("no-scrollbar");
    document.getElementById("overlay").classList.add("d_none");
}

function closeOverlay() {
    document.getElementById("overlay").classList.add("d_none");
    let noScrollBody = document.getElementById("body");
    noScrollBody.classList.remove("no-scrollbar");
}

function doNotCloseDialog(event) {
    event.stopPropagation();
}

function showTheActiveDialog(active) {
document.getElementById("about_btn").classList.remove("active");
document.getElementById("base_btn").classList.remove("active");
document.getElementById("cries_btn").classList.remove("active");
document.getElementById("shiny_btn").classList.remove("active");
document.getElementById(active).classList.add("active");

}

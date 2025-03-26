const BASE_URL = "https://pokeapi.co/api/v2/pokemon";
let pokemons = [];
let savePokemons = [];
let searchedPokemons = [];
let pokemonRenderStartindex = 0;
let currentPokemonIndex = 0;
let getPokemonDataFromServer = 20;

function init() {
    getPokemons();
}

function renderPokemons() {
    let contentRef = document.getElementById("content");
    let morePokemonBtn = document.getElementById("more_pokemon_btn")
    contentRef.innerHTML = "";
    morePokemonBtn.innerHTML = "";
    if (searchedPokemons.length != 0) {
        pokemons = searchedPokemons;
    } else {
        pokemons = savePokemons;
        morePokemonBtn.innerHTML = `<button id="more_pokemon" onclick="getMoreDataFromServer()" class="more-button">More Pokemon</button>`;
    }

    for (let indexPokemon = 0; indexPokemon < pokemons.length; indexPokemon++) {

        contentRef.innerHTML += getSmallBoxTemplate(indexPokemon);
        renderTypes(indexPokemon);
    }
}

function getMoreDataFromServer() {

    let loadingBtn = document.getElementById("more_pokemon");
    loadingBtn.disabled = "true";
    loadingBtn.innerHTML = getLoadingCircle();

    let morePokemonData = getPokemonDataFromServer + 20;
    let morePokemons = pokemonRenderStartindex + 20;

    return getPokemonDataFromServer = morePokemonData, pokemonRenderStartindex = morePokemons, getPokemons();;
}

function renderMorePokemons() {
    let contentRef = document.getElementById("content");
    let loadingBtn = document.getElementById("more_pokemon");

    for (let indexPokemon = pokemonRenderStartindex; indexPokemon < getPokemonDataFromServer; indexPokemon++) {
        contentRef.innerHTML += getSmallBoxTemplate(indexPokemon);
        renderTypes(indexPokemon);
    }
    renderMoreButton(loadingBtn);
    return pokemonRenderStartindex, getPokemonDataFromServer;
}

function renderMoreButton(loadingBtn) {
    if (getPokemonDataFromServer != 100 && searchedPokemons.length == 0) {
        loadingBtn.innerHTML = "More Pokemon";
        loadingBtn.removeAttribute("disabled");
    } else {
        loadingBtn.classList.add("d_none");
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
    let smallBoxRef = document.getElementById("small_box_" + indexPokemon);

    let type = pokemons[indexPokemon].types[indexType].type.name;
    if (type == "fire") {
        smallBoxRef.style.background = "linear-gradient(135deg, rgb(107, 40, 40), rgb(226, 170, 153)"
    } else if (type == "water") {
        smallBoxRef.style.background = "linear-gradient(135deg, rgb(40, 88, 107), rgb(153, 203, 226)"
    } else if (type == "bug") {
        smallBoxRef.style.background = "linear-gradient(135deg, rgb(107, 86, 40), rgb(226, 206, 153)"
    } else if (type == "normal") {
        smallBoxRef.style.background = "linear-gradient(135deg, rgb(131, 129, 20), rgb(229, 228, 156)"
    }
}



async function getPokemons() {
    for (let indexID = (pokemonRenderStartindex + 1); indexID <= getPokemonDataFromServer; indexID++) {
        let pokemonData = await loadData(indexID);
        savePokemons.push(pokemonData);
    }

    if (pokemonRenderStartindex == 0) {
        renderPokemons();
    } else {
        renderMorePokemons();
    }
}

async function loadData(path = "") {
    let response = await fetch(BASE_URL + "/" + path);
    let responseJSON = await response.json();
    return responseJSON;
}


function showDialog(indexPokemon) {
    let overlayRef = document.getElementById("overlay");
    let overlayImgRef = document.getElementById("overlay_pokemon_img");
    let overlayIdNumberRef = document.getElementById("overlay_id_number");
    let noScrollBody = document.getElementById("body");

    renderOverlayBackground(indexPokemon)
    overlayRef.classList.toggle("d_none");
    overlayImgRef.src = pokemons[indexPokemon].sprites.other.dream_world.front_default;
    overlayIdNumberRef.innerHTML = "#" + pokemons[indexPokemon].id;
    dialogNavbar(indexPokemon);
    noScrollBody.classList.add("no-scrollbar");
    currentPokemonIndex = indexPokemon;

}

function  renderOverlayBackground(indexPokemon) {
    let overlayBackground = document.getElementById("overlay_img");

    let type = pokemons[indexPokemon].types[0].type.name;
    if (type == "fire") {
        overlayBackground.style.background = "linear-gradient(135deg, rgb(107, 40, 40), rgb(226, 170, 153)"
    } else if (type == "water") {
        overlayBackground.style.background = "linear-gradient(135deg, rgb(40, 88, 107), rgb(153, 203, 226)"
    } else if (type == "bug") {
        overlayBackground.style.background = "linear-gradient(135deg, rgb(107, 86, 40), rgb(226, 206, 153)"
    } else if (type == "normal") {
        overlayBackground.style.background = "linear-gradient(135deg, rgb(131, 129, 20), rgb(229, 228, 156)"
    } else {
        overlayBackground.style.background = "linear-gradient(135deg, rgb(40, 107, 40), rgb(153, 226, 153)"
    }
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

function closeOverlayWithoutBtn() {
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

function nextPokemon() {
    let indexPokemon = currentPokemonIndex;
    let overlayImgRef = document.getElementById("overlay_pokemon_img");
    let overlayIdNumberRef = document.getElementById("overlay_id_number");

    if (indexPokemon != (pokemons.length - 1)) {
        indexPokemon++;
    } else {
        indexPokemon = 0;
    }
    renderOverlayBackground(indexPokemon);
    overlayImgRef.src = pokemons[indexPokemon].sprites.other.dream_world.front_default;
    overlayIdNumberRef.innerHTML = "#" + pokemons[indexPokemon].id;
    dialogNavbar(indexPokemon);

    return currentPokemonIndex = indexPokemon;
}

function lastPokemon() {
    let indexPokemon = currentPokemonIndex;

    let overlayImgRef = document.getElementById("overlay_pokemon_img");
    let overlayIdNumberRef = document.getElementById("overlay_id_number");

    if (indexPokemon != 0) {

        indexPokemon--;
    } else {
        indexPokemon = (pokemons.length - 1);
    }
    renderOverlayBackground(indexPokemon);
    overlayImgRef.src = pokemons[indexPokemon].sprites.other.dream_world.front_default;
    overlayIdNumberRef.innerHTML = "#" + pokemons[indexPokemon].id;
    dialogNavbar(indexPokemon);
    return currentPokemonIndex = indexPokemon;
}

function searchPokemon() {
    let inputField = document.getElementById("search_pokemon_input").value;
    searchedPokemons = [];
    if (inputField.length > 2) {
        for (let i = 0; i < savePokemons.length; i++) {
            if (savePokemons[i].name.includes(inputField)) {
                searchedPokemons.push(savePokemons[i]);
            }
        }
    } 
    userSearchFeedback()
    renderPokemons();
}

function userSearchFeedback() {
    let feedbackRef = document.getElementById("user_search_feedback");
    let inputField = document.getElementById("search_pokemon_input").value;

    if (inputField.length == 0) {
        feedbackRef.innerHTML = "";
    } else if (inputField.length < 2) {
        feedbackRef.innerHTML = '<span class="min-req-char" id="min_req_char" for="">Minimum required charachter: 3</span>';
    } else if (searchedPokemons.length == 0 && inputField.length > 2) {
        feedbackRef.innerHTML = '<span class="min-req-char">Not found, try again!</span>';
    } else if (searchedPokemons.length != 0 && inputField.length > 2) {
        feedbackRef.innerHTML = '<span class="min-req-char">Found it!</span>';
    }
}



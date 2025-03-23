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
    return `<span id="about_btn" onclick="showAbout(${indexPokemon})">About</span>
            <span id="base_btn" onclick="showBaseStats(${indexPokemon})">Base stats</span>
            <span id="cries_btn" onclick="showCries(${indexPokemon})">Cries</span>
            <span id="shiny_btn"onclick="showShiny(${indexPokemon})">Shiny</span>`
}


function getShowAboutTemplate(indexPokemon) {
    const weightInKG = pokemons[indexPokemon].weight / 10;
    const heightInMeter = [indexPokemon].height = pokemons[indexPokemon].height / 10;
    return `<table>
                <tr>
                    <td>Name:</td>
                    <td class="uppercase">${pokemons[indexPokemon].name}</td>
                </tr>
                <tr>
                    <td>Height:</td>
                    <td class="uppercase">${heightInMeter} meter</td>
                </tr>
                <tr>
                    <td>Weight:</td>
                    <td class="uppercase">${weightInKG} kg</td>
                </tr>
                <tr>
                    <td>Abilities:</td>
                    <td class="uppercase wrapping" id="abilities_${indexPokemon}"></td>
                </tr>
            </table>`
}

function getShowBaseStatsTemplate(baseStatsArray) {
    return `
            <table>
                <tr>
                    <td>HP</td>
                    <td>${baseStatsArray[0]}</td>
                    <td><progress id="file" value="${baseStatsArray[0]}" max="100"></progress></td>
                </tr>
                <tr>
                    <td>Attack</td>
                    <td>${baseStatsArray[1]}</td>
                    <td><progress id="file" value="${baseStatsArray[1]}" max="100"></progress></td>
                </tr>
                <tr>
                    <td>Defense</td>
                    <td>${baseStatsArray[2]}</td>
                    <td><progress id="file" value="${baseStatsArray[2]}" max="100"></progress></td>
                </tr>
                 <tr>
                    <td>Special-Attack</td>
                    <td>${baseStatsArray[3]}</td>
                    <td><progress id="file" value="${baseStatsArray[3]}" max="100"></progress></td>
                </tr>
                 <tr>
                    <td>Special-Defense</td>
                    <td>${baseStatsArray[4]}</td>
                    <td><progress id="file" value="${baseStatsArray[4]}" max="100"></progress></td>
                </tr>
                <tr>
                    <td>Speed</td>
                    <td>${baseStatsArray[5]}</td>
                    <td><progress id="file" value="${baseStatsArray[5]}" max="100"></progress></td>
                </tr>
            </table>`
}

function showCriesTemplate(indexPokemon) {
    return `<div class="cries">
                <h5>Latest: </h5>
                <audio controls>
                    <source src="${pokemons[indexPokemon].cries.latest}" type="audio/ogg">
                    Your browser does not support the audio element.
                </audio>
                <h5>Legacy: </h5>
                <audio controls>
                    <source src="${pokemons[indexPokemon].cries.legacy}" type="audio/ogg">
                    Your browser does not support the audio element.
                </audio>
            </div>`
}

function getShinyTemplate(indexPokemon) {
    return `<div class="overlay-shiny-img">
                <img src="${pokemons[indexPokemon].sprites.other.home.front_shiny}">
            </div>`
}

function getLoadingCircle() {
    return `<svg width="60" height="60" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
                        <circle class="spinner" cx="25" cy="25" r="20" stroke="#3498db" stroke-width="5" fill="none"
                            stroke-linecap="round" stroke-dasharray="100" stroke-dashoffset="75" />
            </svg>
    `
}
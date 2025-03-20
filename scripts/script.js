// name, type, id, img


function init() {
    loadData(path="")

}

let array = [];

const BASE_URL = "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0"


 async function loadData(path="") {
    let response = await fetch(BASE_URL + path)
    let responseJSON =  await response.json();

    for (let index = 0; index < 20; index++) {
        array.push(responseJSON[index]);
        
    }

    console.log(array)
}
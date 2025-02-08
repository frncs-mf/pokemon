const pokemonContainer = document.getElementById("pokemon-container");
const refreshButton = document.getElementById("refresh-btn");

// Function to fetch and display Pokémon
async function fetchPokemon() {
    pokemonContainer.innerHTML = ""; // Clear previous results
    for (let i = 0; i < 5; i++) {
        let randomId = Math.floor(Math.random() * 151) + 1; // Get a Pokémon from Gen 1
        let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
        let data = await response.json();

        let pokemonCard = document.createElement("div");
        pokemonCard.classList.add("pokemon-card");

        pokemonCard.innerHTML = `
            <img src="${data.sprites.front_default}" alt="${data.name}">
            <h2>${data.name.charAt(0).toUpperCase() + data.name.slice(1)}</h2>
            <p>Type: ${data.types[0].type.name.charAt(0).toUpperCase() + data.types[0].type.name.slice(1)}</p>
        `;
        pokemonContainer.appendChild(pokemonCard);
    }
}

// Load Pokémon on startup
fetchPokemon();

// Add event listener to refresh button
refreshButton.addEventListener("click", fetchPokemon);

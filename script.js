const pokemonContainer = document.getElementById("pokemon-container");
const refreshButton = document.getElementById("refresh-btn");

const POKEMON_COUNT = 5; // Number of Pokémon to fetch

// Function to fetch Pokémon data
async function fetchPokemon() {
    pokemonContainer.innerHTML = ""; // Clear previous Pokémon

    let promises = []; // Store API calls
    for (let i = 0; i < POKEMON_COUNT; i++) {
        let randomId = Math.floor(Math.random() * 1118) + 1; // Gen 1 Pokémon
        promises.push(fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`).then(res => res.json()));
    }

    // Wait for all Pokémon data to load
    const pokemonData = await Promise.all(promises);

    // Display Pokémon
    pokemonData.forEach(data => {
        let types = data.types.map(type => type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)).join(" / ");

        let pokemonCard = document.createElement("div");
        pokemonCard.classList.add("pokemon-card");

        pokemonCard.innerHTML = `
            <h3>#${data.id.toString().padStart(3, '0')} ${data.name.charAt(0).toUpperCase() + data.name.slice(1)}</h3>
            <img src="${data.sprites.front_default}" alt="${data.name}">
            <p>Type: ${types}</p>
        `;

        pokemonContainer.appendChild(pokemonCard);
    });
}

// Load Pokémon on startup
fetchPokemon();

// Add event listener to refresh button
refreshButton.addEventListener("click", fetchPokemon);

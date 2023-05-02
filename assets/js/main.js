const pokemonList = document.getElementById('pokemonList');
const seeMoreButton = document.getElementById('seeMore');
const pokemonButtons = document.querySelectorAll('.pokemonButton')

const maxPokemons = 151;
let offset = 0;
const limit = 10;

function loadMorePokemons(offset, limit){

    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        
        const newHtml = pokemons.map((pokemon) => `
            <li class="pokemon ${pokemon.mainType}">
                    
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
    
            <div class="detail">
            
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
    
                <img src="${pokemon.img}" alt="${pokemon.name}">
            
            </div>
                
            </li>
            `).join('')

            pokemonList.innerHTML += newHtml

    })

}

loadMorePokemons()

seeMoreButton.addEventListener('click', () => {
    offset += limit;
    const qtdPokemonsNextPage = offset + limit;

    if (qtdPokemonsNextPage == maxPokemons){

        loadMorePokemons(offset, maxPokemons - offset)

        seeMoreButton.parentElement.removeChild(seeMoreButton);

    } else {

        loadMorePokemons(offset, limit)
    }
})


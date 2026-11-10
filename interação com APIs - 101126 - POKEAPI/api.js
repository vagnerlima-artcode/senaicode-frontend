// Endpoint base da PokeAPI oficial
const POKEAPI_URL = 'https://pokeapi.co/api/v2/pokemon';

// 1. READ (Buscar um Pokémon por Nome ou ID)
async function buscarPokemonNoPokeAPI(nomeOuId) {
    try {
        // Converte para letras minúsculas (a PokeAPI aceita apenas nomes em caixa baixa)
        const parametro = String(nomeOuId).toLowerCase().trim();

        // Faz a requisição GET
        const res = await fetch(`${POKEAPI_URL}/${parametro}`);

        // Se a API retornar erro (ex: Pokémon não existe / 404)
        if (!res.ok) {
            throw new Error(`Pokémon não encontrado (Status: ${res.status})`);
        }

        const dados = await res.json();

        // Mapeia e formata os dados relevantes retornados pela PokeAPI
        const pokemon = {
            id: dados.id,
            nome: dados.name,
            // Extrai todos os tipos do Pokémon em um Array de textos
            tipos: dados.types.map(t => t.type.name),
            // Pega o link da imagem (sprite) oficial de frente
            imagem: dados.sprites.front_default
        };

        console.log("Pokémon encontrado:", pokemon);

        return pokemon;

    } catch (erro) {
        console.error("Erro ao buscar no PokeAPI:", erro.message);
    }
}

// 2. READ (Listar uma página de Pokémons com limite e offset)
async function listarPokemonsPokeAPI(limite = 10, offset = 0) {
    try {
        // Exemplo: ?limit=10&offset=0 busca os 10 primeiros Pokémons
        const res = await fetch(`${POKEAPI_URL}?limit=${limite}&offset=${offset}`);
        const dados = await res.json();

        console.log(`Lista dos Pokémons (${limite} itens):`, dados.results);
        return dados.results; // Retorna um array com objetos { name, url }

    } catch (erro) {
        console.error("Erro ao listar Pokémons:", erro.message);
    }
}


// --- EXEMPLOS DE USO ---

// Buscar dados detalhados do Pikachu (#25)
buscarPokemonNoPokeAPI('pikachu');
// Buscar o Pokémon de ID #1 (Bulbasaur)
buscarPokemonNoPokeAPI(1);
// Listar os 5 primeiros Pokémons da API
listarPokemonsPokeAPI(100, 10);
/* API - Dev: Vagner Lima 03.11.2026 */

// 1. Guarda em uma constante a URL base da nossa API que está rodando no Node.js (porta 3000)
const API_URL = 'http://localhost:3000/api/pokemons';

// 2. Captura os elementos da página HTML usando os IDs para podermos interagir com eles via JavaScript
const form = document.getElementById('pokemonForm'); // O formulário de cadastro
const nomeInput = document.getElementById('nomeInput'); // O campo de texto do nome
const tipoInput = document.getElementById('tipoInput'); // O campo de texto do tipo
const extraInput = document.getElementById('extraInput');
const listaPokemons = document.getElementById('listaPokemons'); // A lista <ul> onde os Pokémons serão inseridos

// --- OPERAÇÃO 1: READ (Ler / Listar) ---
// Função assíncrona que busca a lista de Pokémons na API e desenha os itens na tela
async function carregarPokemons() {
    // Faz uma requisição do tipo GET para o servidor e aguarda a resposta (resposta de rede)
    const res = await fetch(API_URL);
    
    // Converte os dados brutos recebidos da API de texto JSON para um Array em JavaScript
    const dados = await res.json(); 

    // Limpa o conteúdo atual da lista na tela para não acumular nem duplicar Pokémons antigos
    listaPokemons.innerHTML = ''; 

    // Percorre cada objeto 'pokemon' dentro do Array 'dados' recebido do backend
    dados.forEach(pokemon => {
        // Cria um novo elemento de lista HTML (<li>) na memória do navegador
        const li = document.createElement('li');
        
        // Define o HTML interno da <li> mostrando o ID, nome, tipo e os botões de Ação (Editar e Excluir)
        // Passamos 'pokemon.id', 'pokemon.nome' e 'pokemon.tipo' como argumentos para as funções onclick
        li.innerHTML = `
            <span><strong>#${pokemon.id} ${pokemon.nome}</strong> (${pokemon.tipo}) (${pokemon.extra})</span>
            <div>
                <button class="btn-edit" onclick="editarPokemon(${pokemon.id}, '${pokemon.nome}', '${pokemon.tipo}','${pokemon.extra}')">Editar</button>
                <button class="btn-del" onclick="deletarPokemon(${pokemon.id})">Excluir</button>
            </div>
        `;
        
        // Adiciona a <li> recém-criada dentro da nossa lista <ul> que está visível no HTML
        listaPokemons.appendChild(li); 
    });
}

// --- OPERAÇÃO 2: CREATE (Criar / Cadastrar) ---
// Adiciona um escutador de eventos para interceptar o momento em que o usuário envia (submit) o formulário
form.addEventListener('submit', async (e) => {
    // Previne o comportamento padrão do HTML, que seria recarregar a página inteira ao enviar o formulário
    e.preventDefault(); 

    // Cria um objeto JavaScript com os dados que o usuário digitou nos campos de texto (removendo espaços das pontas com .trim())
    const novoPokemon = {
        nome: nomeInput.value.trim(),
        tipo: tipoInput.value.trim(),
        extra: extraInput.value.trim()
    };

    // Faz uma requisição HTTP enviando os dados para a API
    const res = await fetch(API_URL, {
        method: 'POST', // Define o método HTTP como POST (usado para criação)
        headers: { 'Content-Type': 'application/json' }, // Avisa ao servidor que estamos enviando os dados no formato JSON
        body: JSON.stringify(novoPokemon) // Converte o objeto JavaScript em uma String/Texto formatado em JSON
    });

    // Se a API responder com sucesso (Status 200 até 299)
    if (res.ok) {
        nomeInput.value = ''; // Limpa o campo de texto do nome
        tipoInput.value = ''; // Limpa o campo de texto do tipo
        extraInput.value = '';
        carregarPokemons();   // Recarrega a lista para buscar e exibir o novo Pokémon cadastrado
    }
});

// --- OPERAÇÃO 3: UPDATE (Atualizar / Editar) ---
// Função assíncrona que recebe o ID e os dados atuais do Pokémon para fazer a alteração
async function editarPokemon(id, nomeAtual, tipoAtual) {
    // Pergunta ao usuário os novos valores preenchendo a caixa de texto com os dados atuais
    const novoNome = prompt("Digite o novo nome do Pokémon:", nomeAtual);
    const novoTipo = prompt("Digite o novo tipo do Pokémon:", tipoAtual);
    const novoExtra = prompt("Digite o novo extra do Pokémon:", extraAtual);

    // Validação simples: só envia a requisição se o usuário preencheu os dois campos e não clicou em "Cancelar"
    if (novoNome && novoTipo && novoExtra) {
        // Monta o objeto com as informações atualizadas
        const pokemonAtualizado = {
            nome: novoNome.trim(),
            tipo: novoTipo.trim(),
            extra: novoExtra.trim()
        };

        // Faz uma requisição HTTP enviando o método PUT para a URL específica do Pokémon (ex: http://localhost:3000/api/pokemons/1)
        const res = await fetch(`${API_URL}/${id}`, {
            method: 'PUT', // Define o método HTTP como PUT (usado para atualização)
            headers: { 'Content-Type': 'application/json' }, // Informa que o corpo da requisição é um JSON
            body: JSON.stringify(pokemonAtualizado) // Transforma o objeto JavaScript em texto JSON
        });

        // Se o servidor confirmar a atualização (Status 200)
        if (res.ok) {
            carregarPokemons(); // Recarrega a lista para exibir os dados alterados na tela
        }
    }
}

// --- OPERAÇÃO 4: DELETE (Excluir / Remover) ---
// Função assíncrona que recebe o ID do Pokémon que deve ser apagado
async function deletarPokemon(id) {
    // Faz uma requisição chamando a URL com o ID específico no final (exemplo: http://localhost:3000/api/pokemons/1)
    const res = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE' // Define o método HTTP como DELETE (usado para remoção)
    });

    // Se o servidor confirmar que excluiu com sucesso
    if (res.ok) {
        carregarPokemons(); // Recarrega a lista para remover o Pokémon apagado da tela
    }
}
// Executa a função imediatamente quando a página é carregada pela primeira vez no navegador
carregarPokemons();
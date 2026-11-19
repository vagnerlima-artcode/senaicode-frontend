// Dev: Vagner Lima 19.11.26
const URLAPI = "https://dummyjson.com/users";

async function buscarUsuarios() {
    const container = document.querySelector("#user-container");
    try {
        // tentar fazer a busca
        const res = await fetch(URLAPI);
        if (!res.ok) {
            throw new Error(`Erro na requisição: ${res.status}`);
        }

        const { users } = await res.json();

        const usuariosTratados = users
            .filter(usuario => usuario.gender == 'female')
            .map(usuario => ({
                id: usuario.id,
                nome: usuario.firstName,
            }));
        container.innerHTML = usuariosTratados.map(u => `
            <div class="card">
                <img src="" alt="Imagem" title="imagem">
                <h3>${u.nome}</h3>
                <p>Cidade</p>
            </div> 
            `).join('');
        // console.dir(users[0], { depth: null });
        // console.log(users); //todos os usarios
        console.log(usuariosTratados); //usuarios filtrados

    } catch (error) {
        console.error('Falha ao buscar usuarios:', error.message);
        //erro
    }
}
buscarUsuarios();

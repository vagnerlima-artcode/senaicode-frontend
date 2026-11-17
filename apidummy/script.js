const URLAPI = 'https://dummyjson.com/users';

async function buscarUsuarios() {
    const container = document.querySelector("#user-container");
    try {
        const res = await fetch(URLAPI);
        if (!res.ok) {
            throw new Error(`Erro na requisição: ${res.status}`);
        }

        const { users } = await res.json();

        console.dir(users[0], { depth: null });

        const usuariosTratados = users
            .filter(usuario => usuario.gender == 'male')
            .map(usuario => ({
                id: usuario.id,
                nome: usuario.firstName,
                nome_completo: `${usuario.firstName} ${usuario.lastName}`,
                tel:usuario.phone,
                email:usuario.email,
                cidade: usuario.address?.city || 'Não informado',
                empresa: usuario.company?.name || 'Não informado',
                banco: usuario.bank?.cardType || 'Não informado',
                genero: usuario.gender,
                imagem: usuario.image,
                departamento: usuario.company?.department,

            }));

        container.innerHTML = usuariosTratados.map(u => `
                <div class="card">
                    <img src="${u.imagem}" alt="${u.nome_completo}" title="${u.nome_completo}">
                    <h3>${u.nome_completo}</h3>
                    <h4>${u.empresa}</h4>
                    <p>${u.tel}</p>
                    <p><a href="mailto:${u.email}">${u.email}</a></p>
                    <p>${u.departamento}</p>
                    <p>${u.cidade}</p>
                    <p>${u.banco}</p>

                </div>
        `).join('');
        console.log(usuariosTratados)

    } catch (erro) {
        console.error('Falha ao buscar usuários:', erro.message);
        container.innerHTML = `
            <p class="status" style="color: #dc3545;">
                Falha ao carregar usuários: ${erro.message}
            </p>
        `
    }
}

buscarUsuarios();


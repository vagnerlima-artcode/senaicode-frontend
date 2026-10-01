function filtrarLista() {
  // 1. Obtém o texto digitado e converte para minúsculas
  const termo = document.getElementById('campoBusca').value.toLowerCase();
  
  // 2. Seleciona todos os elementos <li> da lista
  const itens = document.querySelectorAll('#listaItens li');

  // 3. Percorre cada item da lista
  itens.forEach(item => {
    const textoItem = item.textContent.toLowerCase();
    
    // Se o texto do item contiver o termo digitado, exibe; caso contrário, esconde
    if (textoItem.includes(termo)) {
      item.style.display = '';
    } else {
      item.style.display = 'none';
    }
  });
}
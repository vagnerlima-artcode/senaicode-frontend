describe('Gerenciador de Tarefas - Testes E2E', () => {

  beforeEach(() => {
    // Caso esteja rodando localmente com Live Server ou servidor local.
    // Ajuste o caminho/URL se necessário.
    cy.visit('http://127.0.0.1:5500/cypress/e2e/test-vagner/testfrontend.html');
  });

  context('1. Estado Inicial da Aplicação', () => {
    it('deve exibir mensagem de lista vazia e ter a lista DOM sem itens', () => {
      // Mensagem de estado vazio visível
      cy.get('#empty-message')
        .should('be.visible')
        .and('have.text', 'Nenhuma tarefa cadastrada.');

      // Lista ul vazia (sem elementos li)
      cy.get('#todo-list').children().should('have.length', 0);
    });
  });

  context('2. Cadastro e Inclusão de Tarefas', () => {
    it('deve cadastrar uma nova tarefa, limpar o input e ocultar a mensagem inicial', () => {
      const novaTarefa = 'Estudar Cypress para a prova';

      // Preenche o campo e submete
      cy.get('#todo-input').type(novaTarefa);
      cy.get('#add-btn').click();

      // Confirma inclusão na lista visível
      cy.get('#todo-list li').should('have.length', 1);
      cy.get('#todo-list li span').should('have.text', novaTarefa);

      // Reajuste do campo de entrada (limpeza)
      cy.get('#todo-input').should('have.value', '');

      // Ocultar a mensagem de estado vazio (recebe a classe .hidden)
      cy.get('#empty-message').should('have.class', 'hidden');
    });
  });

  context('3. Alternância de Status (Conclusão)', () => {
    it('deve alterar o status para concluído ao clicar no texto da tarefa', () => {
      cy.get('#todo-input').type('Comprar café');
      cy.get('#add-btn').click();

      // Clica no span (texto) da tarefa para marcar como concluída
      cy.contains('#todo-list li span', 'Comprar café').click();

      // Valida aplicação da classe CSS .completed no span
      cy.contains('#todo-list li span', 'Comprar café').should('have.class', 'completed');
    });
  });

  context('4. Filtros de Exibição', () => {
    beforeEach(() => {
      // Cadastra duas tarefas
      cy.get('#todo-input').type('Tarefa Pendente');
      cy.get('#add-btn').click();

      cy.get('#todo-input').type('Tarefa Concluída');
      cy.get('#add-btn').click();

      // Alterna a segunda para "Concluída"
      cy.contains('#todo-list li span', 'Tarefa Concluída').click();
    });

    it('deve filtrar por "Pendentes"', () => {
      cy.get('#filter-pending').click();

      // Apenas a tarefa pendente permanece visível
      cy.contains('#todo-list li', 'Tarefa Pendente').should('not.have.class', 'hidden');
      cy.contains('#todo-list li', 'Tarefa Concluída').should('have.class', 'hidden');
    });

    it('deve filtrar por "Concluídas"', () => {
      cy.get('#filter-completed').click();

      // Apenas a tarefa concluída permanece visível
      cy.contains('#todo-list li', 'Tarefa Concluída').should('not.have.class', 'hidden');
      cy.contains('#todo-list li', 'Tarefa Pendente').should('have.class', 'hidden');
    });

    it('deve filtrar por "Todas"', () => {
      // Aplica outro filtro primeiro para garantir a alternância
      cy.get('#filter-pending').click();
      cy.get('#filter-all').click();

      // Ambas voltam a ficar visíveis (sem a classe hidden)
      cy.get('#todo-list li').not('.hidden').should('have.length', 2);
    });
  });

  context('5. Exclusão de Registros', () => {
    it('deve excluir um item específico e exibir mensagem de lista vazia ao remover todos', () => {
      cy.get('#todo-input').type('Tarefa para deletar');
      cy.get('#add-btn').click();

      // Clica no botão de excluir do item específico
      cy.contains('#todo-list li', 'Tarefa para deletar')
        .find('.delete-btn')
        .click();

      // Confirma remoção no DOM
      cy.get('#todo-list li').should('have.length', 0);

      // Exibição da mensagem de lista vazia (remove a classe .hidden)
      cy.get('#empty-message')
        .should('be.visible')
        .and('not.have.class', 'hidden');
    });
  });

});
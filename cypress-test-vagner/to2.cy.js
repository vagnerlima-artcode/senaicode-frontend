describe('Teste Front-End Cypress', () => {
    beforeEach(() => {
        cy.visit('http://127.0.0.1:5500/cypress/e2e/test-vagner/testfrontend.html');
    });

    context('1. Estado Inicial da aplicação', () => {
        it('Deve exibir mensagem de lista vazia', () => {
            cy.reload();
            cy.get('#empty-message')
                .should('be.visible')
                .and('have.text', 'Nenhuma tarefa cadastrada.');

            cy.get('#todo-list').children().should('have.length', 0);
            // cy.wait(3000);
        });
    });

    context('2. cadastro de tarefas', () => {
        it('Deve cadastrar nova tarefa, limpar o input e ocultar a mensagem incial', () => {

            const novaTarefa = 'Preenchimento de input';

            // Preenche o campo e submete
            cy.get('#todo-input').type(novaTarefa);
            cy.get('#add-btn').click();

            // Confirma inclusão
            cy.get('#todo-list li').should('have.length', 1);
            cy.get('#todo-list li span').should('have.text', novaTarefa);

            // Reajuste do campo de entrada(Limpeza)
            cy.get('#todo-input').should('have.value', '');

            // Ocultar a mensagem de estado vazio, recebe a classe hidden
            cy.get('#empty-message').should('have.class', 'hidden');
        });
    });

    context('3. Alternância de Status, Conclusão', () => {
        it('deve alterar o status para concluido ao clicar no texto da tarefa', () => {
            cy.get('#todo-input').type('Comprar café');
            cy.get('#add-btn').click();

            // Clica no span da tarefa para marcar como concluida
            cy.contains('#todo-list li span', 'Comprar café').click();

            // Valida aplicação da classe CSS .completed no span
            cy.contains('#todo-list li span', 'Comprar café').should('have.class', 'completed');
        });
    });

    context('4. Filtros de Exibição', () => {
        beforeEach(() => {
            // Cadastra 02 tarefas
            cy.get('#todo-input').type('Tarefa Pendente');
            cy.get('#add-btn').click();

            cy.get('#todo-input').type('Tarefa Concluída');
            cy.get('#add-btn').click();

            // Alterna a segunda para Concluida
            cy.contains('#todo-list li span', 'Tarefa Concluída').click();
        });

        it('deve filtrar por "Pendentes"', () => {
            cy.get('#filter-pending').click();

            // Apenas a tarefa pendente permanece Visivel
            cy.contains('#todo-list li', 'Tarefa Pendente').should('not.have.class', 'hidden');
            cy.contains('#todo-list li', 'Tarefa Concluída').should('have.class', 'hidden');
        });

        it('deve filtrar por "Concluídas"', () => {
            cy.get('#filter-completed').click();
            // Apenas a tarefa concluida permanece visivel
            cy.contains('#todo-list li', 'Tarefa Concluída').should('not.have.class', 'hidden');
            cy.contains('#todo-list li', 'Tarefa Pendente').should('have.class', 'hidden');
        });

        it('deve filtrar por "Todas"', () => {
            // Aplica outro filtro primeiro para garantir a alternancia
            cy.get('#filter-pending').click();
            cy.get('#filter-all').click();

            // Ambas voltam a ficar visiveis(sem a classe hidden)
            cy.get('#todo-list li').not('.hidden').should('have.length', 2);

        });
    });
    context('5. Exclusão de Registros', () => {
        it('deve excluir um item especifico e exibir a mensagem de lista vazia ao remover todos', () => {
            cy.get('#todo-input').type('Tarefa para deletar');
            cy.get('#add-btn').click();

            // Clica no botão de excluir do item especifico
            cy.contains('#todo-list li', 'Tarefa para deletar')
                .find('.delete-btn')
                .click();
            // Confirma remoção no DOM
            cy.get('#todo-list li').should('have.length', 0);

            // Exibição da mensagem de lista vazia(remove a classe .hidden)
            cy.get('#empty-message').should('be.visible').and('not.have.class','hidden');
        });
    });
});
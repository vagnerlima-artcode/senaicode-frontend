const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');
const emptyMessage = document.getElementById('empty-message');

let todos = [];

function render() {
  list.innerHTML = '';
  
  if (todos.length === 0) {
    emptyMessage.classList.remove('hidden');
  } else {
    emptyMessage.classList.add('hidden');
  }

  todos.forEach((todo, index) => {
    const li = document.createElement('li');
    li.dataset.index = index;
    if (todo.hidden) li.classList.add('hidden');

    const span = document.createElement('span');
    span.textContent = todo.text;
    if (todo.completed) span.classList.add('completed');
    
    span.addEventListener('click', () => {
      todo.completed = !todo.completed;
      render();
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Excluir';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', () => {
      todos.splice(index, 1);
      render();
    });

    li.appendChild(span);
    li.appendChild(deleteBtn);
    list.appendChild(li);
  });
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (text) {
    todos.push({ text, completed: false, hidden: false });
    input.value = '';
    render();
  }
});

document.getElementById('filter-all').addEventListener('click', () => {
  todos.forEach(t => t.hidden = false);
  render();
});

document.getElementById('filter-pending').addEventListener('click', () => {
  todos.forEach(t => t.hidden = t.completed);
  render();
});

document.getElementById('filter-completed').addEventListener('click', () => {
  todos.forEach(t => t.hidden = !t.completed);
  render();
});
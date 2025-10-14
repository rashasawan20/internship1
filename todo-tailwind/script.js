const todoInput = document.getElementById('todoInput');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');

let todos = [];

addBtn.addEventListener('click', addTodo);

function addTodo() {
    const text = todoInput.value.trim();
    if (!text) return;

    const todo = { id: Date.now(), text, completed: false };
    todos.push(todo);
    todoInput.value = '';
    renderTodos();
}

function toggleTodo(id) {
    todos = todos.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    renderTodos();
}

function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    renderTodos();
}

function renderTodos() {
    todoList.innerHTML = '';
    todos.forEach(todo => {
        const li = document.createElement('li');
        li.className = 'flex justify-between items-center p-2 border rounded';
        li.innerHTML = `
            <span class="${todo.completed ? 'line-through' : ''}" 
                  onclick="toggleTodo(${todo.id})">${todo.text}</span>
            <button onclick="deleteTodo(${todo.id})" class="text-red-500">✕</button>
        `;
        todoList.appendChild(li);
    });
}
// Get DOM elements
const todoInput = document.getElementById('todoInput');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');
const taskCount = document.getElementById('taskCount');

let todos = [];

// Add new todo
addBtn.addEventListener('click', addTodo);
todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTodo();
});

function addTodo() {
    const text = todoInput.value.trim();
    
    if (text === '') {
        alert('Please enter a task!');
        return;
    }

    // Create new todo object
    const todo = {
        id: Date.now(),
        text: text,
        completed: false
    };

    todos.push(todo);
    todoInput.value = '';
    renderTodos();
}

// Toggle todo completion
function toggleTodo(id) {
    todos = todos.map(todo => {
        if (todo.id === id) {
            return { ...todo, completed: !todo.completed };
        }
        return todo;
    });
    renderTodos();
}

// Delete todo
function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    renderTodos();
}

// Render all todos
function renderTodos() {
    todoList.innerHTML = '';
    
    todos.forEach(todo => {
        const li = document.createElement('li');
        li.className = `flex items-center justify-between p-3 rounded-lg ${
            todo.completed ? 'bg-green-50' : 'bg-gray-50'
        }`;
        
        li.innerHTML = `
            <div class="flex items-center gap-3">
                <input 
                    type="checkbox" 
                    ${todo.completed ? 'checked' : ''}
                    onchange="toggleTodo(${todo.id})"
                    class="w-4 h-4 text-blue-500"
                >
                <span class="${todo.completed ? 'line-through text-gray-500' : 'text-gray-800'}">
                    ${todo.text}
                </span>
            </div>
            <button 
                onclick="deleteTodo(${todo.id})"
                class="text-red-500 hover:text-red-700 transition duration-200"
            >
                ✕
            </button>
        `;
        
        todoList.appendChild(li);
    });

    // Update task count
    const remaining = todos.filter(todo => !todo.completed).length;
    taskCount.textContent = remaining;
}
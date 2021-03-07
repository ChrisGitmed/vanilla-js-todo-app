let data = {
    todos: []
};

const $form = document.querySelector('form');
const $todoList = document.querySelector('ul');

document.addEventListener('DOMContentLoaded', (event) => {
    const todoList = localStorage.getItem('todos');
    if (todoList) {
        data = JSON.parse(todoList);
    }
    if (data.todos.length) {
        $todoList.hidden = false;
        for (let i = 0; i < data.todos.length; i++) {
            const $listItem = document.createElement('li');
            $listItem.textContent = data.todos[i];
            $todoList.appendChild($listItem);
        }
    }
})

window.addEventListener('beforeunload', (event) => {
    localStorage.setItem('todos', JSON.stringify(data))
})

$form.addEventListener('submit', (event) => {
    event.preventDefault();
    const todo = $form.elements.todo.value;
    if (todo) {
        data.todos.push(todo)
        const $listItem = document.createElement('li');
        $listItem.textContent = todo;
        $todoList.appendChild($listItem);
        $todoList.hidden = false;
    };
    $form.reset();
});

$todoList.addEventListener('click', (event) => {
    const element = event.target;
    if (element.tagName === 'LI') {
        for (let i = 0; i < data.todos.length; i++) {
            if (data.todos[i] === element.textContent) {
                data.todos.splice(i, 1);
                element.remove();
                if ($todoList.children.length === 0) {
                    $todoList.hidden = true;
                }
                break;
            }
        }
    }
})
let data = {
    todos: []
};

const $form = document.querySelector('form');
const $todoList = document.querySelector('ul');

document.addEventListener('DOMContentLoaded', () => {
    const todoList = localStorage.getItem('todos');
    if (todoList) {
        data = JSON.parse(todoList);
    }
    if (data.todos.length) {
        $todoList.hidden = false;
        for (let i = 0; i < data.todos.length; i++) {
            createListItemInDOM(data.todos[i]);
        }
    }
})

window.addEventListener('beforeunload', () => {
    localStorage.setItem('todos', JSON.stringify(data))
})

$form.addEventListener('submit', (event) => {
    event.preventDefault();
    const todo = $form.elements.todo.value;
    if (todo) {
        data.todos.push({ todo , isCompleted: false })
        createListItemInDOM(data.todos[data.todos.length - 1]);
        $todoList.hidden = false;
    };
    $form.reset();
});

$todoList.addEventListener('click', (event) => {
    const element = event.target;
    if (element.tagName === 'LI') {
        for (let i = 0; i < data.todos.length; i++) {
            if (data.todos[i].todo === element.textContent) {
                data.todos[i].isCompleted = !data.todos[i].isCompleted;
                element.className === 'green-text'
                    ? element.className = ''
                    : element.className = 'green-text'
                break;
            }
        }
    }
    else if (element.tagName === 'BUTTON') {
        const $todo = element.closest('li');
        for (let i = 0; i < data.todos.length; i++) {
            if (data.todos[i].todo === $todo.textContent) {
                data.todos.splice(i, 1);
                $todo.remove();
                if ($todoList.children.length === 0) {
                    $todoList.hidden = true;
                }
                break;
            }
        }
    }
})

const createListItemInDOM = (listItem) => {
    const $listItem = document.createElement('li');
    $listItem.textContent = listItem.todo;
    if (listItem.isCompleted) {
        $listItem.className = 'green-text';
    }
    const $button = document.createElement('button');
    $button.className = 'delete-button';
    $listItem.appendChild($button)
    $todoList.appendChild($listItem);
}
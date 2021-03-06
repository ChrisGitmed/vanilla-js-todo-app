const $form = document.querySelector('form');
const $todoList = document.querySelector('ul');

$form.addEventListener('submit', (event) => {
    event.preventDefault();
    const todo = $form.todo.value;
    if (todo) {
        const $listItem = document.createElement('li');
        $listItem.textContent = todo;
        $todoList.appendChild($listItem);
        $todoList.hidden = false;
    };
    $form.reset();
});
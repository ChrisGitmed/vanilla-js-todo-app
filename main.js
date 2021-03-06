const $form = document.querySelector('form');
const $todoList = document.querySelector('ul');

$form.addEventListener('submit', (event) => {
    event.preventDefault();
    if ($form.todo.value) {
        const $listItem = document.createElement('li');
        $listItem.textContent = $form.todo.value;
        $todoList.appendChild($listItem);
    };
    $form.reset();
});
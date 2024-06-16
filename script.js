document.addEventListener("DOMContentLoaded", () => {
    const list = document.getElementById('todoList');
    const addButton = document.getElementById('addItem');
    const sortButton = document.getElementById('sortItems');
    const input = document.getElementById('newItem');
    let items = [];

    const createItem = name => ({
        id: Date.now().toString(),
        name,
        date: new Date().toISOString(),
        done: false
    });

    const updateList = () => {
        list.innerHTML = items.map(item => `
            <li data-id="${item.id}" class="${item.done ? 'done' : ''}">
                <input type="checkbox" ${item.done ? 'checked' : ''}>
                <span>${item.name}</span>
                <span class="close">&times;</span>
            </li>
        `).join('');
    };

    addButton.addEventListener('click', () => {
        const name = input.value.trim();
        if (name.length > 3 && name[0] === name[0].toUpperCase()) {
            items.push(createItem(name));
            input.value = '';
            updateList();
        } else {
            alert('Name must start with an uppercase letter and have more than three characters.');
        }
    });

    sortButton.addEventListener('click', () => {
        items.sort((a, b) => a.name.localeCompare(b.name));
        updateList();
    });

    list.addEventListener('click', e => {
        const id = e.target.closest('li').dataset.id;
        if (e.target.tagName === 'INPUT') {
            items = items.map(item => item.id === id ? { ...item, done: !item.done } : item);
        } else if (e.target.classList.contains('close')) {
            items = items.filter(item => item.id !== id);
        }
        updateList();
    });

    updateList();
});

document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('todo-input');
    const addBtn = document.getElementById('add-btn');
    const todoList = document.getElementById('todo-list');
    const deleteAllBtn = document.getElementById('delete-all-btn');

    // Function to add a new task
    function addTask() {
        const taskText = input.value.trim();
        
        if (taskText === '') {
            alert("Please enter a task!");
            return;
        }

        const li = document.createElement('li');
        
        const span = document.createElement('span');
        span.textContent = taskText;
        // Toggle completed status on click
        span.addEventListener('click', () => {
            li.classList.toggle('completed');
        });

        const buttonWrapper = document.createElement('div');
        buttonWrapper.classList.add('button-wrapper');

        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.classList.add('edit-btn');
        editBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent li click from firing
            const newText = prompt("Edit task:", span.textContent);
            if (newText !== null && newText.trim() !== "") {
                span.textContent = newText.trim();
            }
        });
        
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent li click from firing
            todoList.removeChild(li);
        });

        li.appendChild(span);
        buttonWrapper.appendChild(editBtn);
        buttonWrapper.appendChild(deleteBtn);
        li.appendChild(buttonWrapper);
        todoList.prepend(li);

        input.value = ''; // Clear input
    }

    addBtn.addEventListener('click', addTask);

    deleteAllBtn.addEventListener('click', () => {
        todoList.innerHTML = '';
    });

    // Allow adding task by pressing Enter key
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    // --- Live Background: Create and animate stars ---
    function createFallingStars() {
        const starCount = 150; // Stars ki tadad badha di
        const container = document.body;

        for (let i = 0; i < starCount; i++) {
            const star = document.createElement('div');
            star.classList.add('star');

            // Random Height (Lines choti choti)
            const height = Math.random() * 40 + 10; // 10px se 50px lambi lines
            star.style.height = `${height}px`;

            // Random Animation Speed
            star.style.animationDuration = `${Math.random() * 2 + 1}s`; // 1s se 3s
            star.style.animationDelay = `${Math.random() * 5}s`; // Delay: 0s to 5s

            // Mix: Kuch seedhay girenge, kuch cross (diagonal)
            if (Math.random() > 0.5) {
                star.style.animationName = 'fall-diagonal';
                star.style.left = `${Math.random() * 150 - 50}%`; // Wider range for diagonal
            } else {
                star.style.animationName = 'fall';
                star.style.left = `${Math.random() * 100}%`;
            }

            container.appendChild(star);
        }
    }

    createFallingStars();
});
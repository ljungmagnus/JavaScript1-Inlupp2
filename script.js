const form = document.querySelector('#form');
const newTodo = document.querySelector('#newTodo');
const output = document.querySelector('#todoList');

// hämta hem listan med todos från databasen 

// skriv ut listan på sidan
const createTodoListElement = (todo) => {
    output.innnerHTML = '';
    //forEach()    
        output.innerHTML += `
            <li id="todo" class="list-group-item">
                <input class="form-check-input me-1" type="checkbox" value="" aria-label="">
                ${todo.value}
            </li>
        `;
}

// lyssna efter en ny todo

// validera ny todo
const validateText = (input) => {
    if(input.value.trim() === '') {
        errorMessage(input, 'Fältet kan inte vara tomt');
        return false;
    }
    else {
        success(input);
        return true;
    }
}
const errorMessage = (input, message) => {
    input.classList.remove('is-valid');
    input.classList.add('is-invalid');
    input.parentElement.querySelector('.invalid-feedback').innerText = message;
}
const success = input => {
    input.classList.remove('is-invalid');
    input.classList.add('is-valid');
}

// lägg till ny todo till databasen med POST 


form.addEventListener('submit', e => {
    e.preventDefault();

    validateText(newTodo);
    
    if(validateText(newTodo)) {
        createTodoListElement(newTodo);
    }
    
})


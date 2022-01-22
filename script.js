const form = document.querySelector('#form');
const input = document.querySelector('#newTodo');
const output = document.querySelector('#todoList');
const button = document.querySelector('#removeTodo');


let todoList = [];

// hämtar hem listan med todos från databasen 
const fetchTodos =  async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos');
    const data = await response.json();
    todoList = data;
    
    printTodos();
}

fetchTodos();

// skriver ut listan som hämtats på sidan när den laddas
const printTodos = () => {
    output.innerHTML = '';
    todoList.forEach(todo => {
        output.innerHTML += `
            <li class="list-group-item">
                <input id="checkbox" class="form-check-input me-1" type="checkbox" value="" aria-label="">
                ${todo.id} ${todo.title}
            </li>
        `;
    })
}

// const createTodoListElement = (todo) => {
//     output.innnerHTML = '';
//     //forEach()    
//         output.innerHTML += `
//             <li id="todo" class="list-group-item">
//                 <input class="form-check-input me-1" type="checkbox" value="" aria-label="">
//                 ${todo.value}
//             </li>
//         `;
// }


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
const postNewTodo = todoTitle => {
    fetch('https://jsonplaceholder.typicode.com/todos', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
            title: todoTitle,
            completed: false,
        }),
    })
    .then(response => response.json())
    .then(data => {
        
        todoList.unshift(data);
        
        printTodos();
    })
}



// lyssna efter en ny todo
form.addEventListener('submit', e => {
    e.preventDefault();

    validateText(input);
    
    if(validateText(input)) {
        postNewTodo(input.value);
       
        
    }

    
})

button.addEventListener('click', () => {
    console.log('Klick');

     


}) 


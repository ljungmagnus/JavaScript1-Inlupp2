const form = document.querySelector('#form');
const input = document.querySelector('#newTodo');
const output = document.querySelector('#output');
const button = document.querySelector('#removeTodo');
const todosForm = document.querySelector('#todosForm');
const notSelected = document.querySelector('#flexSwitchCheckChecked');
const selected = document.querySelector('#flexSwitchCheckDefault');

let todoList = [];

// hämtar hem listan med todos från databasen och sparar i todoList[]
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
        output.innerHTML += createTodoListElement(todo);
    })
} 

const createTodoListElement = todo => {
    let listElement = '';
    
    if(todo.completed) {
        listElement = `
        <div class="form-check form-switch my-3">
            <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" checked>
            <label class="form-check-label" for="flexSwitchCheckChecked">${todo.id} ${todo.title}</label>
        </div>
        `;
    }
    else {
        listElement = `
        <div class="form-check form-switch my-3">
            <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault">
            <label class="form-check-label" for="flexSwitchCheckDefault">${todo.id} ${todo.title}</label>
        </div>  
        `;
    }
    
    
    return listElement;
}

todosForm.addEventListener('submit', e => {
    e.preventDefault();

    
    removeCompletedTodos();
       

})

const removeCompletedTodos = () => {
   //The filter() method creates a new array filled with elements that pass a test provided by a function.
    todoList = todoList.filter(todo => !todo.completed);
    printTodos();


    // DELETE from db
    
    deleteTodoFromDb(1);
    
    
    // if()
    // todo.remove()
    
}

const deleteTodoFromDb = (id) => {
    let url = 'https://jsonplaceholder.typicode.com/todos/'+id;
    
    fetch(url, {
        method: 'DELETE',
    })
    .then(response => response.ok)
    .then(data =>  {
      if(data === true) {
        // console.log('allt ok');
        // console.log(data);
        // todo.remove()
        
      }

    })
    .catch(err => console.log(err))

    
}

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





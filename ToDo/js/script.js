`use strict`;
//создаем класс todo листа
class Todo {
	constructor(form, input, todoList, todoCompleted) {
		this.form = document.querySelector(form);
		this.input = document.querySelector(input);
		this.todoList = document.querySelector(todoList);
		this.todoCompleted = document.querySelector(todoCompleted);
		this.todoData = new Map(JSON.parse(localStorage.getItem("toDoList")));
	}
	//добавляем в localstorage для сохранения данных
	addToStorage() {
		localStorage.setItem("toDoList", JSON.stringify([...this.todoData]));
	}
	//фия для изменения коллекции
	render() {
		this.input.value = "";
		this.todoList.textContent = "";
		this.todoCompleted.textContent = "";
		this.todoData.forEach(this.createItem, this);
		this.addToStorage();
	}
	//создание элемента
	createItem(todo) {
		const li = document.createElement("li");
		li.classList.add("todo-item");
		li.key = todo.key;
		li.insertAdjacentHTML(
			"beforeend",
			`
		<span class="text-todo">${todo.value}</span>
				<div class="todo-buttons">
					<button class="todo-remove"></button>
					<button class="todo-complete"></button>
				</div>
				`
		);
		if (todo.completed) {
			this.todoCompleted.append(li);
		} else {
			this.todoList.append(li);
		}
	}
	//добавление элемента на страницу/ в коллекцию / в localstorage
	addTodo(e) {
		e.preventDefault();
		if (this.input.value.trim()) {
			const newTodo = {
				value: this.input.value,
				complete: false,
				key: this.generateKey(),
			};
			this.todoData.set(newTodo.key, newTodo);
			this.render();
		} else {
			alert("Нельзя добавить пустое поле");
		}
		console.log(this);
	}
	//генерация ключа элемента
	generateKey() {
		return (
			Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
		);
	}
	//удаление элемента
	deleteItem(item) {
		//перебираем коллекцию
		this.todoData.forEach((el) => {
			//если ключ элемента коллекции равен ключу элемента на который кликнули
			if (el.key === item.key) {
				//удаляем элемент из коллекции
				this.todoData.delete(el.key);
			}
		});
		//добавляем изменения коллкции на страницу
		this.render();
	}
	//forEach перебрать todoData и поменять значение completed
	completedItem(item) {
		//перебираем коллекцию
		this.todoData.forEach((el) => {
			console.log(el.key);
			//если ключ элемента коллекции равен ключу элемента на который кликнули
			if (el.key === item.key) {
				if (el.completed === true) {
					el.completed = false;
				} else {
					el.completed = true;
				}
			}
		});
		this.render();
	}
	//обработчик событий определяет на какую кнопку кликнули и вызвать deltte || completed
	//на todo-container
	handler() {
		//находим элемент с классом todo-container
		const todoContainer = document.querySelector(".todo-container");
		//вешаем на контейнер обработчик событий
		todoContainer.addEventListener("click", (e) => {
			const target = e.target;
			//если нажали на элемент с классом .todo-remove
			if (target.matches(".todo-remove")) {
				//присваеваем item ближайшему вспылвающему элементу с классом .todo-item
				const item = target.closest(".todo-item");
				//передаем item в функцию удаления чтобы сравнить ее ключ
				this.deleteItem(item);
			} else if (target.matches(".todo-complete")) {
				const item = target.closest(".todo-item");
				this.completedItem(item);
			}
		});
	}
	//вешаем обработчик событий на добавления элементовб вызываем фии 
	init() {
		this.form.addEventListener("submit", this.addTodo.bind(this));
		this.render();
		this.handler();
	}
}

const todo = new Todo('.todo-control', '.header-input', '.todo-list', '.todo-completed');
todo.init();

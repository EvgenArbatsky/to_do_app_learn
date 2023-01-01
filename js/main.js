//Находим элементы на странице
const form = document.querySelector('#form');
const taskInput = document.querySelector('#taskInput');
const tasksList = document.querySelector('#tasksList');
const emptyList = document.querySelector('#emptyList');

let tasks = [];


form.addEventListener('submit', addTask);
tasksList.addEventListener('click', deleteTask)
tasksList.addEventListener('click', doneTask)

// Функции
function addTask(event) {
    // Отменяем отправку формы, чтобы страница не перезагружалась
    event.preventDefault();
    // Достаем текст задачи из поля ввода
    const taskText = taskInput.value;
    // Создаем объект задачи
    const newTask = {
        id: Date.now(),
        text: taskText,
        done: false
    }
    // Добавляем объект в массив с задачами
    tasks.push(newTask)
    // Формируем CSS класс
    const cssClass = newTask.done ? 'task-title task-title--done' : 'task-title';

    // Формируем разметку для новой задачи
    const taskHTML = `
				<li id="${newTask.id}" class="list-group-item d-flex justify-content-between task-item">
					<span class="${cssClass}">${newTask.text}</span>
					<div class="task-item__buttons">
						<button type="button" data-action="done" class="btn-action">
							<img src="./img/tick.svg" alt="Done" width="18" height="18">
						</button>
						<button type="button" data-action="delete" class="btn-action">
							<img src="./img/cross.svg" alt="Done" width="18" height="18">
						</button>
					</div>
				</li>
    `
    // Добавляем задачу на страницу
    tasksList.insertAdjacentHTML('beforeend', taskHTML);
    // Очищаем поле ввода и возвращаем на него фокус
    taskInput.value = "";
    taskInput.focus();
    // Скрываем заглушку
    if (tasksList.children.length > 1) {
        emptyList.classList.add('none');
    }
}

function deleteTask(event) {
    // Проверяем что клик был по кнопке "удалить задачу"
    if (event.target.dataset.action === 'delete') {
        const parentNode = event.target.closest('.list-group-item');
        // Определяем ID задачи
        const id = Number(parentNode.id);
        // Находим индекс задачи в массиве
        const index = tasks.findIndex(function(task){
            if (task.id === id) {
                return true;
            }
        })
        // Удаляем задачу из массива с задачами
        tasks.splice(index, 1);

        // Удаляем задачу из разметки
        parentNode.remove();
        // Возвращаем заглушку если список пуст
        if (tasksList.children.length === 1) {
            emptyList.classList.remove('none');
        }
    }
}

function doneTask(event) {
    // Проверяем, что клик был по кнопке "Задача выполнена"
    if (event.target.dataset.action === "done") {
        const parentNode = event.target.closest('.list-group-item');

        const id = Number(parentNode.id);
        const task = tasks.find(function (task) {
            if (task.id === id) {
                return true
            }
        })
        task.done = !task.done

        const taskTitle = parentNode.querySelector('.task-title');
        taskTitle.classList.toggle('task-title--done')
    }
}
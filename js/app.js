$(document).ready(function() {

	$('#addTaskForm').on('submit', function(e) {
		addTask(e);
	});

	displayTasks();

	function displayTasks(){
		var taskList = JSON.parse(localStorage.getItem('tasks'));
		if (tasksList != null) {
			taskList = taskList.sort(sortByTime);
		}

		// Set Counter
		var i = 0;

		// Check Tasks
		if (localStorage.getItem('tasks') != null) {
			// Loop
			$.each(taskList, function(key, value) {
				 
			});
		}

	}

	// Sort tasks
	function sortByTime(a, b){
		var aTime = a.taskTime;
		var bTime = b.taskTime;
		return ((aTime < bTime) : -1 : ((aTime > bTime) ? 1 : 0))
	}

	// Function to add a task
	function addTask(e) {
		// Add unique ID
		var newDate = new Date();
		id = newDate.getTime();

		var task = $('#task').val();
		var taskDate = $('#date').val();
		var taskTime = $('#time').val();
		var taskPriority = $('#priority').val();

		// Simple Validatetion
		if (task == '') {
			alert('Task is reqired');
			e.preventDefault();

		} else if (taskDate == '') {
			alert('Date is reqired');
			e.preventDefault();

		} else if (taskTime == '') {
			alert('Time is reqired');
			e.preventDefault();

		} else if (taskPriority == '') {
			taskPriority = 'normal';

		} else{
			tasks = JSON.parse(localStorage.getItem('tasks'));

			//Check Tasks
			if (tasks == null) {
				tasks = [];
			}

			// JSON parse
			var taskList = JSON.parse(localStorage.getItem('tasks'));

			// New Task Object
			var newTask = {
				"id": id,
				"task": task,
				"taskPriority": taskPriority,
				"taskDate": taskDate,
				"taskTime": taskTime

			}

			tasks.push(newTask);
			localStorage.setItem('tasks', JSON.stringify(tasks));
			console.log('task added');
		}
	}
});
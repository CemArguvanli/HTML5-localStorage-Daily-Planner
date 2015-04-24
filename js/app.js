$(document).ready(function() {

	$('#addTaskForm').on('submit', function(e) {
		addTask(e);
	});


	// Function to add a task
	function addTask(e) {
		// Add unique ID
		//var newDate = new Date();
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
			task = JSON.parse(localStorage.getItem('tasks'));

			//Check Tasks
			if (tasks == null) {
				tasks = [];
			}

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
		}

	}

});
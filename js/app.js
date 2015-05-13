$(document).ready(function() {

    // Add task event
    $('#addTaskForm').on('submit', function(e) {
        addTask(e);
    });

    // Edit task event
    $('#editTaskForm').on('submit', function(e) {
        updateTask(e);
    });

    // Remove task event
    $('#taskTable').on('click', '#removeTask', function(event) {
    	id = $(this).data('id');
    	removeTask(id);
    });

    // Clear task event
    $('#clearTask').on('click', function(event) {
    	clearAllTasks();
    });

    displayTasks();

    function displayTasks() {
        var taskList = JSON.parse(localStorage.getItem('tasks'));
        if (taskList != null) {
            taskList = taskList.sort(sortByTime);
        }

        // Set Counter
        var i = 0;

        // Check Tasks
        if (localStorage.getItem('tasks') != null) {
            // Loop
            $.each(taskList, function(key, value) {
                var s = $('#taskTable').append('<tr id="' + value.id + '">' + '<td>' + value.task + '</td>' + '<td>' + value.taskPriority + '</td>' + '<td>' + value.taskDate + '</td>' + '<td>' + value.taskTime + '</td>' + '<td> <a href="edit.html?id=' + value.id + '">Edit</a> <a href="#" id="removeTask" data-id="'+ value.id+'">Remove</a> </td>' + '</tr>');
            });
        }

    }

    // Sort tasks
    function sortByTime(a, b) {
        var aTime = a.taskTime;
        var bTime = b.taskTime;
        return ((aTime < bTime) ? -1 : ((aTime > bTime) ? 1 : 0))
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

        } else {
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

    // Update task
    function updateTask(e) {
        var id = $('#taskId').val();
        var task = $('#task').val();
        var taskDate = $('#date').val();
        var taskTime = $('#time').val();
        var taskPriority = $('#priority').val();

        taskList = JSON.parse(localStorage.getItem('tasks'));

        for (var i = 0; i < taskList.length; i++) {
            if (taskList[i].id == id) {
                taskList.splice(i, 1)
            }
            localStorage.setItem('tasks', JSON.stringify(taskList))
        }

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

        } else {
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
            console.log('task edit');
        }
    }

    function removeTask(id){
    	if (confirm('Are you sure?')) {
    		var taskList = JSON.parse(localStorage.getItem('tasks'));

	        for (var i = 0; i < taskList.length; i++) {
	            if (taskList[i].id == id) {
	                taskList.splice(i, 1)
	            }
	            localStorage.setItem('tasks', JSON.stringify(taskList))
	        }   
	        location.reload(); 		
    	}
    }

    function clearAllTasks(){
    	if (confirm('Are you sure')) {
    		localStorage.clear();
    		location.reload();
    	}
    }
});

// getting single task
function getTask() {
    var $_GET = getQueryParams(document.location.search);
    id = $_GET['id'];

    var taskList = JSON.parse(localStorage.getItem('tasks'));

    for (var i = 0; i < taskList.length; i++) {
        if (taskList[i].id == id) {
            $('#editTaskForm #taskId').val(taskList[i].id);
            $('#editTaskForm #task').val(taskList[i].task);
            $('#editTaskForm #priority').val(taskList[i].taskPriority);
            $('#editTaskForm #date').val(taskList[i].taskDate);
            $('#editTaskForm #time').val(taskList[i].taskTime);
        }
    }
}

// get http get requests
function getQueryParams(qs) {
    qs = qs.split("+").join(" ");
    var params = {},
        tokens,
        re = /[?&]?([^=]+)=([^&]*)/g;

    while (tokens = re.exec(qs)) {
        params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2])
    }

    return params;
}

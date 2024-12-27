
$(document).ready(function () {
    const apiBaseUrl = 'http://127.0.0.1:8000/api';
    const token = localStorage.getItem('token');

    function showLogin() {
        $('#loginSection').removeClass('d-none');
        $('#registerSection, #taskSection').addClass('d-none');
    }

    function showRegister() {
        $('#registerSection').removeClass('d-none');
        $('#loginSection, #taskSection').addClass('d-none');
    }


    function showTasks() {
        $('#taskSection').removeClass('d-none');
        $('#loginSection, #registerSection').addClass('d-none');
        fetchTasks();
    }


    function fetchTasks() {
        $.ajax({
            url: `${apiBaseUrl}/tasks`,
            method: 'GET',
            headers: { Authorization: `Bearer ${token}` },
            success: function (tasks) {
                $('#taskList').html('');
                tasks.forEach(task => {
                    $('#taskList').append(`
                        <div class="card mb-2">
                            <div class="card-body">
                                <h5>${task.title}</h5>
                                <p>${task.description}</p>
                                <p>${task.status}</p>
                                <button class="btn btn-warning updateTaskBtn" data-id="${task.id}">Update</button>
                                <button class="btn btn-danger deleteTaskBtn" data-id="${task.id}">Delete</button>
                            </div>
                        </div>
                    `);
                });
            },
            error: function (xhr) {
                console.error(xhr.responseJSON.message);
            }
        });
    }

    

    


    $('#loginForm').submit(function (e) {
        e.preventDefault();
        const email = $('#loginEmail').val();
        const password = $('#loginPassword').val();

        
        

        $.ajax({
            url: `${apiBaseUrl}/login`,
            method: 'POST',
            data: { email, password },
            xhrFields: { withCredentials: true },
            success: function (response) {
                localStorage.setItem('token', response.token);
                showTasks();
            },
            error: function (xhr) {
                $('#loginMessage').html('<div class="alert alert-danger">Login failed. Please check your credentials.</div>');
            }
        
    
});

    });

    $('#goToRegister').click(function () {
        showRegister();
    });

    $('#goToLogin').click(function () {
        showLogin();
    });
   
    



    $('#registerForm').submit(function (e) {
        e.preventDefault();
        const name = $('#registerName').val();
        const email = $('#registerEmail').val();
        const password = $('#registerPassword').val();
        const password_confirmation = $('#registerPasswordConfirmation').val();
        $.ajax({
            url: `${apiBaseUrl}/register`,
            method: 'POST',
            data: { name, email, password, password_confirmation },
            success: function () {
                showLogin();
            },
            error: function (xhr) {
                $('#registerMessage').html('<div class="alert alert-danger">Registration failed. Try again.</div>');
            }
        });
    });





    $('#logoutBtn').click(function () {
        localStorage.removeItem('token');
        showLogin();
    });




    $('#addTaskBtn').click(function () {
        const title = prompt('Enter task title:');
        const description = prompt('Enter task description:');
        const due_date = prompt('Enter task due date (YYYY-MM-DD):'); // Ask for due date
        if (title && description) {
            
            $.ajax({
                
                url: `${apiBaseUrl}/tasks`,
                method: 'POST',
                headers: { Authorization: `Bearer ${token}` },
                data: { title, description,due_date },
                success: function () {
                    fetchTasks();
                },
                error: function (xhr) {
                    alert('Failed to add task.');
                }
            });
        }
    });


    $('#taskList').on('click', '.updateTaskBtn', function () {
        const id = $(this).data('id');
        const title = prompt('Update task title:');
        const description = prompt('Update task description:');
        const due_date = prompt('Enter task due date (YYYY-MM-DD):'); // Ask for due date
        const status = prompt('Update task status (Pending, In Progress, Completed):[This is Case-Sensitive]');

        if (title && description) {
            $.ajax({
                url: `${apiBaseUrl}/tasks/${id}`,
                method: 'PUT',
                headers: { Authorization: `Bearer ${token}` },
                data: { title, description,due_date,status },
                success: function () {
                    fetchTasks();
                },
                error: function () {
                    alert('Failed to update task.');
                }
            });
        }
    });

    $('#taskList').on('click', '.deleteTaskBtn', function () {
        const id = $(this).data('id');
        $.ajax({
            url: `${apiBaseUrl}/tasks/${id}`,
            method: 'DELETE',
            headers: { Authorization: `Bearer ${token}` },
            success: function () {
                fetchTasks();
            },
            error: function () {
                alert('Failed to delete task.');
            }
        });
    });

    if (token) {
        showTasks();
    } else {
        showLogin();
    }
});


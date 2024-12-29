# Task Management System

## Important Notice

[ **Security Notice:** The ".env" file contains sensitive environment variables and will **not** be uploaded to GitHub for security reasons. To ensure a smooth setup, I have copied the contents of the .env file into the ".env.example" file. Please make sure to create your own ".env" file locally with the appropriate credentials, such as database connection details and other sensitive environment variables.
  
- **Database:** The application requires a working MySQL database. I have migration folder inside of my database folder. You will find all my database table after migration.]

##
A simple task management system built using HTML, Bootstrap, and AJAX, allowing users to manage their tasks efficiently through a user-friendly interface.

## Features
- Create, update, and delete tasks.
- Mark tasks as complete or pending.
- Use AJAX for seamless interactions without page reloads.
- User authentication for secure access to task management features.

## Approach
This project was built using the following technologies:
- **Frontend:** HTML, CSS, Bootstrap for responsive design, and JavaScript (AJAX) for dynamic user interactions.
- **Backend:** The application uses XAMPP with MySQL to simulate the backend database.
- **AJAX:** Allows real-time updates of task statuses and information without page reloads.

### Database

-  The application requires a working MySQL database. I have migration folder inside of my database folder. You will find all my database table after migration
## API Endpoints

Here are the API endpoints used in the Task Management System:

### 1. **POST /api/register**
   - **Description:** Register a new user.
   - **Request Body:**
     json
     {
       "username": "newuser",
       "email": "user@example.com",
       "password": "password123"
     }

     
   - **Response:**
     json
     {
       "message": "User registered successfully",
       "user": {
         "id": 1,
         "username": "newuser",
         "email": "user@example.com"
       }
     }


### 2. **POST /api/login**
   - **Description:** Login an existing user.
   - **Request Body:**
     json
     {
       "email": "user@example.com",
       "password": "password123"
     }
     
   - **Response:**
     json
     {
       "message": "Login successful",
       "token": "sanctum_token_here" 
     }
     

### 3. **GET /api/tasks**
   - **Description:** Retrieve a list of all tasks (requires authentication).
   - **Headers:**
     - Authorization: Bearer <sanctum_token>
   - **Response:**
     json
     [
       {
         "id": 1,
         "title": "Task 1",
         "description": "Description of task 1",
         "status": "pending"
       },
       {
         "id": 2,
         "title": "Task 2",
         "description": "Description of task 2",
         "status": "completed"
       }
     ]
     

### 4. **POST /api/tasks**
   - **Description:** Create a new task (requires authentication).
   - **Headers:**
     - `Authorization: Bearer <sanctum_token>`
   - **Request Body:**
     json
     {
       "title": "New Task",
       "description": "This is a new task",
       "status": "pending"
     }
     
   - **Response:**
     json
     {
       "message": "Task created successfully",
       "task": {
         "id": 3,
         "title": "New Task",
         "description": "This is a new task",
         "status": "pending"
       }
     }
     

### 5. **PUT /api/tasks/{id}**
   - **Description:** Update an existing task by ID (requires authentication).
   - **Headers:**
     - Authorization: Bearer <sanctum_token>`
   - **Request Body:**
     json
     {
       "title": "Updated Task",
       "description": "Updated description",
       "status": "completed"
     }
     
   - **Response:**
     json
     {
       "message": "Task updated successfully"
     }
     

### 6. **DELETE /api/tasks/{id}**
   - **Description:** Delete a task by ID (requires authentication).
   - **Headers:**
     - Authorization: Bearer <sancutm_token>`
   - **Response:**
     json
     {
       "message": "Task deleted successfully"
     }
     

## Installation

1. Clone this repository:
   bash
   git clone https://github.com/Mazharul139/Task-Management-System.git

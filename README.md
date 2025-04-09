# Virtual Event Management Platform

A platform to manage virtual events, allowing users to register, log in, and participate in events. Organizers can create, update, and delete events, while users can register for events.

## Project Structure
```
.env
.gitignore
app.js
package.json
controllers/
  eventsController.js
  usersController.js
messageTemplates/
  eventRegistrationMessage.js
  userRegistrationMessage.js
middlewares/
  authorization.js
models/
  eventModel.js
  userModel.js
routes/
  eventRoutes.js
  userRoutes.js
util/
  sendEmail.js
```

## Features
- User registration and login with JWT-based authentication.
- Event creation, updating, and deletion by organizers.
- Event registration for users.
- Email notifications for event registration.
- Middleware for authorization.

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd virtual-event-management-platform
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following environment variables:
   ```
   PORT=<your-port>
   MONGO_URI=<your-mongodb-uri>
   JWT_SECRET=<your-jwt-secret>
   EMAIL_USER=<your-email>
   EMAIL_PASS=<your-email-password>
   ```

## Running the Server

Start the server:
```bash
npm start
```

## API Endpoints

### User Routes
- **POST** `/users/register`: Register a new user.
- **POST** `/users/login`: Log in a user.

### Event Routes
- **GET** `/events`: Get all events.
- **POST** `/events`: Create a new event (organizers only).
- **PUT** `/events/:id`: Update an event (organizers only).
- **DELETE** `/events/:id`: Delete an event (organizers only).
- **POST** `/events/:id/register`: Register for an event.

## Technologies Used
- **Node.js**: Backend runtime.
- **Express**: Web framework.
- **MongoDB**: Database.
- **Mongoose**: ODM for MongoDB.
- **Nodemailer**: Email sending.
- **JWT**: Authentication and authorization.
- **dotenv**: Environment variable management.

## Folder Details

### `controllers/`
- **eventsController.js**: Handles event-related logic.
- **usersController.js**: Handles user-related logic.

### `messageTemplates/`
- **eventRegistrationMessage.js**: Template for event registration emails.
- **userRegistrationMessage.js**: Template for user registration emails.

### `middlewares/`
- **authorization.js**: Middleware for verifying user roles and permissions.

### `models/`
- **eventModel.js**: Mongoose schema for events.
- **userModel.js**: Mongoose schema for users.

### `routes/`
- **eventRoutes.js**: Routes for event-related API endpoints.
- **userRoutes.js**: Routes for user-related API endpoints.

### `util/`
- **sendEmail.js**: Utility for sending emails using Nodemailer.

## License
This project is licensed under the ISC License.

## Author
Yash
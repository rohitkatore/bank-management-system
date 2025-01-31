# Bank Management System Backend

A robust Node.js/Express backend for the Bank Management System with role-based authentication, bank account management, and admin functionalities.

## Features

- **Authentication System**
  - User registration with role selection (admin/user)
  - Secure login with JWT token generation
  - Password hashing using bcrypt
  - Token-based authentication middleware

- **Bank Account Management**
  - Create, read, update, and delete bank accounts
  - Account validation and error handling
  - Secure routes with authentication
  - Role-based access control

- **Admin Features**
  - View all bank accounts across users
  - Search functionality for bank accounts
  - User statistics and monitoring
  - Admin-only protected routes

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JSON Web Tokens (JWT)
- **Password Hashing**: bcrypt
- **API Testing**: Postman

## Project Structure

```
backend/
├── config/             # Configuration files
│   └── db.js          # Database configuration
├── controllers/        # Request handlers
│   ├── auth.controller.js
│   ├── bank.controller.js
│   └── admin.controller.js
├── middleware/         # Custom middleware
│   ├── auth.js        # Authentication middleware
│   └── admin.js       # Admin role verification
├── models/            # Database models
│   ├── user.model.js
│   └── bank.model.js
├── routes/            # API routes
│   ├── auth.route.js
│   ├── bank.route.js
│   └── admin.route.js
├── utils/             # Utility functions
├── .env               # Environment variables
├── package.json       # Project dependencies
└── server.js          # Application entry point
```

## API Endpoints

### Authentication Routes
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login user and get token

### Bank Routes (Protected)
- `GET /bank/all` - Get all banks for logged-in user
- `POST /bank/add` - Add a new bank account
- `PUT /bank/:id` - Update bank account
- `DELETE /bank/:id` - Delete bank account
- `GET /bank/:id` - Get specific bank account

### Admin Routes (Protected, Admin Only)
- `GET /admin/all` - Get all bank accounts
- `GET /admin/search` - Search bank accounts
- `GET /admin/stats` - Get system statistics

## Setup and Installation

1. **Prerequisites**
   - Node.js (v14 or higher)
   - MongoDB (v4.4 or higher)
   - npm or yarn

2. **Installation Steps**
   ```bash
   # Clone the repository
   git clone <repository-url>

   # Navigate to backend directory
   cd bank-management-system/backend

   # Install dependencies
   npm install

   # Create .env file
   cp .env.example .env

   # Start the server
   npm start
   ```

3. **Environment Variables**
   Create a `.env` file with the following variables:
   ```
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/bank-management
   JWT_SECRET=your_jwt_secret_key
   ```

## Database Schema

### User Model
```javascript
{
  username: String,
  email: String,
  password: String,
  role: String,
  createdAt: Date
}
```

### Bank Account Model
```javascript
{
  user: ObjectId,
  bankName: String,
  accountHolderName: String,
  accountNumber: String,
  ifscCode: String,
  branchName: String,
  createdAt: Date
}
```

## Error Handling

The API implements comprehensive error handling:
- Validation errors
- Authentication errors
- Database errors
- Not found errors
- Server errors

## Security Measures

1. **Password Security**
   - Passwords are hashed using bcrypt
   - Minimum password length enforcement
   - Password strength validation

2. **API Security**
   - JWT token authentication
   - Role-based access control
   - Request validation
   - Rate limiting
   - CORS configuration

3. **Data Security**
   - Input sanitization
   - MongoDB injection prevention
   - Sensitive data encryption

## Testing

Run tests using:
```bash
npm test
```

## API Documentation

Detailed API documentation is available at `/api-docs` when running in development mode.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email support@bankmanagementsystem.com or create an issue in the repository.

# Backend for Course Subscription & Management System

This repository contains the backend code for a course subscription and management system that allows users to register, log in, purchase subscriptions, manage playlists, and more. Admins can manage courses, payments, and users through API endpoints.

## Table of Contents
- [Folder Structure](#folder-structure)
- [API Endpoints](#api-endpoints)
- [Technologies Used](#technologies-used)
- [Environment Variables](#environment-variables)
- [Setup Instructions](#setup-instructions)
- [License](#license)

## Folder Structure

```bash
├── Config
│   ├── Config.env        # Stores all environment variables
│   └── Database.js       # Database connection setup
├── Controllers
│   ├── CourseController.js  # Course-related controllers
│   ├── UserController.js    # User-related controllers
│   ├── PaymentController.js # Payment & subscription controllers
│   └── OtherController.js   # Miscellaneous controllers (contact, course request, dashboard stats)
├── Middlewares
│   ├── Auth.js            # Auth-related middlewares
│   ├── CatchAsyncError.js  # Error handling middleware wrapper
│   ├── Multer.js          # File upload middleware
│   └── Error.js           # Custom error handling middleware
├── Models
│   ├── Course.js          # Course schema and model
│   ├── Payment.js         # Payment schema and model
│   ├── Stats.js           # Statistics schema and model
│   └── User.js            # User schema and model
├── Routes
│   ├── CourseRoutes.js    # Course-related routes
│   ├── PaymentRoutes.js   # Payment-related routes
│   ├── OtherRoutes.js     # Miscellaneous routes
│   └── UserRoutes.js      # User-related routes
├── Utils
│   ├── DataUri.js         # Utility function to get file URI
│   ├── ErrorHandler.js    # Custom error handler class
│   ├── SendEmail.js       # Utility function to send emails
│   └── SendToken.js       # Utility function to set JWT token in cookie
├── App.js                # Main application file (express app)
└── Server.js             # Server configuration and startup

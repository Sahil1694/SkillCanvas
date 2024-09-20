# Backend for SkillCanvas Website

This repository contains the backend code for SkillCanvas Website that allows users to register, log in, purchase subscriptions, manage playlists, and more. Admins can manage courses, payments, and users through API endpoints.

## Table of Contents
- [Folder Structure](#folder-structure)
- [API Endpoints](#api-endpoints)
- [Technologies Used](#technologies-used)
- [Environment Variables](#environment-variables)
- [Setup Instructions](#setup-instructions)

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

```

## API Endpoints

```bash
├── User APIs
│   ├── POST /api/v1/register           # Register a new user
│   ├── POST /api/v1/login              # Log in
│   ├── POST /api/v1/logout             # Log out
│   ├── PUT /api/v1/me/update           # Update profile (name, email)
│   ├── PUT /api/v1/me/profile-picture  # Update profile picture
│   ├── PUT /api/v1/change-password     # Change password
│   ├── POST /api/v1/forgot-password    # Send password reset link
│   ├── PUT /api/v1/reset-password/:token  # Reset password with token
│   ├── POST /api/v1/playlist/add       # Add a course to playlist
│   ├── DELETE /api/v1/playlist/remove  # Remove a course from playlist
│   ├── PUT /api/v1/admin/user-role/:id # Update user role to admin
│   ├── GET /api/v1/users               # Get all users (admin only)
│   ├── GET /api/v1/me                  # Get user profile details
│   ├── DELETE /api/v1/me               # Delete logged-in user profile

├── Course APIs
│   ├── POST /api/v1/admin/course       # Create a new course (admin only)
│   ├── GET /api/v1/courses             # Get all courses
│   ├── POST /api/v1/admin/lecture/:id  # Add a lecture to a course
│   ├── GET /api/v1/course/:id/lectures # Get all lectures for a course
│   ├── DELETE /api/v1/admin/lecture/:courseId/:lectureId  # Delete a specific lecture from a course
│   ├── DELETE /api/v1/admin/course/:id # Delete a course (admin only)

├── Payment APIs
│   ├── POST /api/v1/subscribe          # Buy a subscription
│   ├── POST /api/v1/payment-verification # Payment verification callback
│   ├── GET /api/v1/get-razorpay-key    # Get Razorpay API key
│   ├── DELETE /api/v1/cancel-subscription # Cancel a user's subscription

├── Other APIs
│   ├── POST /api/v1/contact            # Send a contact form email
│   ├── POST /api/v1/course-request     # Send a course request form email
│   ├── GET /api/v1/admin/stats         # Get dashboard statistics (admin only)

```

## Technologies Used

```bash
- **Node.js** - Backend runtime
- **Express.js** - Web framework for Node.js
- **MongoDB** - Database
- **Mongoose** - MongoDB ODM
- **JWT** - For authentication
- **Bcrypt** - For password hashing
- **Cloudinary** - For media storage
- **Razorpay** - For payment processing
- **Nodemailer** - For sending emails
- **Multer** - For handling file uploads
- **Node-Cron** - For scheduling tasks (monthly stats)
- **Validator** - For data validation
```

## Environment Variables

```bash
You will need to set the following environment variables in a `.env` file:

PORT=5000  
PLAN_ID=<Your Razorpay Plan ID>  
RAZORPAY_API_KEY=<Your Razorpay API Key>  
RAZORPAY_API_SECRET=<Your Razorpay API Secret>  
JWT_SECRET=<Your JWT Secret>  
FRONTEND_URL=<Your frontend hosting URL>  
MONGO_URI=<Your MongoDB connection string>  
CLOUDINARY_CLIENT_NAME=<Your Cloudinary client name>  
CLOUDINARY_CLIENT_API=<Your Cloudinary API key>  
CLOUDINARY_CLIENT_SECRET=<Your Cloudinary API secret>  
RESET_PASSWORD_SECRET=<Your reset password token secret>  
SMTP_HOST=<Your email SMTP host>  
SMTP_PORT=<Your email SMTP port>  
SMTP_USER=<Your SMTP username>  
SMTP_PASS=<Your SMTP password>  
MY_MAIL=<Your email to receive contact forms>  
REFUND_DAYS=<Number of days to allow refunds>
```
## Setup Instructions

```bash
├── Clone the repository:
│   └── git clone <repository-url>
├── Install the dependencies:
│   └── npm install
├── Create a `.env` file and configure the environment variables as mentioned above.
└── Start the server:
    └── npm run dev
```

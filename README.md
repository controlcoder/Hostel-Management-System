# Hostel Management System

A comprehensive web-based application that provides a centralized, user-friendly platform for administrators, wardens, and students to seamlessly manage student registrations, track room allocations, monitor fee payments, and oversee hostel blocks in real-time.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Folder Structure](#folder-structure)
- [Project Workflow](#project-workflow)
- [Installation & Setup](#installation--setup)
- [Running the Project](#running-the-project)
- [API Endpoints](#api-endpoints)
- [Architecture](#architecture)

---

## 🎯 Overview

The Hostel Management System is a full-stack application designed to streamline hostel operations. It enables seamless management of student data, room assignments, fee tracking, and hostel block oversight. With role-based access control, the system caters to three main user types: Administrators, Wardens, and Students.

### Key Objectives:
- **Centralized Management**: Single platform for all hostel operations
- **Real-time Tracking**: Monitor student registrations and room allocations dynamically
- **Fee Management**: Transparent payment tracking and management
- **Role-Based Access**: Different interfaces for admins, wardens, and students
- **Data Integrity**: Secure storage and management of student information

---

## ✨ Features

### 1. **Student Registration Management**
   - Register new students with comprehensive details
   - Update student information
   - Track registration status
   - Maintain student profiles

### 2. **Room Allocation System**
   - Assign students to hostel rooms
   - Track room availability and capacity
   - Manage room preferences
   - View room occupancy status

### 3. **Fee Payment Tracking**
   - Record monthly/semester fees
   - Track payment status (Paid/Pending/Overdue)
   - Generate payment receipts
   - Financial reporting

### 4. **Hostel Block Management**
   - Manage multiple hostel blocks
   - Track block capacity and utilization
   - Monitor block-wise student distribution
   - Facility management

### 5. **Role-Based Dashboard**
   - **Admin Dashboard**: System-wide overview and controls
   - **Warden Dashboard**: Block-specific management
   - **Student Dashboard**: Personal room and fee information

### 6. **Real-time Updates**
   - Live synchronization of data
   - Instant notifications for important updates
   - Status change tracking

---

## 🛠️ Tech Stack

### **Frontend Stack**

| Technology | Version | Purpose |
|-----------|---------|---------|
| **React** | ^19.2.4 | UI library for building interactive interfaces |
| **Vite** | ^8.0.1 | Fast build tool and dev server |
| **React Router DOM** | ^7.13.2 | Client-side routing and navigation |
| **Tailwind CSS** | ^4.2.2 | Utility-first CSS framework for styling |
| **Axios** | ^1.14.0 | HTTP client for API requests |
| **React Hot Toast** | ^2.6.0 | Toast notifications library |
| **ESLint** | ^9.39.4 | Code linting and quality assurance |

### **Backend Stack**

| Technology | Version | Purpose |
|-----------|---------|---------|
| **Node.js** | Latest | JavaScript runtime |
| **Express.js** | ^5.2.1 | Web framework for REST APIs |
| **MongoDB** | Via Mongoose | NoSQL database for data storage |
| **Mongoose** | ^9.3.3 | ODM (Object Data Modeling) for MongoDB |
| **JWT** (jsonwebtoken) | ^9.0.3 | Authentication and authorization |
| **BCrypt** | ^6.0.0 | Password hashing and security |
| **BCryptjs** | ^3.0.3 | Alternative bcrypt implementation |
| **CORS** | ^2.8.6 | Cross-Origin Resource Sharing |
| **Cookie Parser** | ^1.4.7 | Parse HTTP cookies |
| **Dotenv** | ^17.3.1 | Environment variable management |

---

## 📁 Folder Structure

### **Project Root**
```
Hostel-Management-System/
├── backend/                  # Backend application
│   ├── src/                  # Source code directory
│   │   ├── config/           # Configuration files
│   │   │   ├── database.js   # MongoDB connection config
│   │   │   └── constants.js  # Application constants
│   │   │
│   │   ├── controllers/      # Business logic handlers
│   │   │   ├── authController.js
│   │   │   ├── studentController.js
│   │   │   ├── roomController.js
│   │   │   ├── feeController.js
│   │   │   └── blockController.js
│   │   │
│   │   ├── middlewares/      # Express middleware functions
│   │   │   ├── authMiddleware.js
│   │   │   ├── errorHandler.js
│   │   │   └── validation.js
│   │   │
│   │   ├── model/            # Database schemas & models
│   │   │   ├── Student.js    # Student schema
│   │   │   ├── Room.js       # Room schema
│   │   │   ├── Fee.js        # Fee schema
│   │   │   ├── Block.js      # Hostel block schema
│   │   │   └── User.js       # User authentication schema
│   │   │
│   │   └── routes/           # API route definitions
│   │       ├── authRoutes.js
│   │       ├── studentRoutes.js
│   │       ├── roomRoutes.js
│   │       ├── feeRoutes.js
│   │       └── blockRoutes.js
│   │
│   ├── index.js              # Main application entry point
│   ├── package.json          # Backend dependencies
│   ├── package-lock.json     # Locked dependency versions
│   └── .env                  # Environment variables (local)
│
├── frontend/                 # Frontend application
│   ├── src/                  # Source code directory
│   │   ├── api/              # API service functions
│   │   │   ├── authService.js
│   │   │   ├── studentService.js
│   │   │   ├── roomService.js
│   │   │   ├── feeService.js
│   │   │   └── blockService.js
│   │   │
│   │   ├── components/       # Reusable React components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── StudentCard.jsx
│   │   │   ├── RoomAllocationForm.jsx
│   │   │   ├── FeeTable.jsx
│   │   │   ├── BlockOverview.jsx
│   │   │   └── Modal.jsx
│   │   │
│   │   ├── context/          # React Context for state management
│   │   │   ├── AuthContext.jsx
│   │   │   ├── StudentContext.jsx
│   │   │   └── UIContext.jsx
│   │   │
│   │   ├── pages/            # Page components (full page views)
│   │   │   ├── LoginPage.jsx
│   │   │   ├── DashboardPage.jsx
│   │   │   ├── StudentManagementPage.jsx
│   │   │   ├── RoomAllocationPage.jsx
│   │   │   ├── FeeManagementPage.jsx
│   │   │   ├── BlockManagementPage.jsx
│   │   │   ├── StudentProfilePage.jsx
│   │   │   └── NotFoundPage.jsx
│   │   │
│   │   ├── assets/           # Static assets
│   │   │   ├── images/       # Image files
│   │   │   ├── icons/        # Icon files
│   │   │   └── logos/        # Logo files
│   │   │
│   │   ├── App.jsx           # Main App component with routing
│   │   ├── App.css           # App-level styling
│   │   ├── main.jsx          # React entry point
│   │   └── index.css         # Global styles
│   │
│   ├── public/               # Public static files
│   │   ├── favicon.ico
│   │   └── manifest.json
│   │
│   ├── index.html            # HTML template
│   ├── vite.config.js        # Vite build configuration
│   ├── eslint.config.js      # ESLint configuration
│   ├── package.json          # Frontend dependencies
│   ├── package-lock.json     # Locked dependency versions
│   └── .gitignore            # Git ignore rules
│
├── .gitignore                # Root .gitignore
└── README.md                 # Project documentation

```

### **Detailed Component Descriptions**

#### Backend Structure

**`/backend/src/config/`**
- Database connection setup
- Application-wide constants
- Third-party service configurations

**`/backend/src/controllers/`**
- `authController.js`: User login, registration, token generation
- `studentController.js`: CRUD operations for students
- `roomController.js`: Room assignment and management
- `feeController.js`: Fee tracking and payment processing
- `blockController.js`: Hostel block management

**`/backend/src/middlewares/`**
- `authMiddleware.js`: JWT verification and authentication
- `errorHandler.js`: Centralized error handling
- `validation.js`: Input validation and sanitization

**`/backend/src/model/`**
- Mongoose schemas defining database structure
- Data validation rules
- Methods for data manipulation

**`/backend/src/routes/`**
- RESTful API endpoint definitions
- Route-specific middleware application
- Controller method binding

#### Frontend Structure

**`/frontend/src/api/`**
- Axios instances for API communication
- Service functions for each domain
- Request/response interceptors

**`/frontend/src/components/`**
- Reusable UI components
- Forms, tables, cards, and modals
- Component-level state management

**`/frontend/src/context/`**
- Global state management using React Context
- Authentication state
- User and application data state

**`/frontend/src/pages/`**
- Full-page components
- Route-specific views
- Page-level logic and composition

---

## 🔄 Project Workflow

### **1. User Authentication Flow**

```
┌─────────────┐
│   User      │
└──────┬──────┘
       │
       ▼
┌─────────────────────────────────────┐
│  Frontend Login/Registration Page   │
│  - Email/Password Input             │
└──────┬──────────────────────────────┘
       │
       ▼ (HTTPS Request)
┌─────────────────────────────────────┐
│  Backend Authentication Routes      │
│  - POST /api/auth/login             │
│  - POST /api/auth/register          │
└──────┬──────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────┐
│  Auth Controller                    │
│  - Password hashing (bcrypt)        │
│  - User validation                  │
│  - Database lookup                  │
└──────┬──────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────┐
│  JWT Token Generation               │
│  - Create signed token              │
│  - Set expiration                   │
│  - Return to frontend               │
└──────┬──────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────┐
│  Frontend Storage                   │
│  - Store token (localStorage)       │
│  - Update Auth Context              │
│  - Redirect to Dashboard            │
└─────────────────────────────────────┘
```

### **2. Student Registration Flow**

```
┌──────────────────────────────┐
│  Admin/Warden                │
│  Initiates Student Reg.      │
└──────────┬───────────────────┘
           │
           ▼
┌──────────────────────────────┐
│  Frontend Form               │
│  - Student Details          │
│  - Contact Information      │
│  - Preferences              │
└──────────┬───────────────────┘
           │
           ▼ (Form Validation)
┌──────────────────────────────┐
│  API Request                 │
│  POST /api/student/register  │
│  + JWT Token (Auth)          │
└──────────┬───────────────────┘
           │
           ▼
┌──────────────────────────────┐
│  Auth Middleware             │
│  - Verify JWT Token          │
│  - Check User Role           │
│  - Validate Permissions      │
└──────────┬───────────────────┘
           │
           ▼
┌──────────────────────────────┐
│  Student Controller          │
│  - Parse Request Data        │
│  - Validate Inputs           │
│  - Check Duplicates          │
└──────────┬───────────────────┘
           │
           ▼
┌──────────────────────────────┐
│  Database Operation          │
│  - Create Student Document   │
│  - Generate Student ID       │
│  - Save to MongoDB           │
└──────────┬───────────────────┘
           │
           ▼
┌──────────────────────────────┐
│  Response to Frontend        │
│  - Success Message           │
│  - Student ID                │
│  - Updated Student List      │
└──────────┬───────────────────┘
           │
           ▼
┌──────────────────────────────┐
│  Frontend Update             │
│  - Update Context            │
│  - Show Notification         │
│  - Refresh UI                │
└──────────────────────────────┘
```

### **3. Room Allocation Flow**

```
┌──────────────────────────────┐
│  Warden/Admin Dashboard      │
│  Room Allocation Section     │
└──────────┬───────────────────┘
           │
           ▼
┌──────────────────────────────┐
│  Fetch Available Rooms       │
│  GET /api/room/available     │
│  + Block Filter (Optional)   │
└──────────┬───────────────────┘
           │
           ▼
┌──────────────────────────────┐
│  Room Controller             │
│  - Query MongoDB             │
│  - Filter by capacity        │
│  - Return room list          │
└──────────┬───────────────────┘
           │
           ▼
┌──────────────────────────────┐
│  Frontend Display            │
│  - Show Available Rooms      │
│  - Room Details              │
│  - Selection Interface       │
└──────────┬───────────────────┘
           │
           ▼
┌──────────────────────────────┐
│  Admin Selects Student+Room  │
│  - Choose from Dropdown      │
│  - Confirm Allocation        │
└──────────┬───────────────────┘
           │
           ▼ (POST Request)
┌──────────────────────────────┐
│  Allocation Endpoint         │
│  POST /api/room/allocate     │
│  - Student ID                │
│  - Room ID                   │
└──────────┬───────────────────┘
           │
           ▼
┌──────────────────────────────┐
│  Room Controller             │
│  - Verify Room Capacity      │
│  - Check Student Status      │
│  - Update Assignments        │
└──────────┬───────────────────┘
           │
           ▼
┌──────────────────────────────┐
│  MongoDB Updates             │
│  - Update Room Document      │
│  - Update Student Document   │
│  - Transaction Safe          │
└──────────┬───────────────────┘
           │
           ▼
┌──────────────────────────────┐
│  Success Response            │
│  - Confirmation              │
│  - Updated Room Status       │
└──────────┬───────────────────┘
           │
           ▼
┌──────────────────────────────┐
│  Frontend Update             │
│  - Toast Notification        │
│  - Refresh Room List         │
│  - Update Student Profile    │
└──────────────────────────────┘
```

### **4. Fee Management Flow**

```
┌──────────────────────────────┐
│  Admin/Warden                │
│  Fee Management Dashboard    │
└──────────┬───────────────────┘
           │
           ▼
┌──────────────────────────────┐
│  Fetch Fee Records           │
│  GET /api/fee/list           │
│  + Filters (Status, Block)   │
└──────────┬───────────────────┘
           │
           ▼
┌──────────────────────────────┐
│  Fee Controller              │
│  - Query Fee Database        │
│  - Apply Filters             │
│  - Calculate Totals          │
└──────────┬───────────────────┘
           │
           ▼
┌──────────────────────────────┐
│  Frontend Display            │
│  - Fee Table                 │
│  - Status Indicators         │
│  - Action Buttons            │
└──────────┬───────────────────┘
           │
           ▼
┌──────────────────────────────┐
│  Record Payment              │
│  POST /api/fee/record        │
│  - Student ID                │
│  - Amount                    │
│  - Payment Method            │
│  - Date                      │
└──────────┬───────────────────┘
           │
           ▼
┌──────────────────────────────┐
│  Fee Controller              │
│  - Validate Amount           │
│  - Create Fee Record         │
│  - Update Student Fee Status │
└──────────┬───────────────────┘
           │
           ▼
┌──────────────────────────────┐
│  Database Update             │
│  - Save Payment Record       │
│  - Update Fee Status         │
│  - Generate Receipt ID       │
└──────────┬───────────────────┘
           │
           ▼
┌──────────────────────────────┐
│  Response + Receipt          │
│  - Payment Confirmation      │
│  - Receipt Details           │
│  - Updated Fee Status        │
└──────────┬───────────────────┘
           │
           ▼
┌──────────────────────────────┐
│  Frontend Confirmation       │
│  - Show Receipt              │
│  - Update Fee Table          │
│  - Send Notification         │
└──────────────────────────────┘
```

### **5. Request-Response Cycle with Error Handling**

```
Frontend Request
    │
    ▼
API Interceptor (Add Auth Token)
    │
    ▼
HTTP Request to Backend
    │
    ▼
Backend Receives Request
    │
    ├─▶ Route Matching
    │
    ▼
Middleware Chain
    │
    ├─▶ CORS Check
    │
    ├─▶ Authentication (JWT Verification)
    │
    ├─▶ Input Validation
    │
    ▼
Controller Logic
    │
    ├─▶ Database Operation
    │
    ├─▶ Business Logic
    │
    ▼
Success?
    │
    ├─▶ YES: Send Response with Data (200/201)
    │
    └─▶ NO: Error Handler Middleware
            │
            ├─▶ Catch Error
            │
            ├─▶ Log Error
            │
            ▼
            Send Error Response
            (400/401/403/404/500)
    │
    ▼
Frontend Receives Response
    │
    ├─▶ Check Status Code
    │
    ├─▶ 2xx: Success Handler
    │       └─▶ Update State
    │       └─▶ Show Toast
    │       └─▶ Refresh UI
    │
    └─▶ 4xx/5xx: Error Handler
            └─▶ Log Error
            └─▶ Show Error Toast
            └─▶ Handle Auth Errors
```

---

## 🚀 Installation & Setup

### **Prerequisites**
- **Node.js** (v16 or higher)
- **npm** or **yarn** package manager
- **MongoDB** (Local or Atlas Cloud)
- **Git** for version control

### **Step 1: Clone the Repository**

```bash
git clone https://github.com/controlcoder/Hostel-Management-System.git
cd Hostel-Management-System
```

### **Step 2: Backend Setup**

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
touch .env

# Add the following environment variables:
# DATABASE_URL=mongodb://localhost:27017/hostel-management
# PORT=5000
# JWT_SECRET=your_jwt_secret_key_here
# JWT_EXPIRY=7d
# CORS_ORIGIN=http://localhost:5173

# Verify installation
npm list
```

### **Step 3: Frontend Setup**

```bash
# Navigate to frontend directory (from root)
cd frontend

# Install dependencies
npm install

# Create .env file (if needed)
touch .env.local

# Add the following (optional, Vite defaults work):
# VITE_API_URL=http://localhost:5000

# Verify installation
npm list
```

### **Step 4: Database Setup**

#### Option A: Local MongoDB
```bash
# Install MongoDB Community Edition
# https://docs.mongodb.com/manual/installation/

# Start MongoDB service
mongod

# Verify connection
mongo
```

#### Option B: MongoDB Atlas (Cloud)
```bash
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a cluster
4. Get connection string
5. Update DATABASE_URL in backend .env
```

---

## ▶️ Running the Project

### **Development Mode**

**Terminal 1 - Backend Server:**
```bash
cd backend
npm run dev
# Server runs on http://localhost:5000
```

**Terminal 2 - Frontend Server:**
```bash
cd frontend
npm run dev
# Application runs on http://localhost:5173
```

### **Production Mode**

**Build Frontend:**
```bash
cd frontend
npm run build
# Creates optimized build in dist/ folder
```

**Run Backend (Production):**
```bash
cd backend
NODE_ENV=production node index.js
```

---

## 📡 API Endpoints

### **Authentication Endpoints**

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|----------------|
| POST | `/api/auth/register` | User registration | No |
| POST | `/api/auth/login` | User login | No |
| POST | `/api/auth/logout` | User logout | Yes |
| GET | `/api/auth/profile` | Get user profile | Yes |
| POST | `/api/auth/refresh-token` | Refresh JWT token | Yes |

### **Student Endpoints**

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|----------------|
| GET | `/api/student/list` | Get all students | Yes |
| GET | `/api/student/:id` | Get student by ID | Yes |
| POST | `/api/student/register` | Register new student | Yes |
| PUT | `/api/student/:id` | Update student info | Yes |
| DELETE | `/api/student/:id` | Delete student | Yes |
| GET | `/api/student/block/:blockId` | Get students by block | Yes |

### **Room Endpoints**

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|----------------|
| GET | `/api/room/list` | Get all rooms | Yes |
| GET | `/api/room/available` | Get available rooms | Yes |
| GET | `/api/room/:id` | Get room details | Yes |
| POST | `/api/room/create` | Create new room | Yes |
| POST | `/api/room/allocate` | Allocate student to room | Yes |
| PUT | `/api/room/:id` | Update room details | Yes |
| DELETE | `/api/room/:id` | Delete room | Yes |

### **Fee Endpoints**

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|----------------|
| GET | `/api/fee/list` | Get all fee records | Yes |
| GET | `/api/fee/:studentId` | Get student fees | Yes |
| POST | `/api/fee/record` | Record payment | Yes |
| PUT | `/api/fee/:feeId` | Update fee record | Yes |
| GET | `/api/fee/report/monthly` | Monthly fee report | Yes |

### **Block Endpoints**

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|----------------|
| GET | `/api/block/list` | Get all blocks | Yes |
| GET | `/api/block/:id` | Get block details | Yes |
| POST | `/api/block/create` | Create new block | Yes |
| PUT | `/api/block/:id` | Update block | Yes |
| DELETE | `/api/block/:id` | Delete block | Yes |
| GET | `/api/block/:id/statistics` | Block occupancy stats | Yes |

---

## 🏗️ Architecture

### **System Architecture Overview**

```
┌─────────────────────────────────────────────────────────┐
│                    CLIENT LAYER                         │
│  ┌──────────────────────────────────────────────────┐  │
│  │  React Frontend (Vite)                           │  │
│  │  ├─ Pages (Login, Dashboard, Forms)              │  │
│  │  ├─ Components (Reusable UI)                     │  │
│  │  ├─ Context (State Management)                  │  │
│  │  └─ API Services (Axios)                        │  │
│  └──────────────────────────────────────────────────┘  │
└────────────────────┬─────────────────────────────────────┘
                     │
                     │ HTTPS/REST API
                     │
┌────────────────────▼─────────────────────────────────────┐
│                 NETWORK LAYER                            │
│  (CORS, SSL/TLS, Request Validation)                    │
└────────────────────┬─────────────────────────────────────┘
                     │
┌────────────────────▼─────────────────────────────────────┐
│                SERVER LAYER                              │
│  ┌──────────────────────────────────────────────────┐  │
│  │  Express.js Application (Node.js)                │  │
│  │                                                   │  │
│  │  ├─ Routes (API Endpoints)                       │  │
│  │  │                                                │  │
│  │  ├─ Middleware                                   │  │
│  │  │  ├─ Authentication (JWT)                      │  │
│  │  │  ├─ Validation                                │  │
│  │  │  ├─ Error Handling                            │  │
│  │  │  └─ CORS                                      │  │
│  │  │                                                │  │
│  │  ├─ Controllers                                  │  │
│  │  │  ├─ Auth Controller                           │  │
│  │  │  ├─ Student Controller                        │  │
│  │  │  ├─ Room Controller                           │  │
│  │  │  ├─ Fee Controller                            │  │
│  │  │  └─ Block Controller                          │  │
│  │  │                                                │  │
│  │  └─ Services (Business Logic)                    │  │
│  └──────────────────────────────────────────────────┘  │
└────────────────────┬─────────────────────────────────────┘
                     │
                     │ MongoDB Wire Protocol
                     │
┌────────────────────▼─────────────────────────────────────┐
│              DATABASE LAYER                              │
│  ┌──────────────────────────────────────────────────┐  │
│  │  MongoDB (NoSQL Database)                        │  │
│  │  ├─ Users Collection                             │  │
│  │  ├─ Students Collection                          │  │
│  │  ├─ Rooms Collection                             │  │
│  │  ├─ Fees Collection                              │  │
│  │  └─ Blocks Collection                            │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

### **Data Flow Diagram**

```
┌──────────────┐
│  User Input  │
└──────┬───────┘
       │
       ▼
┌──────────────────────────────┐
│  React Component             │
│  (Form / Button Click)       │
└──────┬───────────────────────┘
       │
       ▼
┌──────────────────────────────┐
│  API Service (Axios)         │
│  - Build Request             │
│  - Add Authorization Header  │
└──────┬───────────────────────┘
       │
       ▼
┌──────────────────────────────┐
│  HTTP Request to Backend     │
│  (Endpoint + Method + Data)  │
└──────┬───────────────────────┘
       │
       ▼
┌──────────────────────────────┐
│  Express Router              │
│  (Match Route)               │
└──────┬───────────────────────┘
       │
       ▼
┌──────────────────────────────┐
│  Middleware Stack            │
│  - Auth Verification         │
│  - Input Validation          │
│  - Error Catching            │
└──────┬───────────────────────┘
       │
       ▼
┌──────────────────────────────┐
│  Controller Logic            │
│  - Business Rules            │
│  - Data Processing           │
└──────┬───────────────────────┘
       │
       ▼
┌──────────────────────────────┐
│  Mongoose Model              │
│  - Schema Validation         │
│  - Data Transformation       │
└──────┬───────────────────────┘
       │
       ▼
┌──────────────────────────────┐
│  MongoDB Operation           │
│  - Create/Read/Update/Delete │
└──────┬───────────────────────┘
       │
       ▼
┌──────────────────────────────┐
│  Response Formation          │
│  - Status Code               │
│  - JSON Data                 │
└──────┬───────────────────────┘
       │
       ▼
┌──────────────────────────────┐
│  HTTP Response               │
│  (Back to Frontend)          │
└──────┬───────────────────────┘
       │
       ▼
┌──────────────────────────────┐
│  Response Handler (Axios)    │
│  - Check Status              │
│  - Parse JSON                │
└──────┬───────────────────────┘
       │
       ▼
┌──────────────────────────────┐
│  Context Update              │
│  (Update Global State)       │
└──────┬───────────────────────┘
       │
       ▼
┌──────────────────────────────┐
│  Component Re-render         │
│  (Display Updated Data)      │
└──────────────────────────────┘
```

### **Security Architecture**

```
┌─────────────────────────────────────────────┐
│       Security Layers                       │
├─────────────────────────────────────────────┤
│                                             │
│  1. HTTPS/TLS Encryption                   │
│     ├─ Encrypted data transmission         │
│     └─ Certificate validation              │
│                                             │
│  2. Authentication (JWT)                   │
│     ├─ Token generation on login           │
│     ├─ Token validation on requests        │
│     └─ Token expiration handling           │
│                                             │
│  3. Password Security                      │
│     ├─ bcrypt hashing                      │
│     ├─ Salt rounds: 10                     │
│     └─ Never store plain passwords         │
│                                             │
│  4. Authorization (Role-Based)             │
│     ├─ Admin access control                │
│     ├─ Warden access control               │
│     └─ Student access control              │
│                                             │
│  5. Input Validation                       │
│     ├─ Schema validation (Mongoose)        │
│     ├─ Type checking                       │
│     └─ SQL injection prevention            │
│                                             │
│  6. CORS Protection                        │
│     ├─ Whitelist allowed origins           │
│     └─ Preflight request handling          │
│                                             │
│  7. Error Handling                         │
│     ├─ No sensitive info in errors         │
│     ├─ Logging for debugging               │
│     └─ Generic error messages              │
│                                             │
└─────────────────────────────────────────────┘
```

---

## 🔒 Security Best Practices

1. **Environment Variables**: Store sensitive data in `.env` files
2. **JWT Tokens**: Implement expiration and refresh token rotation
3. **Password Hashing**: Use bcrypt for password storage
4. **CORS**: Configure allowed origins
5. **Input Validation**: Validate all incoming data
6. **Error Handling**: Avoid exposing sensitive error information
7. **HTTPS**: Always use HTTPS in production
8. **Database**: Use MongoDB connection string with authentication

---

## 📊 Database Schema Overview

### **User Schema**
```javascript
{
  _id: ObjectId,
  email: String (unique),
  password: String (hashed),
  role: Enum ['admin', 'warden', 'student'],
  fullName: String,
  phone: String,
  createdAt: Date,
  updatedAt: Date
}
```

### **Student Schema**
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  enrollmentNumber: String (unique),
  enrollmentDate: Date,
  block: ObjectId (ref: Block),
  room: ObjectId (ref: Room),
  feesPaid: Number,
  feesBalance: Number,
  status: Enum ['active', 'inactive', 'graduated'],
  createdAt: Date,
  updatedAt: Date
}
```

### **Room Schema**
```javascript
{
  _id: ObjectId,
  roomNumber: String,
  block: ObjectId (ref: Block),
  capacity: Number,
  occupants: [ObjectId] (ref: Student),
  status: Enum ['available', 'full', 'maintenance'],
  features: [String],
  createdAt: Date,
  updatedAt: Date
}
```

### **Fee Schema**
```javascript
{
  _id: ObjectId,
  student: ObjectId (ref: Student),
  amount: Number,
  dueDate: Date,
  paymentDate: Date,
  status: Enum ['paid', 'pending', 'overdue'],
  month: String,
  year: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### **Block Schema**
```javascript
{
  _id: ObjectId,
  blockName: String,
  warden: ObjectId (ref: User),
  totalRooms: Number,
  occupiedRooms: Number,
  capacity: Number,
  facilities: [String],
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🛠️ Troubleshooting

### **Common Issues**

**1. MongoDB Connection Error**
```
Solution:
- Check if MongoDB is running
- Verify DATABASE_URL in .env
- Ensure network access (if using Atlas)
```

**2. JWT Token Expired**
```
Solution:
- Implement refresh token endpoint
- Clear localStorage and login again
- Check JWT_EXPIRY in .env
```

**3. CORS Error**
```
Solution:
- Verify CORS_ORIGIN in backend .env
- Check frontend API URL configuration
- Ensure requests use correct origin
```

**4. Port Already in Use**
```
Solution:
# Find process using port
lsof -i :5000

# Kill process
kill -9 <PID>
```

---

## 📝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the ISC License - see the LICENSE file for details.

---

## 👨‍💻 Developer Information

**Repository**: [controlcoder/Hostel-Management-System](https://github.com/controlcoder/Hostel-Management-System)

**Created**: April 2, 2026

---

## 📞 Support

For issues or questions, please open an issue on the [GitHub repository](https://github.com/controlcoder/Hostel-Management-System/issues).

---

## 🎯 Future Enhancements

- [ ] SMS/Email notifications for fee reminders
- [ ] Mobile app for students
- [ ] Advanced reporting and analytics
- [ ] Integration with payment gateways
- [ ] Multi-language support
- [ ] Real-time notifications using WebSockets
- [ ] Hostel maintenance request system
- [ ] Visitor management system
- [ ] Leave management for students
- [ ] Automated fee calculation and reminders

---

**Last Updated**: June 5, 2026

# AI-Powered Expense Tracker

## Overview

AI-Powered Expense Tracker is a full-stack web application that helps users manage their daily expenses efficiently. The application allows users to track expenses, upload receipt images, view spending summaries, and receive AI-powered insights and expense categorization.

The project demonstrates full-stack development, REST API design, authentication, database management, AI integration, and end-to-end test automation.

---

# Features

## Authentication

* User Registration
* User Login
* JWT-based Authentication
* Protected Routes
* User Logout

## Expense Management

* Add Expense
* Edit Expense
* Delete Expense
* View Expense History
* Search Expenses
* Filter by Category
* Monthly Expense Summary

## Receipt Management

* Upload Expense Receipts
* Store Images Using Cloud Storage
* View Uploaded Receipts

## AI Features

### AI Expense Categorization

Automatically categorizes expenses such as:

* Food
* Travel
* Shopping
* Entertainment
* Utilities
* Healthcare

### Receipt Analysis

Upload a receipt image and extract:

* Merchant Name
* Amount
* Date
* Category

### Spending Insights

Generate insights such as:

* Monthly spending trends
* Top spending categories
* Budget recommendations
* Expense growth analysis

---

# Tech Stack

## Frontend

* React
* Tailwind CSS
* React Router DOM
* Axios

## Backend

* Node.js
* Express.js
* JWT Authentication
* Multer

## Database

* MongoDB Atlas
* Mongoose

## AI

* Google Gemini API

## Testing

* Selenium WebDriver
* Java
* TestNG
* Maven
* Page Object Model (POM)
* Extent Reports

---

# Project Architecture

```text
Frontend (React + Tailwind)
            |
            v
REST APIs (Express.js)
            |
            v
MongoDB Atlas
            |
            v
Gemini AI Services
```

---

# API Endpoints

## Authentication

### Register User

```http
POST /api/auth/register
```

### Login User

```http
POST /api/auth/login
```

### Get User Profile

```http
GET /api/auth/profile
```

---

## Expense Management

### Get All Expenses

```http
GET /api/expenses
```

### Add Expense

```http
POST /api/expenses
```

### Update Expense

```http
PUT /api/expenses/:id
```

### Delete Expense

```http
DELETE /api/expenses/:id
```

---

## AI Features

### Categorize Expense

```http
POST /api/ai/categorize
```

### Receipt Analysis

```http
POST /api/ai/receipt-analysis
```

### Spending Insights

```http
POST /api/ai/insights
```

---

# Database Schema

## User

```javascript
{
  name: String,
  email: String,
  password: String,
  createdAt: Date
}
```

## Expense

```javascript
{
  title: String,
  amount: Number,
  category: String,
  receiptUrl: String,
  description: String,
  userId: ObjectId,
  createdAt: Date
}
```

---

# Selenium Automation Coverage

The automation framework validates critical user workflows.

### Automated Test Scenarios

* User Registration
* User Login
* Add Expense
* Edit Expense
* Delete Expense
* Search Expense
* Upload Receipt
* Logout

### Framework Design

```text
src/test/java
|
|-- pages
|    |-- LoginPage.java
|    |-- DashboardPage.java
|    |-- ExpensePage.java
|
|-- tests
|    |-- LoginTest.java
|    |-- ExpenseTest.java
|
|-- utils
|    |-- DriverFactory.java
|    |-- WaitUtils.java
|    |-- ScreenshotUtils.java
```

---

# Installation

## Clone Repository

```bash
git clone <repository-url>
```

## Frontend Setup

```bash
cd client
npm install
npm run dev
```

## Backend Setup

```bash
cd server
npm install
npm run dev
```

## Environment Variables

Create a `.env` file.

```env
PORT=5000

MONGODB_URI=your_mongodb_connection

JWT_SECRET=your_secret_key

GEMINI_API_KEY=your_gemini_api_key

CLOUDINARY_CLOUD_NAME=your_cloud_name

CLOUDINARY_API_KEY=your_api_key

CLOUDINARY_API_SECRET=your_api_secret
```

---

# Future Enhancements

* Budget Management
* Email Notifications
* Multi-Currency Support
* Export Reports to PDF
* Recurring Expenses
* Dark Mode
* Mobile Responsive Dashboard
* AI Chat Assistant for Financial Queries

---

# Learning Outcomes

Through this project, I gained hands-on experience with:

* Full Stack Web Development
* REST API Design
* JWT Authentication
* MongoDB Database Design
* AI Integration using Gemini
* File Upload Handling
* Selenium Automation Testing
* Page Object Model Framework
* TestNG and Maven
* Git and GitHub Workflow

---

# Author

**Bhargavsq**

GitHub: https://github.com/Bhargavsq

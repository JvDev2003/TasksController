# TasksController

Application for controlling day-to-day tasks

## Table of Contents

- [Description](#description)
- [Getting Started](#getting-started)
- [Installation](#installation)

---

## Description

This is a task management application built using the MERN stack and TypeScript, designed to handle CRUD operations for tasks with robust backend functionality and a scalable, type-safe architecture.

Feel free to fork or clone this repository to start your own project.

---

## Getting Started

### Prerequisites

Before you begin, ensure that you have the following installed on your machine:

- [Node.js](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/) (Node Package Manager) – usually comes with Node.js
- [MongoDB](https://www.mongodb.com)

---

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/JvDev2003/TasksController
   cd TasksController
   ```

2. Install packeges in backend, fill the .env and run:

   ```bash
    cd backend
    npm install
   ```

   Fill in these variables in the .env file.

   ```bash
   ENV=env
   PORT={the port you want your aplication run}
   DBURI={URL of your mongodb database}
   ```

   Run the backend

   ```bash
   npm run dev
   ```

3. Install packeges in frontend, fill the .env and run:

   ```bash
    cd frontend
    npm install
   ```

   Fill in these variables in the frontend's .env file.

   ```bash
   VITE_URL={the url of your api}{Example: http://localhost:3000}
   ```

   Run the fronend

   ```bash
   npm run dev
   ```

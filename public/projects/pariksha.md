---
title: "Pariksha"
date: "2025-04-05"
description: "Pariksha is an online examination system designed to facilitate the creation, management, and evaluation of tests with ease."
tags: ["HTML", "CSS", "JAVASCRIPT", "PHP", "MYSQL", "WEB"]
source: "https://github.com/Hritikraj8804/Pariksha"
status: "COMPLETED"
---

# Pariksha

**Pariksha** is a web-based online examination system that enables educators to create and manage tests, and students to take exams in a structured environment. The platform simplifies the entire assessment process, from question setup to result evaluation.

## Key Features

- **Exam Creation**  
  Educators can create tests with multiple questions and defined time limits.

- **User Management**  
  Students and instructors can register, log in, and access personalized dashboards.

- **Real-Time Evaluation**  
  Automated scoring and result display after test submission.

- **Responsive Interface**  
  Intuitive web UI for both desktop and mobile users.

- **Secure Database**  
  Manages user data, test content, and results securely using MySQL.

## Project Architecture

1. **Frontend**  
   - Built using HTML, CSS, and JavaScript for interactive pages.
   - Provides exam navigation, timers, and user dashboards.

2. **Backend**  
   - PHP handles server-side logic, form processing, and session control.
   - Interfaces with the database for storing results and user actions.

3. **Database**  
   - MySQL stores user info, exams, questions, answers, and scores.

## Getting Started

### Prerequisites

- **Web Server** (XAMPP / WAMP / LAMP)
- **PHP** (version >= 7.0)
- **MySQL**
- **Browser** (to access the system UI)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Hritikraj8804/Pariksha.git
   cd Pariksha
    ```

2. Move the project folder to your server’s document root:

   * XAMPP: `htdocs/`
   * WAMP: `www/`
   * LAMP: `/var/www/html/`

3. Import the database:

   * Open **phpMyAdmin**
   * Create a database (e.g., `pariksha_db`)
   * Import the provided SQL file.

4. Update database configuration in PHP files as needed.

5. Start your web server and navigate to:

   ```
   http://localhost/Pariksha
   ```

### Usage

1. Register as a student or instructor.
2. Log in to your dashboard.
3. Create or take an exam.
4. Submit and view results instantly.

## Tech Stack

| Technology  | Purpose                 |
| ----------- | ----------------------- |
| HTML/CSS/JS | Frontend UI             |
| PHP         | Backend logic           |
| MySQL       | Database management     |
| Web Server  | Local hosting & testing |

## Contributing

Contributions to **Pariksha** are welcome! To contribute:

1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Push to your branch.
5. Open a pull request.

---

**Pariksha** makes online testing simple and efficient ideal for academic assessments! 🎓🚀

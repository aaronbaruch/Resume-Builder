# Full-Stack Resume Web Application

This project is a full-stack web application that serves as an interactive online resume platform. Users can add and display information about their education, skills, projects, and work experience. The frontend is built with React, while the backend relies on Django REST Framework for API management.

## Features

- Add and view educational background.
- List skills categorized by type with the ability to add new ones dynamically.
- Showcase projects with descriptions and technologies used.
- Record professional experiences with dates and detailed descriptions.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js and npm
- Python 3 and pip
- Virtualenv (optional for Python environment management)

### Installing

#### Frontend

```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Start the React development server
npm start

```

#### Backend

```bash
# Navigate to the backend directory
cd backend

# (Optional) Create a virtual environment
virtualenv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`

# Install dependencies
pip install -r requirements.txt

# Run database migrations
python manage.py makemigrations
python manage.py migrate

# Start the Django development server
python manage.py runserver

```

## Built with

- React - The web framework used for the frontend
- Django REST Framework - The framework used for the backend API

## Author

Aaron Baruch

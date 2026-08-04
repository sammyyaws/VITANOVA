This guide provides instructions for developers working on VitaNova.

The system consists of:

- Frontend: Next.js application
- Backend: Django REST Framework API
- Database: Relational database managed through Django ORM

---

# Requirements

## Frontend

- Node.js
- npm

## Backend

- Python 3.x
- Django
- Django REST Framework

## Additional Tools

- Git
- Docker (optional)

---

# Project Structure


VITANOVA/

├── frontend/
│   ├── app/
│   ├── components/
│   ├── public/
│   └── package.json

├── backend/
│   ├── apps/
│   ├── manage.py
│   ├── requirements.txt
│   └── Dockerfile

└── docs/


---

# Backend Setup

1. Navigate into the backend directory.

2. Create a virtual environment.

3. Install dependencies:


pip install -r requirements.txt


4. Apply migrations:


python manage.py migrate


5. Run the development server:


python manage.py runserver


---

# Frontend Setup

1. Navigate into the frontend directory.

2. Install dependencies:


npm install


3. Start the development server:


npm run dev


---

# Development Workflow

1. Create a new feature branch.
2. Implement changes.
3. Test functionality.
4. Commit changes with descriptive messages.
5. Submit changes for review.

---

# Code Guidelines

- Keep components modular.
- Follow Django and React conventions.
- Write reusable functions.
- Maintain clear naming conventions.
- Document complex logic.

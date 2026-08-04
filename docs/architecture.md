System Architecture

VitaNova follows a three-tier architecture consisting of the presentation layer, application layer, and database layer.


+----------------------+
|      Frontend        |
| Next.js + TypeScript |
+----------+-----------+
           |
      REST API (HTTPS)
           |
+----------v-----------+
|       Backend        |
| Django REST Framework|
+----------+-----------+
           |
           |
+----------v-----------+
|      Database        |
| SQLite3 / PostgreSQL  |
+----------------------+


## Components

### Frontend
- User interface
- Form validation
- API requests
- Dashboard

### Backend
- Business logic
- Authentication
- API endpoints
- Database operations

### Database
- Stores user information
- Blood inventory
- Blood requests
- Notifications
- Organizations

Authentication

JWT tokens are used to authenticate users and secure API endpoints.

# Database

VitaNova uses a relational database to store and manage information related to users, organizations, blood donations, blood requests, inventory, appointments, and notifications.

---

# Database Management System

The system uses:

- SQLite for development
- PostgreSQL for production

The database is managed through Django ORM to simplify data access and maintain data integrity.

---

# Core Database Tables

The database consists of the following main tables:

- Role
- Location
- Organisation
- App User
- Verification
- Admin
- Donor Profile
- Patient
- Organisation Staff
- Patient Blood Request
- Inventory
- Donor Match
- Appointment
- Blood Donation
- Blood Issue
- Notification

---

# User Management

The database stores user information including:

- User accounts
- User roles
- Authentication details
- Email verification
- Account status

Each user is assigned a specific role within the system.

---

# Organisation Management

Organisation records store information about:

- Hospitals
- Blood Banks

Each organisation includes:

- Organisation details
- Contact information
- Registration details
- Location
- Account status

---

# Donor Management

The donor profile stores:

- Blood group
- Date of birth
- Gender
- Last donation date
- Availability status
- Location

Each donor profile is linked to a registered user.

---

# Patient Management

Patient records include:

- Blood group
- Date of birth
- Gender
- Emergency contact
- Medical notes
- Location

Each patient record is linked to a registered user.

---

# Blood Request Management

Patient blood requests contain:

- Patient information
- Organisation
- Blood group
- Quantity requested
- Urgency level
- Required date
- Request status
- Notes

Blood requests are submitted by patients and managed by organisations.

---

# Blood Inventory

The inventory table stores:

- Organisation
- Blood batch number
- Blood group
- Available quantity
- Unit volume
- Donation date
- Expiry date
- Inventory status

Inventory records are maintained by hospitals and blood banks.

---

# Blood Donation Management

Donation records include:

- Donor
- Organisation
- Blood group
- Quantity donated
- Donation date
- Expiry date
- Health check status
- Notes

Each donation is associated with a donor and an organisation.

---

# Blood Issue Management

Blood issue records store:

- Blood request
- Organisation
- Inventory item
- Quantity issued
- Staff member
- Issue date
- Notes

These records track blood issued to patients.

---

# Appointment Management

Appointments include:

- Patient request
- Donor
- Organisation
- Appointment date
- Status
- Notes

Appointments are created after successful donor matching.

---

# Donor Matching

The donor match table stores:

- Patient request
- Donor
- Match status
- Match score
- Creation date

The system uses these records to identify suitable donors.

---

# Notifications

The notification table stores:

- User
- Notification title
- Message
- Notification type
- Status
- Creation date

Notifications are sent to users throughout the donation process.

---

# Database Relationships

The database maintains relationships between:

- Users and Roles
- Users and Organisations
- Users and Verification Records
- Users and Donor Profiles
- Users and Patient Profiles
- Users and Organisation Staff
- Patients and Blood Requests
- Organisations and Inventory
- Donors and Blood Donations
- Blood Requests and Donor Matches
- Blood Requests and Appointments
- Inventory and Blood Issues
- Users and Notifications

These relationships ensure data consistency and support efficient management of blood donation activities.

---

# Future Database Improvements

Possible improvements include:

- Database indexing for faster queries
- Database replication
- Automated database backups
- Data archiving
- Performance optimization

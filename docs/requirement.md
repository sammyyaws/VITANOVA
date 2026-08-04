1. Introduction

1.1 Purpose

This document defines the software requirements for VitaNova, a centralized blood donation and coordination platform.

The system is designed to improve communication between blood donors, patients, hospitals, and blood banks by providing a digital platform for managing blood requests, donations, and inventory.

⸻

1.2 Scope

VitaNova provides a platform where users can:

* Register and manage accounts.
* Create donor, patient, and organisation profiles.
* Submit and manage blood requests.
* Coordinate blood donations.
* Manage blood inventory.
* Receive notifications and updates.

The system supports multiple user roles with different permissions and functionalities.

⸻

2. Stakeholders

Donors

Individuals willing to donate blood.

Responsibilities:

* Maintain donor profile.
* Provide blood information.
* Respond to donation requests.
* Track donation history.

⸻

Patients

Individuals requiring blood support.

Responsibilities:

* Submit blood requests.
* Provide medical requirements.
* Track request status.

⸻

Hospitals

Healthcare organisations requesting and managing blood supplies.

Responsibilities:

* Submit blood requests.
* Manage blood issues.
* Coordinate with donors and blood banks.

⸻

Blood Banks

Organisations responsible for storing and managing blood supplies.

Responsibilities:

* Maintain inventory records.
* Update available blood units.
* Process blood allocation.

⸻

Administrators

System managers responsible for maintaining platform operations.

Responsibilities:

* Manage users.
* Monitor system activities.
* Ensure proper system operation.

⸻

3. Functional Requirements

Authentication and User Management

The system shall:

* Allow users to create accounts.
* Allow registered users to log in.
* Authenticate users securely.
* Support different user roles.
* Allow users to manage their profiles.

⸻

Donor Management

The system shall:

* Allow users to create donor profiles.
* Store donor information including blood group and location.
* Allow donors to update availability status.
* Maintain donation records.

⸻

Patient Management

The system shall:

* Allow patients to create profiles.
* Allow patients to submit blood requests.
* Allow patients to monitor request progress.

⸻

Organisation Management

The system shall:

* Support hospital and blood bank registration.
* Allow organisations to manage their information.
* Allow organisations to coordinate blood-related activities.

⸻

Blood Request Management

The system shall:

* Allow patients and organisations to create blood requests.
* Store blood request information.
* Track request status.
* Support donor matching and blood allocation.

⸻

Blood Donation Management

The system shall:

* Record blood donations.
* Associate donations with donors and organisations.
* Maintain donation history.

⸻

Inventory Management

The system shall:

* Store available blood units.
* Allow organisations to update inventory.
* Track blood reservations.
* Maintain blood availability records.

⸻

Notification System

The system shall:

* Generate notifications for users.
* Provide updates on requests and donations.
* Inform users about important system activities.

⸻

Verification System

The system shall:

* Support user verification.
* Maintain verification records.
* Improve trust between platform users.

⸻

4. Non-Functional Requirements

Security

The system shall:

* Protect user information.
* Authenticate users before accessing protected resources.
* Restrict access based on user roles.
* Secure stored passwords.

⸻

Performance

The system shall:

* Provide reasonable response times.
* Support multiple users accessing the platform.
* Efficiently process requests and database operations.

⸻

Usability

The system shall:

* Provide an intuitive interface.
* Support easy navigation.
* Provide clear feedback to users.

⸻

Reliability

The system shall:

* Maintain accurate records.
* Handle errors appropriately.
* Prevent loss of important data.

⸻

Maintainability

The system shall:

* Use modular architecture.
* Follow coding standards.
* Allow future improvements and feature additions.

⸻

5. System Constraints

The system is developed using:

Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS

Backend

* Django
* Django REST Framework

Database

* Relational database managed through Django ORM

⸻

6. Future Enhancements

Possible improvements include:

* Mobile application support.
* Real-time notifications.
* Advanced donor matching algorithms.
* Integration with healthcare systems.
* Analytics dashboards.

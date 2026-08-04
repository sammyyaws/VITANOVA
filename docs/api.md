API Documentation

Overview

The VitaNova API is built using Django REST Framework (DRF). It provides backend services for the VitaNova blood donation and coordination platform.

The API handles:

* User authentication
* Donor management
* Organisation management
* Blood requests
* Blood donations
* Blood inventory
* Hospital dashboards
* Email verification
* Password recovery

⸻

Base URL

All API endpoints are accessed through:

/api/

Example:

/api/login/

⸻

Authentication API

Register User

POST /api/register/

Creates a new user account.

Purpose

Allows new users to register on the platform.

Supported users include:

* Donors
* Patients
* Organisations

⸻

Login

POST /api/login/

Authenticates users.

Response

Returns authentication tokens that allow access to protected resources.

⸻

Refresh Token

POST /api/token/refresh/

Generates a new access token using a refresh token.

⸻

Donor API

Create Donor Profile

POST /api/profile/donor/

Creates a donor profile after user registration.

Information Managed

* Blood group
* Donor details
* Availability information
* Location information

⸻

View Current Donor Profile

GET /api/profile/donor/me/

Retrieves the authenticated donor’s profile.

⸻

Email Verification API

Verify Email

GET /api/auth/verify-email/<user_id>/<token>/

Verifies a user’s email address using the provided verification token.

⸻

Organisation API

Create Organisation

POST /api/organizations/create/

Creates a hospital or blood bank organisation profile.

Organisation Information

Includes:

* Organisation name
* Organisation type
* Contact information
* Location details

⸻

Password Reset API

Request Password Reset

POST /api/password-reset/

Sends a password reset request.

⸻

Confirm Password Reset

POST /api/password-reset-confirm/

Confirms password change after reset verification.

⸻

Hospital Dashboard API

Hospital Dashboard

GET /api/hospital/dashboard/

Provides hospital-related information and statistics.

Dashboard information may include:

* Blood requests
* Inventory information
* Donation information

⸻

Blood Donation API

Donations

GET/POST /api/donations/

Manages blood donation records.

Functions:

* Record donations
* Retrieve donation information
* Track donor contributions

⸻

Blood Request API

List and Create Blood Requests

GET/POST /api/requests/

Retrieves existing blood requests or creates new requests.

⸻

Reserve Blood Request

POST /api/requests/<id>/reserve/

Reserves a blood request.

Used when available blood is allocated to a request.

⸻

Issue Blood Request

POST /api/requests/<id>/issue/

Processes the issuing of blood for a request.

⸻

Inventory API

View Inventory

GET /api/inventory/

Retrieves available blood inventory.

Information includes:

* Blood type
* Available quantity
* Inventory records

⸻

Inventory Details

GET /api/inventory/<id>/

Retrieves details of a specific inventory item.

⸻

Inventory Transactions

GET /api/inventory/transactions/

Retrieves inventory transaction records.

Used for tracking blood movement.

⸻

Authentication and Security

The API uses:

* JWT authentication
* Protected endpoints
* Role-based access control
* Data validation

Protected endpoints require authentication tokens.

Example:

Authorization: Bearer <access_token>

⸻

API Error Responses

400 Bad Request

Returned when submitted data is invalid.

401 Unauthorized

Returned when authentication credentials are missing or invalid.

403 Forbidden

Returned when a user does not have permission.

404 Not Found

Returned when the requested resource does not exist.

⸻

Future Improvements

Possible improvements include:

* OpenAPI/Swagger API documentation
* Additional endpoint coverage
* More detailed response examples
* API monitoring and logging

VITANOVA 
> **Centralized Web-Based Blood Donation & Coordination Platform**

VITANOVA is a centralized web platform designed to streamline and coordinate blood donation management. It bridges the gap between donors, blood banks, hospitals, and patients in need by facilitating real-time blood request tracking, inventory coordination, and donor engagement.

---

  Key Features

- **Donor Management & Scheduling:** Easy registration, eligibility checks, and appointment scheduling for donors.
- **Real-Time Blood Requests & Matching:** Urgent request broadcasts with location-aware donor matching.
- **Hospital & Blood Bank Inventory:** Track blood unit availability, expiration dates, and rare blood group inventory.
- **Analytics & High-Volume Event Logging:** Track system activities, user notifications, and donor interaction history.
- **Responsive Dashboard:** Modern, intuitive user interfaces built for mobile and desktop screens. 

---

  Tech Stack & System Thinking

 **Product and System Design:**
[Miro]: Used for workflow mapping,UI wireframing and system thinking.
  **Frontend**
- **Framework:** [React](https://reactjs.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** Stitch UI Components

 **Backend & APIs**
- **Framework:** [Django](https://www.djangoproject.com/) / Django REST Framework
- **Authentication:** JWT (JSON Web Tokens)

 **Databases**
- **Relational DB (PostgreSQL):** Core transactional data (user accounts, appointments, blood inventory records, hospital profiles).
- **NoSQL DB (MongoDB):** Flexible, high-write data (audit logs, chat/notifications, real-time activity streams).

 **Version Control & Repository**
- **Monorepo Structure** hosted on GitHub. 
 |**Hardware Dependencies**|None|Purely web-based platform for maximum accessibility across devices.|


# 🎯 AtomQuest Hackathon 1.0 - Goal Tracking Portal

A full-stack, enterprise-grade Goal Tracking and Performance Management System built using React.js, Node.js, Express.js, Prisma ORM, and PostgreSQL.

This project was built to solve the fragmentation of manual goal tracking by offering an intuitive, reliable, and audit-ready digital portal. It supports the full lifecycle of employee goals—from creation and alignment to quarterly check-ins and performance visibility.

---

## 🌟 Key Hackathon Features Implemented

### 1. Goal Creation & Alignment (Phase 1)
- **Role-Based Workflows:** Employees define objectives (Thrust Area, Title, Description, Targets, Weightage).
- **Validation Engine:** Enforces business logic (Total weightage = 100%, Min weightage = 10%, Max goals = 8).
- **Shared Departmental KPIs (Bonus):** Admins/Managers can push top-down KPIs to multiple employees. Employees can only adjust the weightage of these shared goals, ensuring organizational alignment.
- **Locking Mechanism:** Goals are strictly locked post-approval to maintain data integrity.

### 2. Achievement Tracking & Check-ins (Phase 2)
- **Quarterly Check-ins:** Intuitive interface for employees to log Actual Achievements against Planned Targets.
- **Smart Progress Algorithms:** Dynamic calculation formulas based on UOM types:
  - **Min (Higher is better):** E.g., Revenue, Sales. (Achievement ÷ Target)
  - **Max (Lower is better):** E.g., Turnaround Time. (Target ÷ Achievement)
  - **Timeline:** Date-based completion tracking.
  - **Zero-Based:** Success is evaluated on exactly zero incidents (e.g., Safety).
- **Manager Moderation:** Managers can review progress, approve check-ins, and provide structured feedback.

### 3. Advanced Modules & "Wow" Factors
- **Dynamic Analytics Dashboard (Bonus):** A visually stunning, real-time Recharts dashboard featuring Quarter-on-Quarter (QoQ) trends, Goal Distribution by Thrust Area, and Manager Effectiveness comparisons. Role-based visibility ensures Admins see organizational stats, Managers see team stats, and Employees see personal stats.
- **Rule-Based Escalation Engine (Bonus):** A backend cron-job system that monitors pending actions (e.g., goals pending approval > 7 days, missed check-ins) and automatically triggers and logs escalations for Admin/HR review.
- **Audit Trails:** Immutable logging of all state changes, capturing who changed what and when.

---

# 🧰 Tech Stack & Architecture

## Frontend (Client)
- **Framework:** React.js + Vite
- **Routing:** React Router DOM v7
- **Styling:** Tailwind CSS (Premium Light SaaS Aesthetic)
- **Data Visualization:** Recharts
- **HTTP Client:** Axios

## Backend (Server)
- **Runtime:** Node.js + Express.js
- **Database ORM:** Prisma
- **Database:** PostgreSQL
- **Authentication:** JWT (JSON Web Tokens) & bcryptjs
- **Task Scheduling:** node-cron (for Escalation Engine)
- **Exporting:** json2csv

---

# 🚀 Local Development Setup

## 1. Clone Repository
```bash
git clone https://github.com/anushaanchalia/goal-tracking-portal.git
cd goal-tracking-portal
```

## 2. Server Setup (Backend)
```bash
cd server
npm install

# Create a .env file based on .env.example
# Ensure you have a running PostgreSQL database
echo 'DATABASE_URL="postgresql://user:pass@localhost:5432/goalportal"' > .env
echo 'PORT=5000' >> .env
echo 'JWT_SECRET="super_secret_key"' >> .env

# Push Prisma Schema and Generate Client
npx prisma db push
npx prisma generate

# Start the development server
npm run dev
```

## 3. Client Setup (Frontend)
```bash
cd client
npm install

# Point the client to your local backend
echo 'VITE_API_URL="http://localhost:5000"' > .env

# Start the Vite development server
npm run dev
```

---

# 🎨 UI/UX Design Philosophy
- **Clean SaaS Aesthetic:** The portal uses a unified "White and Blue" brand identity, utilizing soft slate backgrounds (`#f8fafc`), clean white cards with faint borders, and deep indigo (`#5263f9`) primary actions.
- **Micro-Interactions:** Subtle hover states, shadow elevations, and scale transforms make the application feel responsive, dynamic, and professional.
- **Readability Focused:** Typography is spaced and sized meticulously (utilizing `text-sm` and `text-base` prominently) to reduce eye strain for corporate users.

---

# 👨‍💻 Author

**Anusha Anchalia**  
Full Stack Developer & Hackathon Participant  
Built for AtomQuest Hackathon 1.0

---
*This project is open-source and developed for educational and hackathon purposes.*

# 🎓 Online-ExamHub

> **A Modern, Intelligent, and Secure Web-Based Online Examination & Proctoring Platform**

Online-ExamHub is an enterprise-ready online examination platform engineered to streamline exam creation, live proctoring, automated evaluation, and performance analytics. It replaces traditional paper-based assessment workflows with an AI-augmented, secure digital ecosystem tailored for educational institutions, instructors, and students.

---

## 🌟 Key Platform Features

### 🛡️ Live Anti-Cheat Proctoring & Integrity Monitoring
- **Tab & Application Switch Detection**: Real-time tracking of browser focus and tab changes during active exam sessions.
- **Graduated Penalty System**: 
  - **Warning #1**: Non-intrusive alert logged for initial tab/app switches.
  - **Disqualification (#2)**: Automatic exam termination with score recorded as zero for repeated violations.
- **Instructor Ejection & Last Chance Reinstatement**: Instructors can review proctoring incidents live, stop student exams manually, or grant instant "last chance" reinstatements to resume testing.
- **Navigation Lock**: Prevents browser back-button navigation, tab refresh, or accidental closing while an exam is in progress.

### 🤖 AI Exam Studio & Automated Question Generation
- **Document-to-Exam Pipeline**: Upload lecture slides, PDF textbooks, or DOCX notes to generate multi-choice and true/false question banks automatically.
- **Asynchronous Background Processing**: Cross-page persistent job tracking allows instructors to navigate the application while AI builds exams.
- **Targeted AI Refinement**: Refine existing question sets using plain-language prompts (e.g., *"Make question 2 harder"*, *"Add 3 true/false questions about caching"*).
- **AI Question Library**: Save generated exam drafts into a reusable AI database library.

### 👥 Multi-Tier Role-Based Authorization
- **Student Role**:
  - Secure single-entry exam participation.
  - Interactive submission review with detailed option-by-option breakdowns.
  - Student performance metrics and personal dashboard history.
  - Study room participation.
- **Instructor (Teacher) Role**:
  - Full exam lifecycle management (Manual creation, AI generation, editing, scheduling).
  - Enforced unique exam code verification (preventing accidental overwrites).
  - Live proctoring dashboard with real-time class analytics and student scoreboards.
  - Creation and administration of Study Rooms with file sharing and announcements.
- **Administrator Role**:
  - System-wide hub to manage all user accounts (Students, Instructors, Admins).
  - Platform-wide statistics, global settings management, and system-wide search.
  - Full administrative access to room settings and exam deletion.

### 💬 Interactive Study Rooms & Collaborative Hubs
- **Public & Private Rooms**: Create open or passcode-protected study spaces.
- **Resource Management**: Upload, preview, and download course documents and files up to 50MB.
- **Real-Time Discussion**: Instructor announcements and chat messaging with role badges.

### 📊 Performance Analytics & Visualizations
- **Class Performance Graphs**: Interactive score distributions rendered via Recharts.
- **Student Question Breakdown**: Visual indicators for correct, partial, and incorrect responses.
- **Comprehensive Scoreboards**: Ranked leaderboards based on score accuracy and completion speed.

---

## 🛠️ Technology Stack

| Domain | Technologies |
| :--- | :--- |
| **Frontend** | [Next.js 16 (App Router)](https://nextjs.org), [React 19](https://react.dev), [TypeScript](https://www.typescriptlang.org), [Tailwind CSS](https://tailwindcss.com), [Shadcn UI](https://ui.shadcn.com), [Lucide Icons](https://lucide.dev), [Recharts](https://recharts.org) |
| **Backend** | [Node.js](https://nodejs.org), [Express.js](https://expressjs.com), [Bun](https://bun.sh), [JSON Web Tokens (JWT)](https://jwt.io), [Bcrypt](https://github.com/kelektiv/node.bcrypt.js), [Multer](https://github.com/expressjs/multer) |
| **Database** | [MySQL 8.0+](https://www.mysql.com), Prepared Statements, Connection Pooling (`mysql2/promise`) |
| **Tooling** | Bun / npm, Vitest, Git |

---

## 🔐 User Roles & Permissions Matrix

| Feature / Endpoint | Student | Instructor | Admin |
| :--- | :---: | :---: | :---: |
| Join & Take Exams | ✅ | ✅ | ✅ |
| View Personal Submission Results | ✅ | ✅ | ✅ |
| Join Study Rooms | ✅ | ✅ | ✅ |
| Create & Schedule Exams | ❌ | ✅ | ✅ |
| AI Exam Studio & Document Upload | ❌ | ✅ | ✅ |
| Live Anti-Cheat Proctoring Panel | ❌ | ✅ | ✅ |
| Kick / Stop Student Exam Sessions | ❌ | ✅ | ✅ |
| Manage Study Rooms & Files | ❌ | ✅ | ✅ |
| Admin Dashboard & User Management | ❌ | ❌ | ✅ |
| System Settings Management | ❌ | ❌ | ✅ |

---

## 📁 Repository Structure

```
Online-ExamHub/
├── backend/
│   ├── config/             # Database connection & environment configuration
│   ├── controller/         # Request handlers (Exam, Room, User, Admin, AI)
│   ├── middleware/         # Auth verification (verifyToken) & Role authorization (allowedTo)
│   ├── models/             # Database queries & data models
│   ├── routes/             # Express API routes
│   ├── uploads/            # Temporary file storage (AI & Room resources)
│   ├── utils/              # JWT helpers, role normalization, & error handlers
│   └── app.js              # Express application entry point
│
└── frontend/
    ├── app/                # Next.js App Router pages
    │   ├── admin/          # Admin System Hub page
    │   ├── auth/           # Login, Register, Password Reset pages
    │   ├── dashboard/      # Student & Instructor Analytics Dashboard
    │   ├── exam/           # Exam taking, creation, & AI Studio pages
    │   ├── exams/          # Exam list & Instructor Admin Proctoring page
    │   ├── profile/        # User Profile settings page
    │   └── rooms/          # Study Rooms & messaging pages
    ├── components/         # Reusable UI components & dialogs
    ├── hooks/              # Custom React hooks
    ├── lib/                # API client, state management, & scoring logic
    └── styles/             # Global CSS & Tailwind styling
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v18.0.0 or higher (or **Bun** v1.0.0+)
- **MySQL**: v8.0 or higher

---

### 1. Database Setup
Create a MySQL database (e.g., `online_exam_hub`):

```sql
CREATE DATABASE online_exam_hub CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

---

### 2. Backend Installation & Configuration

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   bun install
   # or
   npm install
   ```
3. Create a `.env` file in the `backend` directory:
   ```env
   PORT=5000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_mysql_password
   DB_NAME=online_exam_hub
   JWT_SECRET_KEY=your_super_secret_jwt_key
   ```
4. Start the backend server:
   ```bash
   bun start
   # or
   npm start
   ```
   The backend API will run on `http://localhost:5000`.

---

### 3. Frontend Installation & Configuration

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   bun install
   # or
   npm install
   ```
3. Create a `.env.local` file in the `frontend` directory:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```
4. Start the Next.js development server:
   ```bash
   bun run dev
   # or
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your web browser.

---

## 🛠️ Verification & Build Commands

To build the frontend production bundle:

```bash
cd frontend
bun run build
```

To verify backend syntax and imports:

```bash
cd backend
node --check app.js
```

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

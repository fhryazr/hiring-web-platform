# 💼 Hiring Management Web App

![React](https://img.shields.io/badge/React-18.2.0-61dafb?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue?logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8?logo=tailwindcss)
![Zustand](https://img.shields.io/badge/State-Zustand-orange)
![TanStack Table](https://img.shields.io/badge/Table-TanStack%20v8-ef4444)
![License](https://img.shields.io/badge/license-MIT-green)
![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?logo=vercel)

A simplified **Hiring Management System** built for the **Rakamin Frontend Engineer Case Study**.  
This web app allows **Recruiters (Admin)** to manage job postings and **Applicants (Job Seekers)** to apply using a **dynamically generated form** that adapts to backend configurations.

---

## 🚀 Project Overview

The **Hiring Management Web App** enables recruiters to create, configure, and manage job vacancies while allowing applicants to apply easily.  
Each job has configurable application fields (mandatory, optional, or hidden), which control the frontend form’s behavior dynamically.

### 🎯 Objectives
- **Admin** can:
  - Create and manage job postings.
  - Configure applicant form fields (mandatory / optional / off).
  - View and manage applicants in a flexible, spreadsheet-like table.
- **Applicant** can:
  - View active job listings.
  - Apply for jobs via dynamically generated forms.
  - Capture a profile photo using hand gesture detection.

---

## 🧭 Application Routes

| Role | Path | Description |
|------|------|-------------|
| **Applicant** | `/career` | Displays the job list and allows job seekers to apply. |
| **Admin** | `/admin` | Displays job management and candidate management dashboard. |

---

## 🧩 Key Features Implemented

### 🏢 Job List Page
- Displays all job vacancies with:
  - Title, Department, Status Badge, and Salary Range.
- Supports keyword searching and filtering.
- Includes a “Create Job” modal to add new jobs.

### 🧾 Create Job Modal / Page
- Dynamic form for job metadata (title, description, department, etc.).
- **Dynamic Form Configuration**:
  - Fields adapt automatically based on backend settings:
    - `required: true` → Mandatory
    - `required: false` → Optional
    - Missing field → Hidden
- Validation updates automatically when backend configuration changes.

### 👥 Candidate Management Page
- Displays all applicants per job in an interactive table built with **TanStack Table v8**.
- Supports:
  - Column resizing.
  - Column reordering (via DnD Kit).
  - Sorting and pagination.
- Includes empty-state handling when no candidates exist.

### 📸 Gesture-Based Photo Capture
- Applicants can capture a profile photo using webcam gesture detection.
- Uses simplified logic to detect hand poses and trigger capture automatically.

---

## Tech Stack Used

| Category | Technology |
|-----------|-------------|
| **Framework** | React (Vite) |
| **Language** | TypeScript |
| **Styling** | TailwindCSS + [shadcn/ui](https://ui.shadcn.com) |
| **State Management** | Zustand |
| **Form Handling** | TanStack Form |
| **Table** | TanStack Table v8 |
| **Drag & Drop** | DnD Kit |
| **Camera & Gesture Detection** | MediaPipe Hands + Custom Pose Logic |
| **Data Source** | Local Mock JSON (simulated backend APIs) |
| **Deployment** | Vercel |

---

## How to Run Locally

```bash
# 1. Clone repository
git clone https://github.com/fachryazaria/hiring-platform.git
cd hiring-platform

# 2. Install dependencies
npm install

# 3. Run development server
npm run dev

# 4. Open in browser
http://localhost:5173

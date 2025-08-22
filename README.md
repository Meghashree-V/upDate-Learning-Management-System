# upDate LMS

An industry-oriented Learning Management System built with React 18, TypeScript, Vite, Tailwind CSS, and shadcn/ui on the frontend, and Express + MongoDB (Mongoose) on the backend.

## Features

- Multi-role: Students, Admins/Educators
- Course browsing, enrollment, player, certificates
- Quizzes (scaffolding present), analytics, reporting
- File uploads (Multer), dashboard pages

## Tech Stack

- Frontend: React 18 + TypeScript + Vite
- UI: shadcn/ui (Radix UI), Tailwind CSS
- Routing: React Router DOM (v6/v7 future flags)
- State: TanStack React Query
- Backend: Express + Mongoose (MongoDB Atlas)

## Monorepo structure

- `src/` — frontend app (Vite)
- `server/` — backend API (Express + Mongoose)

## Getting started

1) Install dependencies (root installs both workspaces if configured):

```bash
npm i
```

2) Create environment files based on examples:

- Frontend: copy `.env.example` to `.env` and fill as needed.
- Backend: copy `server/.env.example` to `server/.env` and set:
  - `MONGODB_URI` — Atlas SRV connection string
  - Other required server variables

3) Run development servers:

```bash
# Frontend (Vite)
npm run dev

# Backend (Express)
npm run server:dev
```

Common scripts (see `package.json`):

- `dev` — start Vite dev server
- `build` — Vite build
- `preview` — preview built frontend
- `server:dev` — start backend with nodemon/ts-node (if configured)
- `lint` — run ESLint

## Centralized course data (frontend)

- All course-related UI must consume data from `src/data/courses.ts`.
- Utilities: `getCourseById`, `getFeaturedCourses`, `getCoursesByCategory`.
- Populate `courses` array to see lists/detail pages render.

## Backend notes

- Ensure your current IP is whitelisted in MongoDB Atlas Network Access.
- Verify `MONGODB_URI` user credentials and access. TLS inspection/firewalls can cause SSL/TLS errors.

## Troubleshooting

- React Router warnings: v7 future flags enabled in `src/App.tsx`.
- MongoDB connection issues: check Atlas IP whitelist and credentials.

---

# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/e629884e-8cfd-4cdd-8d3c-77ede3e407b0

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/e629884e-8cfd-4cdd-8d3c-77ede3e407b0) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/e629884e-8cfd-4cdd-8d3c-77ede3e407b0) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)

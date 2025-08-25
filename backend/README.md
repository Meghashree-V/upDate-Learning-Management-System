# Backend for upDate - Industry Oriented Learning Management System

This is the backend service for the upDate Learning Management System (LMS). It provides APIs for managing courses, categories, enrollments, user activities, KPIs, and revenues. The backend is built with Node.js, Express, and MongoDB.

## Features

- RESTful APIs for managing:
  - Courses
  - Categories
  - Enrollments
  - User Activities
  - KPIs (Key Performance Indicators)
  - Revenues
- MongoDB for data storage.
- Environment variables managed via `.env`.
- Static file serving for the frontend.

## Project Structure

```
backend/
├── .env                  # Environment variables
├── package.json          # Project metadata and dependencies
├── seed.js               # Script to seed the database
├── server.js             # Main server file
├── models/               # Mongoose models
│   ├── Category.js
│   ├── Course.js
│   ├── Enrollment.js
│   ├── Kpi.js
│   ├── Revenue.js
│   └── UserActivity.js
├── routes/               # API routes
│   ├── categoryRoutes.js
│   ├── courseRoutes.js
│   ├── enrollmentRoutes.js
│   ├── kpiRoutes.js
│   ├── revenueRoutes.js
│   └── userActivityRoutes.js
└── README.md             # Documentation
```

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)

## Setup

1. Clone the repository:
   ```sh
   git clone <YOUR_REPOSITORY_URL>
   cd backend
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Create a `.env` file in the `backend` directory and configure the following variables:
   ```
   MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/<database>?retryWrites=true&w=majority
   PORT=5000
   ```

4. Seed the database (optional):
   ```sh
   node seed.js
   ```

5. Start the server:
   ```sh
   npm run dev
   ```

## API Endpoints

### Base URL
```
http://localhost:<PORT>/api
```

### Routes

| Endpoint                | Method | Description                     |
|-------------------------|--------|---------------------------------|
| `/api/courses`          | GET    | Get all courses                 |
| `/api/categories`       | GET    | Get all categories              |
| `/api/user-activity`    | GET    | Get user activity data          |
| `/api/revenue`          | GET    | Get revenue data                |
| `/api/kpis`             | GET    | Get KPI data                    |

## Scripts

- `npm start`: Start the server.
- `npm run dev`: Start the server in development mode with `nodemon`.

## Dependencies

- `express`: Web framework for Node.js.
- `mongoose`: MongoDB object modeling tool.
- `dotenv`: Loads environment variables from `.env`.
- `cors`: Middleware for enabling CORS.
- `exceljs`: Library for working with Excel files.
- `json2csv`: Library for converting JSON to CSV.

## Development

To contribute or make changes to the backend, follow these steps:

1. Fork the repository.
2. Create a new branch:
   ```sh
   git checkout -b feature/your-feature-name
   ```
3. Make your changes and commit them:
   ```sh
   git commit -m "Add your message here"
   ```
4. Push to your branch:
   ```sh
   git push origin feature/your-feature-name
   ```
5. Open a pull request.

## License

This project is licensed under the ISC License.

## Contact

For any inquiries or support, please contact the project maintainer.
# Task Management Dashboard

## Project Overview

This project is a feature-rich Task Management Dashboard built with React and TypeScript. The application provides an intuitive and responsive interface for managing tasks, tracking progress, and organizing work. It includes a variety of modern web technologies to ensure optimal performance and usability.

## Features

- **Task List:** Display a list of tasks with the ability to filter, sort, and search.
- **Task Details:** View and edit detailed information about each task.
- **Task Creation:** Create new tasks with titles, descriptions, deadlines, and priorities.
- **Task Deletion:** Delete tasks individually or in bulk.
- **Task Completion:** Mark tasks as completed or incomplete.
- **Task Prioritization:** Assign priorities to tasks to indicate their importance.
- **Task Filtering:** Filter tasks by status (completed, incomplete) and priority.
- **Task Sorting:** Sort tasks by title, deadline, priority, or completion status.
- **Task Search:** Search for tasks by title or description using a search bar.
- **Drag-and-Drop:** Reorder tasks using a drag-and-drop interface.
- **Online Support:** Connects to a RESTful API to fetch and update task data.
- **Offline Support:** Uses `localforage` to store data locally for offline access.
- **Responsive Design:** Fully responsive and optimized for mobile devices.

## Technologies Used

- **Front-End:**
  - React.js (with TypeScript)
  - React-Bootstrap
  - Redux Toolkit for state management
  - Axios for API requests

- **dev environment**
  - esbuild for bundling and dev server
  - eslint for linting
  - prettier for code formatting
  - typescript for type checking
  - serve for serving the build files
  - opener for opening the browser


## live demo

[Task Management Dashboard](https://mohamedtharwat000.github.io/TaskManagementDashboard/public/)

## Screenshot

![Screenshot](https://raw.githubusercontent.com/mohamedtharwat000/TaskManagementDashboard/main/public/screenshot.png)

## Project Structure

- `src/`: Contains the source code for the front-end and state management.
- `public/`: Contains static assets like HTML files and images.
- `build.js`: Script for building the project.

```
├── src/
│   ├── components/
│   │   ├── ...
│   ├── store/
│   │   ├── ...
│   ├── types/
│   │   └── ...
│   ├── App.tsx
│   └── index.tsx
├── public/
│   └── index.html
│       └── index.js
├── package.json
|── build.js
└── ...
```

## Installation and Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/mohamedtharwat000/TaskManagementDashboard.git
   cd taskManagement
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

## Scripts

- `format`: Runs Prettier to format the code.

  ```bash
  npm run format
  ```

- `lint`: Runs ESLint to fix and check for errors.

  ```bash
  npm run lint
  ```

- `tsc`: Runs the typescript types checker.

  ```bash
  npm run tsc
  ```

- `build`: Compiles the React code and bundles it.

  ```bash
  npm run build
  ```

- `start`: Starts the backend server.

  ```bash
  npm run start
  ```

- `dev`: Runs the development server and open the browser.

  ```bash
  npm run dev
  ```

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Author

Mohamed Tharwat

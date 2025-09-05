# Admin Dashboard (TBK Services)

This repository contains the source code for the TBK Villa Management Admin Dashboard. It is a powerful tool designed to efficiently manage villa bookings, finances, and day-to-day operations.

## Features

This dashboard includes all the core functionalities for villa management:

  * **Authentication**: A secure system with pages for login, forgot password, and change password.
  * **Dashboard Overview**: A detailed overview of real-time stats such as Total Villas, Bookings, Revenue, and Guests.
  * **Booking Management**: A centralized system to create, view, edit, and delete all villa bookings.
  * **Villa Management**: A dedicated page to manage all villas, including their details and performance statistics.
  * **Financials**: A dashboard to track expenses and view financial reports like Profit & Loss.
  * **Settings**: A page to configure general business settings, manage users, and set up security options.

## Tech Stack

This project is built using a modern and robust tech stack :

  * **Frontend**: React, React Router, Tailwind CSS, Shadcn UI
  * **State Management**: Redux
  * **Bundler**: Vite

## Getting Started

1.  **Clone the repository**:
    ```bash
      git clone https://github.com/TBK-Tech-Services/admin-console-ui.git
      cd tbk-admin
    ```
2.  **Install dependencies**:
    ```bash
      npm install
    ```
3.  **Run the development server**:
    ```bash
      npm run dev
    ```
    The application will start running at `http://localhost:3000`.

## Folder Structure

This project uses `react-router-dom` for client-side routing. The main entry point is the `App.tsx` file, where all the routes are defined.

  * `src/components`: This directory holds all reusable UI components.
  * `src/pages`: The main components for each page are located here (e.g., `Dashboard.tsx`, `Login.tsx`).
  * `src/App.tsx`: This file contains the primary route configuration for the entire application.

## API Integration

This frontend application interacts with a separate backend API. Ensure the backend server is running.
# Nigeria Immigration Staff Management System (NIS-SMS)

## Project Overview

The **NIS Staff Management System** is a professional digital solution designed to streamline personnel record-keeping within the **Nigeria Immigration Service**. This application replaces manual paper-based filing with a modern, secure, and automated platform for managing staff profiles, rank progressions, and deployments across various commands.

### The Problem

Traditional staff record management often faces challenges like data redundancy, difficulty in retrieving files, and a lack of real-time statistics on staff distribution. This project centralizes data to enhance administrative transparency and efficiency.

## Key Features

- **Secure Authentication:** Role-based access control (RBAC) ensuring only authorized personnel can access sensitive data.
- **Staff Digital Profiles:** Detailed records including Service Numbers, bio-data, current rank, and date of enlistment.
- **Deployment & Posting Tracking:** Manage and view staff transfers across different state commands and border posts.
- **Advanced Search & Filtering:** Quickly locate staff based on Rank, State of Origin, or Department.
- **Dashboard Analytics:** Visual representation of staff distribution and departmental statistics.
- **Responsive Design:** Fully optimized for both desktop and mobile views using Tailwind CSS.

---

## Tech Stack

- **Frontend:** React.js (Vite)
- **Styling:** Tailwind CSS
- **Routing:** React Router DOM
- **Icons:** Lucide React / Heroicons
- **State Management:** React Context API

---

## Project Structure

The project uses a **Feature-Based** modular architecture for better maintainability:

```text
src/
├── assets/          # Official logos and static images
├── components/      # Reusable UI elements (Buttons, Inputs, Tables)
├── date             # global data storage
├── pages/           # Individual route views
└── services/        # API configuration and data fetching
```

# Webhook Inspector

Webhook Inspector is a comprehensive full-stack developer utility designed to simplify API integration and debugging. It generates unique, customizable endpoint URLs that capture and log incoming HTTP requests in real-time, allowing developers to inspect webhook payloads, headers, and query parameters effortlessly.

## 🚀 Key Features

*   **Custom Endpoint Generation:** Instantly create unique URLs to receive incoming webhooks from any third-party service (Stripe, GitHub, Twilio, etc.).
*   **Real-Time Inspection:** Capture and analyze JSON payloads, form data, raw text, query parameters, and HTTP headers the moment they arrive.
*   **Developer-Friendly Dashboard:** A responsive, interactive UI built with React and Flowbite for easy sorting, filtering, and inspection of received hooks.
*   **Secure & Self-Hosted:** Maintain full control over your data by hosting the inspector locally or on your own servers.

## 🏗️ Project Architecture

The project is structured into two main decoupled services:

- **`backend/`**: A lightweight and secure Node.js/Express API. It handles URL routing, CORS management, request parsing, and data persistence for incoming webhooks.
- **`frontend/`**: A modern React application (initialized with Vite) utilizing the Flowbite component library. It provides the visual dashboard for real-time data monitoring.

## 🛠️ Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Backend Setup
1. Navigate to the `backend` directory: `cd backend`
2. Install dependencies: `npm install`
3. Create a `.env` file based on your environment needs.
4. Start the server: `npm run dev`

### Frontend Setup
1. Navigate to the `frontend` directory: `cd frontend`
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page if you want to contribute.

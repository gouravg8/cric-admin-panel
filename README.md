# Cricket Scoring Admin Panel

This project is a cricket scoring admin panel built using Next.js for the client-side and Node.js for the server-side. It allows administrators to manage cricket matches and update scores in real time.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Setup](#setup)
- [Development](#development)

## Prerequisites

- **Node.js**: Make sure you have Node.js installed on your machine. You can download it from [Node.js official website](https://nodejs.org/).
- **pnpm**: This project uses `pnpm` for package management. Install it globally using:

```bash
    npm install -g pnpm
```

## Setup
Clone the repository:

```bash
    git clone https://github.com/gouravg8/cric-admin-panel.git
```
### frontend
```bash
    cd client   # from root
    pnpm install
```
### backend
```bash
    cd server   # from root
    pnpm install
```

### Create Environment Variables:
`i've provided my mongo cluster as a test use`
```bash
    cp .example.env .env    # from ./server
```

## Development

### Running the Server
```bash
    pnpm run dev    # from ./server
```

### Running the client
```bash
    pnpm run dev    # from ./client
```
### Go to [http://localhost:3000](http://localhost:3000) to view the client.

## Tech Stack

### **Frontend:**
- **Next.js**: A React-based framework for building server-side rendered and statically generated web applications.
- **React**: A JavaScript library for building user interfaces.
- **Tailwind CSS**: A utility-first CSS framework for styling.
- **ShadCN**: A library of accessible, unstyled components for building high-quality web applications.
- **Recoil**: A state management library for React.
- **Socket.IO Client**: For real-time, bidirectional, and event-based communication between the client and server.
- **Axios**: A promise-based HTTP client for making API requests.
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.

### **Backend:**
- **Node.js**: A JavaScript runtime environment for executing JavaScript code server-side.
- **Express.js**: A minimal and flexible Node.js web application framework for building APIs.
- **Socket.IO**: For real-time communication between the server and client.
- **MongoDB**: A NoSQL database for storing and managing data.
- **Mongoose**: An ODM (Object Data Modeling) library for MongoDB and Node.js.
- **TypeScript**: Adds static types to JavaScript to improve developer productivity and code quality.

### **Tooling:**
- **pnpm**: A fast, disk space-efficient package manager.
- **Nodemon**: A utility that automatically restarts the server when file changes are detected.
- **Biome**: A code formatter and linter to maintain code quality and style.
- **ESLint**: A tool for identifying and fixing problems in JavaScript code.
- **TypeScript**: Used on both the client and server sides for type checking and development.
- **Zod**: A TypeScript-first schema declaration and validation library.
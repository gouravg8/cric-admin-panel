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
    cp .env.example .env    # from root for server
```

## Development

### Running the Server
```bash
    pnpm run dev    # from /server
```

### Running the client
```bash
    pnpm run dev    # from /client
```
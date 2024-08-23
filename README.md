# React Application with TypeScript and Vite

## Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/) (package managers)

## Setup

1. **Clone the repository:**

    ```bash
    git clone https://github.com/mahabur-rahman/innoscripta.git
    cd your-repository
    ```

2. **Install dependencies:**

    Using npm:

    ```bash
    npm install
    ```

    Or using Yarn:

    ```bash
    yarn install
    ```

## Running the Application

1. **Start the development server:**

    Using npm:

    ```bash
    npm run dev
    ```

    Or using Yarn:

    ```bash
    yarn dev
    ```

    This will start the Vite development server, and you should be able to view the application at [http://localhost:5173](http://localhost:5173).

2. **Open the application in your browser:**

    Navigate to [http://localhost:5173](http://localhost:5173) to see your React application running.

## Building for Production

To build the application for production, run:

Using npm:

```bash
npm run build
```

# Using Docker Container

1. **Build the Docker image:**

    Open your terminal and run:

    ```bash
    docker build -t react-app:dev .
    ```
    
2. **Check the docker image first**

    ```bash
    docker images
    ```


3. **Run the Docker container:**

    ```bash
    docker run -p 5173:5173 react-app:dev
    ```

    This maps port `5173` in the container to port `5173` on your host machine. You should be able to view the application at [http://localhost:5173](http://localhost:5173).



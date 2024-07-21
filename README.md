[![codecov](https://codecov.io/github/hab1/huggg/branch/master/graph/badge.svg?token=8BVFWF5028)](https://codecov.io/github/hab1/huggg)
[![Run Backend Unit Tests](https://github.com/hab1/huggg/actions/workflows/test-backend.yml/badge.svg)](https://github.com/hab1/huggg/actions/workflows/test-backend.yml)

# Huggg Test

## Installation and Running the Service

### Prerequisites

- Ensure you have Docker and Docker Compose installed on your system.

### Steps to Install and Run the Service

1. **Navigate to the Root Folder:**

   Open your terminal and navigate to the root directory of the project where the `docker-compose.yml` file is located.

2. **Build the Docker Containers:**

   Execute the following command to build the Docker containers for the service:

   ```sh
   docker compose build
   ```

3. **Start the Docker Containers:**

   Run the following command to start the service:

   ```sh
   docker compose up
   ```

4. **Access the Services:**

   - **Backend:** Load the backend service in your browser or API client via [http://localhost:3001](http://localhost:3001).
   - **Frontend:** Load the frontend service in your browser via [http://localhost:3000](http://localhost:3000).

## Stopping the Service

To stop the running Docker containers, use the following command:

```sh
docker compose down
```

This will stop and remove the containers defined in the `docker-compose.yml` file.

## Technology Stack

- **Backend:**
  - Framework: Express.js
  - Language: TypeScript

- **Frontend:**
  - Library: React.js

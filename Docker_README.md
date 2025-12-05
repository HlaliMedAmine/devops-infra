# **Running the Application with Docker**

This guide provides step-by-step instructions to run the **Book Review App** using Docker. You will learn how to:
1. **Create Dockerfiles for frontend and backend**
2. **Run individual containers**
3. **Run the entire stack with Docker Compose**
4. **Test the backend and frontend**

---

## **Step 1: Create Dockerfiles for Backend and Frontend**

### **Backend - Dockerfile**
Create a `Dockerfile` inside the `backend` folder:

```dockerfile
# Use official Node.js image as base
FROM node:18

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application code
COPY . .

# Expose port 3001 for backend
EXPOSE 3001

# Start the application
CMD ["node", "src/server.js"]
```

---

### **Frontend - Dockerfile**
Create a `Dockerfile` inside the `frontend` folder:

```dockerfile
# Use official Node.js image as base
FROM node:18

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application code
COPY . .

# Build the frontend
RUN npm run build

# Expose port 3000 for frontend
EXPOSE 3000

# Start the frontend using Next.js
CMD ["npm", "run", "start"]
```

---

## **Step 2: Running Individual Containers**

### **Running the Backend**
1. Navigate to the `backend` folder:
   ```sh
   cd backend
   ```

2. Build the backend image:
   ```sh
   docker build -t book-review-backend .
   ```

3. Run the backend container:
   ```sh
   docker run -d --name backend_container -p 3001:3001 --env-file .env book-review-backend
   ```

4. Verify the backend is running:
   ```sh
   docker logs backend_container
   ```

5. **Test the Backend API:**
   ```sh
   curl http://localhost:3001/api/books
   ```
   Expected Response:
   ```json
   []
   ```

---

### **Running the Frontend**
1. Navigate to the `frontend` folder:
   ```sh
   cd ../frontend
   ```

2. Build the frontend image:
   ```sh
   docker build -t book-review-frontend .
   ```

3. Run the frontend container:
   ```sh
   docker run -d --name frontend_container -p 3000:3000 --env NEXT_PUBLIC_API_URL=http://localhost:3001/api book-review-frontend
   ```

4. Verify the frontend is running:
   ```sh
   docker logs frontend_container
   ```

5. **Test the Frontend**
   - Open a browser and navigate to:
     ```
     http://localhost:3000
     ```
   - The frontend should display the book review app.

---

## **Step 3: Running with Docker Compose**
Instead of running each service manually, we can use **Docker Compose** to run the entire application.

### **Create `docker-compose.yml`**
Create a `docker-compose.yml` file in the root of the project:

```yaml
version: "3.8"

services:
  backend:
    build: ./backend
    container_name: backend_container
    restart: always
    ports:
      - "3001:3001"
    environment:
      - DB_HOST=mysql
      - DB_USER=root
      - DB_PASS=my-secret-pw
      - DB_NAME=book_review_db
      - PORT=3001
      - JWT_SECRET=mysecretkey
      - ALLOWED_ORIGINS=http://localhost:3000
    depends_on:
      - mysql

  frontend:
    build: ./frontend
    container_name: frontend_container
    restart: always
    depends_on:
      - backend
    environment:
      - NEXT_PUBLIC_API_URL=http://backend:3001/api
    ports:
      - "3000:3000"

  mysql:
    image: mysql:8
    container_name: mysql_container
    restart: always
    environment:
      - MYSQL_ROOT_PASSWORD=my-secret-pw
      - MYSQL_DATABASE=book_review_db
    ports:
      - "3306:3306"
    volumes:
      - mysql_data:/var/lib/mysql

volumes:
  mysql_data:
```

---

## **Step 4: Running Everything with Docker Compose**
1. Run the application:
   ```sh
   docker-compose up --build
   ```

2. **Verify the running containers**:
   ```sh
   docker ps
   ```
   Expected Output:
   ```
   CONTAINER ID   IMAGE               STATUS          PORTS
   xxxxx          book-review-backend  Up (running)   0.0.0.0:3001->3001/tcp
   xxxxx          book-review-frontend Up (running)   0.0.0.0:3000->3000/tcp
   xxxxx          mysql:8              Up (running)   0.0.0.0:3306->3306/tcp
   ```

---

## **Step 5: Testing**
### **Test the Backend API**
```sh
curl http://localhost:3001/api/books
```
Expected Response:
```json
[]
```

### **Test the Frontend**
- Open a browser and visit:
  ```
  http://localhost:3000
  ```
- The frontend should display the book review app, fetching data from the backend.

---

## **Step 6: Stopping and Cleaning Up**
To stop and remove all containers:
```sh
docker-compose down
```

To remove **all containers, volumes, and networks**:
```sh
docker-compose down -v
```

---

## **Summary**
✔ Created **Dockerfiles** for frontend and backend  
✔ Ran **individual containers** using Docker  
✔ Used **Docker Compose** to run the full application  
✔ Verified backend and frontend functionality  

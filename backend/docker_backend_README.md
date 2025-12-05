Here's the **updated backend README** with `.env` configuration and improved structure.

---

# **Backend - Book Review API**
This backend API provides **user authentication, book management, and reviews**. It is built using **Node.js, Express, and MySQL**, and can be deployed using **Docker**.

---

## **1. Update `.env` File**
Before running the backend, update your `.env` file inside the `backend` folder:

```sh
touch .env
vi .env
```

### **Example `.env` File**
```env
# Database Configuration 
DB_HOST=localhost
DB_NAME=book_review_db
DB_USER=root
DB_PASS=my-secret-pw
DB_DIALECT=mysql

# Application Port 
PORT=3001

# JWT Secret for Authentication
JWT_SECRET=mysecretkey

# Allowed Origins for CORS (comma-separated for multiple origins)
ALLOWED_ORIGINS=http://4.213.140.155:3000,http://localhost:3000
```

---

## **2. Dockerizing the Backend API**
Now that MySQL is running inside Docker, let's **Dockerize the backend**.

### **Step 1: Create `Dockerfile` for Backend**
Inside the **backend** folder, create a file named **`Dockerfile`**:
```sh
cd ~/book-review-app/backend
touch Dockerfile
vi Dockerfile
```

### **Dockerfile Content**
```Dockerfile
# Use Node.js as base image
FROM node:18

# Set working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to leverage Docker cache
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the application port (3001)
EXPOSE 3001

# Set environment variables (these should be passed via docker run or docker-compose)
ENV NODE_ENV=production

# Start the backend server
CMD ["node", "src/server.js"]
```

---

### **Step 2: Create `.dockerignore` (Optional)**
To optimize the build process, create `.dockerignore`:
```sh
touch .dockerignore
nano .dockerignore
```

### **Content of `.dockerignore`**
```
node_modules
npm-debug.log
.env
```

---

### **Step 3: Build Docker Image**
Run the following command to **build the backend image**:
```sh
docker build -t book-review-backend .
```
- `-t book-review-backend`: Tags the image as `book-review-backend`.

Verify the image was created:
```sh
docker images
```
You should see:
```
REPOSITORY             TAG       IMAGE ID       CREATED        SIZE
book-review-backend    latest    xxxxxxxxxxxx   xx seconds ago   300MB
```

---

### **Step 4: Run Backend Container**
Now, run the backend container and **connect it to MySQL**:
```sh
docker run -d --name backend-container -p 3001:3001 --env-file .env --network host book-review-backend
```

### **Explanation**
- `-d`: Runs the container in **detached mode**.
- `--name backend-container`: Names the container.
- `-p 3001:3001`: Maps port **3001** inside Docker to **3001** on the host.
- `--env-file .env`: Passes environment variables.

---

### **Step 5: Verify Backend is Running**
Check the running containers:
```sh
docker ps
```
You should see:
```
CONTAINER ID   IMAGE                 PORTS                    NAMES
xxxxxxxxxxxx   book-review-backend    0.0.0.0:3001->3001/tcp   backend-container
```

Check logs:
```sh
docker logs backend-container
```

If the backend is running, it should print:
```
Database connected successfully!
Server running on port 3001
```

---

## **6. Test Backend API using `curl`**
Now, **test backend APIs** using `curl`:

### **Health Check**
```sh
curl -X GET http://localhost:3001/
```
Expected output:
```
Book Review API is running...
```

### **Fetch Books**
```sh
curl -X GET http://localhost:3001/api/books
```

### **Register a User**
```sh
curl -X POST http://localhost:3001/api/users/register \
     -H "Content-Type: application/json" \
     -d '{"name": "Test User", "email": "test@example.com", "password": "test123"}'
```

### **Login User**
```sh
curl -X POST http://localhost:3001/api/users/login \
     -H "Content-Type: application/json" \
     -d '{"email": "test@example.com", "password": "test123"}'
```

### **Add a Book**
```sh
curl -X POST http://localhost:3001/api/books \
     -H "Content-Type: application/json" \
     -d '{"title": "New Book", "author": "John Doe", "rating": 4.5}'
```

---

## **7. Restart & Stop Containers**
To restart the backend:
```sh
docker restart backend-container
```

To stop the container:
```sh
docker stop backend-container
```

To remove the container:
```sh
docker rm backend-container
```

---

### **Final Summary**
✅ **Updated `.env` configuration**  
✅ **Dockerized backend with working environment variables**  
✅ **Build, run, and test the backend container**  
✅ **Ensured API is working using `curl`**  


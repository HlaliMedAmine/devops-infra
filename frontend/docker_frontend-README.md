## **Updated Guide: Dockerizing Next.js Frontend Without Nginx (Including `.env` Configuration)**

This guide will help you **Dockerize and deploy your Next.js frontend** using a **standalone Node.js server** (without Nginx) and includes **.env file configuration**.

---

## **1. Update `.env` File**
Before building the Docker image, create a `.env` file inside the **frontend** folder:

```env
# API URL for Production
NEXT_PUBLIC_API_URL=http://<YOUR_BACKEND_SERVER_IP>:3001
```

### **Explanation:**
- `NEXT_PUBLIC_API_URL` → The **backend API URL** the frontend should call.
- **For local testing:** Use `http://localhost:3001`
- **For remote deployment (Azure VM, AWS, etc.):** Use the public IP of the backend server.

Ensure that `.env.production` is included in the build process.

---

## **2. Create a Dockerfile**
Inside the **frontend** folder, create a `Dockerfile`:

```dockerfile
# Step 1: Use Node.js as the base image for building
FROM node:18 AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Set environment variables for production
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

# Build the Next.js application using the production .env file
RUN npm run build

# Step 2: Use a minimal Node.js runtime for running the Next.js server
FROM node:18 AS runner

# Set working directory inside the container
WORKDIR /app

# Copy built application files
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

# Set environment variables for production
ENV NODE_ENV=production
ENV PORT=3000

# Expose the application port
EXPOSE 3000

# Start the Next.js server
CMD ["npm", "run", "start"]
```

---

## **3. Build the Docker Image**
Run the following command inside the **frontend** folder:

```sh
docker build -t book-review-frontend .
```

---

## **4. Run the Frontend Container**
Once the build completes, run the container:

```sh
docker run -d \
  --name frontend-container \
  -p 3000:3000 \
  --network host \
  book-review-frontend
```

### **Explanation:**
- `-e NEXT_PUBLIC_API_URL=http://<YOUR_BACKEND_SERVER_IP>:3001` → Ensures the container uses the correct backend API URL.

---

## **5. Verify the Running Container**
Check if the container is running:
```sh
docker ps
```
Expected output:
```
CONTAINER ID   IMAGE                 PORTS                    NAMES
xxxxxxxxxxxx   book-review-frontend   0.0.0.0:3000->3000/tcp   frontend-container
```

---

## **6. Test the Frontend**
### **Access the Application**
- **For local testing:**
```
http://localhost:3000
```
- **For remote deployment (Azure, AWS, etc.):**
```
http://<YOUR_FRONTEND_SERVER_IP>:3000
```

---

## **7. Stopping and Removing the Container**
To stop the running container:
```sh
docker stop frontend-container
```
To remove the container:
```sh
docker rm frontend-container
```

---

## **8. Rebuilding and Restarting the Frontend**
Whenever you make changes to the frontend:
```sh
docker build --build-arg NEXT_PUBLIC_API_URL=http://<YOUR_BACKEND_SERVER_IP>:3001 -t book-review-frontend .
docker run -d -p 3000:3000 --name frontend-container -e NEXT_PUBLIC_API_URL=http://<YOUR_BACKEND_SERVER_IP>:3001 book-review-frontend
```

---

## **9. Updating `.gitignore` for Docker**
Ensure `.gitignore` includes:

```
node_modules
.next
.env
.env.local
.env.production
Dockerfile
docker-compose.yml
```

---

### **Summary**
✅ **Updated `.env` file configuration**  
✅ **Pass environment variables correctly** during **build** and **run**  
✅ **No need for Nginx**, Next.js runs on **port 3000**  
✅ **Easy deployment and testing**  


### **Docker Compose for Backend, Frontend, and MySQL**
Now that the backend and frontend are working in **Docker**, let's **combine everything into a single `docker-compose.yml`** to run with one command.

---

## **1. Create `docker-compose.yml`**
Inside the **root directory** of your project (same level as `frontend/` and `backend/`), create a file named `docker-compose.yml`:
```sh
cd ~/book-review-app
touch docker-compose.yml
vi docker-compose.yml
```

### **Content of `docker-compose.yml`**
```yaml
version: '2.1'

services:
  mysql:
    image: mysql:8.0
    container_name: mysql_container
    restart: always
    healthcheck:
      test: ["CMD", "mysqladmin", "ping", "-h", "localhost"]
      interval: 10s
      timeout: 5s
      retries: 5
    environment:
      MYSQL_ROOT_PASSWORD: my-secret-pw
      MYSQL_DATABASE: book_review_db
      MYSQL_USER: pravin
      MYSQL_PASSWORD: Demo12@Test23
    ports:
      - "3306:3306"
    volumes:
      - mysql_data:/var/lib/mysql

  backend:
    build: ./backend
    container_name: backend_container
    restart: always
    depends_on:
      mysql:
        condition: service_healthy
    environment:
      PORT: 3001
      DB_HOST: mysql
      DB_NAME: book_review_db
      DB_USER: pravin
      DB_PASS: Demo12@Test23
      DB_DIALECT: mysql
      JWT_SECRET: mysecretkey
      ALLOWED_ORIGINS: http://<FRONTEND PUBLIC IP>:3000
    ports:
      - "3001:3001"

  frontend:
    build: ./frontend
    container_name: frontend_container
    restart: always
    depends_on:
      - backend
    environment:
      NEXT_PUBLIC_API_URL: http://<BACKEND PUBLIC IP>:3001
    ports:
      - "3000:3000"

volumes:
  mysql_data:
```

---

## **2. Update Backend & Frontend `.env` Files**
Before running Docker Compose, ensure your **backend** and **frontend** `.env` files are updated.

### **Backend `.env`**
```env
DB_HOST=mysql
DB_NAME=book_review_db
DB_USER=appuser
DB_PASS=apppassword
DB_DIALECT=mysql
PORT=3001
JWT_SECRET=mysecretkey
ALLOWED_ORIGINS=http://localhost:3000,http://your-public-ip:3000
```

### **Frontend `.env`**
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

---

## **3. Build & Start Services**
Run the following command **to build and start** all containers:
```sh
docker-compose up -d --build
```

- `up -d` → Runs in **detached mode** (background).
- `--build` → Rebuilds images.

Check running containers:
```sh
docker ps
```

Expected output:
```
CONTAINER ID   IMAGE                PORTS                    NAMES
xxxxxxxxxx     book-review-backend   0.0.0.0:3001->3001/tcp   backend-container
xxxxxxxxxx     book-review-frontend  0.0.0.0:3000->3000/tcp   frontend-container
xxxxxxxxxx     mysql:8.0             0.0.0.0:3306->3306/tcp   mysql-container
```

---

## **4. Verify Everything is Working**
### **Check Logs**
```sh
docker logs backend-container
docker logs frontend-container
docker logs mysql-container
```

### **Test Backend API**
```sh
curl -X GET http://localhost:3001/
```
Expected output:
```
Book Review API is running...
```

### **Access the App**
- **Frontend:** Open `http://localhost:3000`
- **Backend API:** Open `http://localhost:3001/api/books`

---

## **5. Stop & Restart Services**
To **stop** all containers:
```sh
docker-compose down
```

To **restart**:
```sh
docker-compose up -d
```

To **restart a single container**:
```sh
docker-compose restart backend
```

---

### **Final Summary**
✅ **Single command to start backend, frontend, and MySQL**  
✅ **Uses `docker-compose.yml` for easy deployment**  
✅ **Automatic database creation and environment management**  
✅ **Works on local or cloud (Azure, AWS, GCP)**  


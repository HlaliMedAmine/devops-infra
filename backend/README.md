## **Book Review App - Backend**
This is the backend for the **Book Review App**, built with **Node.js, Express.js, and MySQL**. It provides APIs for **user authentication, book management, and reviews**.

---

## **Prerequisites**
Before setting up the backend, ensure you have the following installed:
- **Node.js (v18 or later)**  
  Download & install: [Node.js Official Website](https://nodejs.org/)  
  Verify installation:  
  ```sh
  node -v
  ```
- **MySQL (or MariaDB)**  
  Install: [MySQL Download](https://dev.mysql.com/downloads/)  
  Verify installation:  
  ```sh
  mysql --version
  ```
- **MySQL Client (or MariaDB)**  
  ```sh
  sudo apt update
  sudo apt install mysql-client -y
  ```

- **Test MySQL Connect (or MariaDB)**  
  ```sh
  mysql -h <your-mysql-server>.mysql.database.azure.com \
      -u <your-mysql-admin> \
      -p
  ```
  Replace <your-mysql-server> with your Azure MySQL server name.
  Replace <your-mysql-admin> with your MySQL admin username.
  Enter your password when prompted.

**Manually Create the Database**  
 Once inside the MySQL shell, run:

  ```sh
  CREATE DATABASE book_review_db;
  SHOW DATABASES;
  ```
✅ Now your database exists, and Sequelize can create tables inside it.

- **Postman (Optional, for API testing)**  
  Download: [Postman](https://www.postman.com/)

---

## **Step 1: Clone the Repository**
```sh
git clone https://github.com/pravinmishraaws/book-review-app.git
cd book-review-app/backend
```

---

## **Step 2: Install Dependencies**
Run the following command to install all required packages:
```sh
npm install
```
This installs:
- **Express.js** (Backend framework)
- **Sequelize** (ORM for MySQL)
- **MySQL2** (Database driver)
- **bcrypt.js** (For password hashing)
- **jsonwebtoken (JWT)** (For authentication)
- **dotenv** (For environment variables)
- **cors** (For cross-origin API access)

---

## **Step 3: Configure the Environment**
Create a `.env` file in the `backend/` directory:
```sh
touch .env
```
Open `.env` and configure the database connection:
```env
# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASS=yourpassword
DB_NAME=book_review_db
DB_DIALECT=mysql

# JWT Secret
JWT_SECRET=your_jwt_secret
```

---

## **Step 4: Start MySQL and Create the Database**
Start MySQL (if not running already):
```sh
mysql -u root -p
```
Then, inside MySQL:
```sql
CREATE DATABASE book_review_db;
EXIT;
```

### **Configuring CORS**
To control **which frontend domains** can access the backend, set `ALLOWED_ORIGINS` in `.env`:

```env
# Allow multiple frontend URLs (comma-separated)
ALLOWED_ORIGINS=https://your-frontend.com,http://localhost:3000
```

If deploying in **different environments**, modify `ALLOWED_ORIGINS`:
- **Development:**  
  ```env
  ALLOWED_ORIGINS=http://localhost:3000
  ```
- **Production:**  
  ```env
  ALLOWED_ORIGINS=https://your-frontend.com
  ```
---

## **Step 5: Start the Backend Server**
Run the following command:
```sh
node src/server.js
```
If everything is set up correctly, you should see:
```
🚀 Server running on port 3001
✅ Database schema updated successfully!
📚 Sample books added!
👤 Sample users added!
✍️ Sample reviews added!
```

---

## **Step 6: Testing the API**
You can test the API using **Postman** or **cURL**.

### **1. User Registration**
#### **Request**
```sh
curl -X POST http://localhost:3001/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "email": "john@example.com", "password": "password123"}'
```
#### **Expected Response**
```json
{ "message": "User registered successfully" }
```

---

### **2. User Login**
#### **Request**
```sh
curl -X POST http://localhost:3001/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"email": "john@example.com", "password": "password123"}'
```
#### **Expected Response**
```json
{ "token": "your-jwt-token", "user": { "id": 1, "name": "John Doe", "email": "john@example.com" } }
```

Save the **JWT token**, as it will be required for protected routes.

---

### **3. Fetch All Books**
#### **Request**
```sh
curl -X GET http://localhost:3001/api/books
```
#### **Expected Response**
```json
[
  { "id": 1, "title": "The Pragmatic Programmer", "author": "Andrew Hunt", "rating": 4.8 },
  { "id": 2, "title": "Clean Code", "author": "Robert C. Martin", "rating": 4.7 }
]
```

---

### **4. Fetch a Single Book**
#### **Request**
```sh
curl -X GET http://localhost:3001/api/books/1
```
#### **Expected Response**
```json
{ "id": 1, "title": "The Pragmatic Programmer", "author": "Andrew Hunt", "rating": 4.8 }
```

---

### **5. Add a Review (Requires Authentication)**
#### **Request**
```sh
curl -X POST http://localhost:3001/api/reviews \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"bookId": 1, "comment": "Great book!", "rating": 5}'
```
#### **Expected Response**
```json
{ "message": "Review added successfully" }
```

---

### **6. Fetch Reviews for a Book**
#### **Request**
```sh
curl -X GET http://localhost:3001/api/reviews/1
```
#### **Expected Response**
```json
[
  { "id": 1, "userId": 1, "bookId": 1, "comment": "Great book!", "rating": 5, "username": "John Doe" }
]
```

---

## **Step 7: Folder Structure**
```
/backend
 ├── /src
 │   ├── /config           # Database connection
 │   ├── /models           # Sequelize models (User, Book, Review)
 │   ├── /routes           # API route handlers
 │   ├── /controllers      # Business logic
 │   ├── /middleware       # Authentication middleware (JWT)
 │   ├── server.js         # Main Express server
 ├── package.json          # Backend dependencies
 ├── .env                  # Environment variables
 ├── README.md             # Backend documentation
```

---

## **Step 8: Deployment**
To deploy the backend:
1. Set up a **MySQL database** on a cloud provider (AWS RDS, Azure MySQL, etc.).
2. Configure environment variables for production.
3. Use **PM2** or a **Docker container** to run the backend.

### **Run with PM2**
```sh
npm install -g pm2
pm2 start src/server.js --name "book-review-backend"
```

### **Run with Docker**
Create a `Dockerfile`:
```Dockerfile
FROM node:18
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
CMD ["node", "src/server.js"]
EXPOSE 3001
```
Build and run the container:
```sh
docker build -t book-review-backend .
docker run -p 3001:3001 book-review-backend
```

---

## **Troubleshooting**
1. **Database connection issues**
   - Ensure MySQL is running and credentials in `.env` are correct.
   - Try manually connecting:
     ```sh
     mysql -u root -p
     ```
   - Check if the database exists:
     ```sql
     SHOW DATABASES;
     ```

2. **JWT authentication issues**
   - Ensure `JWT_SECRET` is set in `.env`.

3. **CORS errors**
   - Ensure the frontend and backend are running on different ports.
   - Check if `cors()` middleware is enabled.

---

## **Next Steps: If you are developer and want to continue then**
- Implement **admin features** (book creation, user management).
- Add **pagination and sorting** for book lists.
- Optimize **API performance** using caching.


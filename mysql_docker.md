## **Step 1: Pull the MySQL Image**
On your **Azure VM**, pull the latest **MySQL** image:
```sh
docker pull mysql:latest
```

---

## **Step 2: Run MySQL Container**
Run **MySQL container** with persistent storage:
```sh
docker run -d \
  --name mysql-container \
  -e MYSQL_ROOT_PASSWORD=my-secret-pw \
  -e MYSQL_DATABASE=book_review_db \
  -e MYSQL_USER=pravin \
  -e MYSQL_PASSWORD=Demo12@Test23 \
  -p 3306:3306 \
  -v mysql_data:/var/lib/mysql \
  mysql:latest
```

### **Explanation**
- `-d`: Runs the container in detached mode.
- `--name mysql-container`: Names the container.
- `-e MYSQL_ROOT_PASSWORD=my-secret-pw`: Sets **root password**.
- `-e MYSQL_DATABASE=book_review_db`: Creates **default database**.
- `-e MYSQL_USER=pravin`: Adds **custom MySQL user**.
- `-e MYSQL_PASSWORD=Demo12@Test23`: Password for the user `pravin`.
- `-p 3306:3306`: Exposes **MySQL on port 3306**.
- `-v mysql_data:/var/lib/mysql`: Stores MySQL **data persistently**.

---

## **Step 3: Verify MySQL is Running**
Check if the container is running:
```sh
docker ps
```
If running, you should see:
```
CONTAINER ID   IMAGE       COMMAND                  CREATED         STATUS        PORTS                    NAMES
xxxxxxxxxxxx   mysql:latest   "docker-entrypoint.s…"   xx minutes ago   Up (healthy)   0.0.0.0:3306->3306/tcp   mysql-container
```

---

## **Step 4: Connect to MySQL**
Run this command inside the **container**:
```sh
docker exec -it mysql-container mysql -u root -p
```
Enter the **root password** (`my-secret-pw`), then test if the database exists:
```sql
SHOW DATABASES;
```
It should list:
```
book_review_db
```

---

## **Step 5: Configure Firewall for External Access (Optional)**
If you want to access **MySQL remotely** from your local machine:
1. **Allow port 3306 in Azure VM’s NSG**
   ```sh
   sudo ufw allow 3306/tcp
   ```
2. **Update MySQL to allow external connections**  
   Edit `/etc/mysql/my.cnf` (or `/etc/mysql/mysql.conf.d/mysqld.cnf`) inside the container:
   ```sh
   docker exec -it mysql-container bash
   nano /etc/mysql/mysql.conf.d/mysqld.cnf
   ```
   Find this line:
   ```
   bind-address = 127.0.0.1
   ```
   Change it to:
   ```
   bind-address = 0.0.0.0
   ```
   Restart MySQL:
   ```sh
   docker restart mysql-container
   ```

Now, **your MySQL is ready inside Docker**.


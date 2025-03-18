# 🚀 Bento API - Delivery Fee Calculation

This project is a **Nest.js API** that integrates with **Bento's delivery fee service**, applies a **13% margin**, and stores requests in a **Firebase Firestore emulator** running on **Docker**.

## 📂 Project Structure

The project follows the **DDD (Domain-Driven Design)** architecture with the following structure:

```
bento-backend/
│── src/
│   ├── application/            # Application Layer (Use Cases / Services)
│   │   ├── services/
│   │   │   ├── delivery.service.ts
│   │   │   ├── request.service.ts
│   │   ├── dtos/
│   │       ├── delivery-fee.dto.ts
│   ├── domain/                 # Domain Layer (Entities and Repositories)
│   │   ├── entities/
│   │   │   ├── delivery.entity.ts
│   │   │   ├── request.entity.ts
│   ├── infrastructure/         # Infrastructure Layer (Firebase, Bento API, External Services)
│   │   ├── firebase/
│   │   │   ├── firebase.config.ts
│   │   ├── external/
│   │       ├── bento-auth.service.ts
│   │       ├── bento-api.service.ts
│   ├── presentation/           # Presentation Layer (Controllers)
│   │   ├── controllers/
│   │   │   ├── delivery.controller.ts
│   │   │   ├── request.controller.ts
│   ├── config/                 # Configuration Files
│   │   ├── swagger.ts
│   ├── main.ts
│   ├── app.module.ts
│── docker-compose.yml
│── Dockerfile
│── package.json
│── .env
│── README.md
```

---

## 🏗️ **Technologies Used**
- **Nest.js** (TypeScript-based backend framework)
- **Firebase Firestore Emulator** (Local NoSQL database)
- **Swagger** (API documentation)
- **Docker & Docker Compose** (Containerized environment)
- **Axios** (HTTP requests)
- **Google Cloud SDK** (Firestore Emulator)

---

## 🚀 **How to Run the Project**

### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/Cosmess/delivery_fee.git
cd delivery_fee
```

### **2️⃣ Set Up Environment Variables**
Create a **`.env`** file in the root directory with the following content:

```ini
# API Configuration
PORT=3000
NODE_ENV=development

# Firestore Emulator
FIREBASE_PROJECT_ID=bento-project
FIRESTORE_EMULATOR_HOST=firestore:8080

# Firebase Authentication
FIREBASE_AUTH_API_KEY=YOUR_FIREBASE_AUTH_KEY

# Bento API Configuration
BENTO_API_BASE_URL=https://api.bento.ky
BENTO_MERCHANT_ID=8JbEqL0RTgHFFFFFFFFFF

# Test Credentials
BENTO_TEST_EMAIL=your-email@example.com
BENTO_TEST_PASSWORD=your-password
```

### **3️⃣ Start the Application using Docker**
```sh
docker-compose up --build -d
```

### **4️⃣ Verify Running Containers**
Check if **Firestore Emulator** and **Nest.js API** are running:
```sh
docker ps
```

Expected output:
```
CONTAINER ID   IMAGE               PORTS                    NAMES
1234567890ab   google/cloud-sdk    0.0.0.0:8080->8080/tcp   firestore_emulator
9876543210cd   bento-backend_api   0.0.0.0:3000->3000/tcp   bento-api
```

### **5️⃣ Test the API**
Swagger UI Documentation:  
👉 **[http://localhost:3000/docs](http://localhost:3000/docs)**

#### **Test Fetching Delivery Fee**
```sh
curl "http://localhost:3000/delivery/fee?addressFrom={"coordinates":{"lat":19.3331008,"lng":-81.3801101}}&addressTo={"coordinates":{"lat":19.2803544,"lng":-81.3738686}}"
```

#### **Test Fetching Last 10 Requests**
```sh
curl "http://localhost:3000/requests/last"
```

### **6️⃣ Stopping the Containers**
To stop the containers, run:
```sh
docker-compose down
```

---

## 📜 **API Endpoints**
### 📍 **GET /delivery/fee**
**Fetches the delivery fee with a 13% margin applied.**

#### **Request Parameters**
| Name        | Type   | Required | Description                              |
|------------|--------|----------|------------------------------------------|
| addressFrom | string | ✅ Yes   | JSON string of origin coordinates       |
| addressTo  | string | ✅ Yes   | JSON string of destination coordinates  |

#### **Example Response**
```json
{
  "originalFee": 8.13,
  "newFee": 9.19
}
```

---

### 📍 **GET /requests/last**
**Retrieves the last 10 requests stored in Firestore.**

#### **Example Response**
```json
[
  {
    "originalFee": 8.13,
    "newFee": 9.19,
    "timestamp": "2025-03-17T10:00:00Z",
    "userAgent": "Mozilla/5.0",
    "userUUID": "ANONYMOUS_USER_UUID"
  }
]
```

---

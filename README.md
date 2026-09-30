# 🌱 FarmSmart: IoT Agricultural Backend

> **Cultivating the Future of Farming through Real-Time Data and Automation.**

FarmSmart is a robust, event-driven REST API designed to modernize agricultural management. By bridging the gap between physical soil sensors and a scalable cloud architecture, this backend empowers farmers with live analytics, automated irrigation controls, and direct channels to agricultural experts. 

## 🌍 Overview & Approach

The project was engineered with a focus on security, real-time communication, and modular scalability. 

**The Architecture:** Built on a strict **MVC (Model-View-Controller)** pattern, the codebase clearly separates database schemas, business logic, and client-facing routes. 
**The Security Model:** We implemented **Role-Based Access Control (RBAC)** using JSON Web Tokens (JWT). The system intelligently distinguishes between `farmers` (who own land and sensors) and `experts` (who analyze data and issue advice), ensuring data isolation and privacy.
**The Real-Time Engine:** Instead of relying on traditional, slow HTTP polling, the architecture integrates **Socket.io** to open a persistent WebSocket connection. When a physical sensor detects a moisture drop, the server instantly broadcasts that change to any connected web dashboard without a page refresh.

## ⚡ Core Features

* **Secure Authentication:** Encrypted passwords (Bcrypt) and protected routes using JWT middleware.
* **Farm & Crop Management:** Full CRUD operations for farmers to map out their fields and track crop lifecycles (planting to expected harvest).
* **IoT Sensor Integration:** Endpoints to register physical moisture/temperature sensors and record high-volume environmental data.
* **Live Dashboarding:** Real-time data broadcasting via WebSockets for instant frontend updates.
* **Smart Irrigation:** Automated starting and stopping of irrigation sequences based on sensor data.
* **Expert Consultation:** Dedicated secure routes allowing agricultural scientists to send targeted fertilizer and health advice directly to specific farms.
* **Push Notifications:** Pre-configured Firebase Admin SDK integration to trigger mobile alerts for weather or pest warnings.

## 🛠️ Tech Stack

* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** MongoDB & Mongoose (Relational Object Modeling)
* **Real-Time Communication:** Socket.io (WebSockets)
* **Security:** JSON Web Tokens (JWT), Bcrypt.js
* **Notifications:** Firebase Admin SDK

## 🚀 How to Run Locally

**1. Clone the Repository**
Open your terminal and pull down the code:
`git clone https://github.com/YOUR_USERNAME/FarmSmart-Backend.git`
`cd FarmSmart-Backend`

**2. Install Dependencies**
Install all required Node modules:
`npm install`

**3. Configure Environment Variables**
Create a `.env` file in the root directory and add your secure credentials. Do not commit this file to GitHub!
`PORT=5000`
`MONGO_URI=your_mongodb_connection_string`
`JWT_SECRET=your_super_secret_key`

**4. Boot up the Server**
Start the application:
`node index.js`

**5. Test the Real-Time Connection**
Simply open the included `test-socket.html` file in any web browser to instantly launch a live dashboard and watch the Socket.io engine broadcast sensor data in real-time.

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const http = require('http'); 
const { Server } = require('socket.io'); 

dotenv.config();
const app = express();
app.use(express.json());

// 1. Create HTTP server and Socket.io instance
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
    }
});

// 2. Handle Live WebSocket connections
io.on('connection', (socket) => {
    console.log(`🔌 New client connected: ${socket.id}`);

    // Listen for incoming live sensor data
    socket.on('sendSensorData', (data) => {
        // Broadcast that data instantly to any connected dashboards
        io.emit('liveDashboardUpdate', data); 
    });

    socket.on('disconnect', () => {
        console.log(`❌ Client disconnected: ${socket.id}`);
    });
});

// 3. Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ Successfully connected to MongoDB!"))
    .catch((error) => console.error("❌ Error connecting to MongoDB:", error.message));

// 4. Import and Use Routes
const authRoutes = require('./routes/authRoutes');
const farmRoutes = require('./routes/farmRoutes');
const sensorRoutes = require('./routes/sensorRoutes');
const sensorDataRoutes = require('./routes/sensorDataRoutes');
const irrigationRoutes = require('./routes/irrigationRoutes');
const cropRoutes = require('./routes/cropRoutes');
const predictionRoutes = require('./routes/predictionRoutes');
const alertRoutes = require('./routes/alertRoutes');
const expertRoutes = require('./routes/expertRoutes');

const notificationRoutes = require('./routes/notificationRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/farms', farmRoutes);
app.use('/api/sensors', sensorRoutes);
app.use('/api/sensor-data', sensorDataRoutes);
app.use('/api/irrigation', irrigationRoutes);
app.use('/api/crops', cropRoutes);
app.use('/api/predictions', predictionRoutes);
app.use('/api/alerts', alertRoutes);
app.use('/api/experts', expertRoutes);


app.use('/api/notifications', notificationRoutes);

// 5. Start the server using server.listen instead of app.listen
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
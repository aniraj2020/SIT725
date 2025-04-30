const express = require('express');
const mongoose = require('mongoose');
const projectRoutes = require('./routes/projectRoutes');
const userRoutes = require('./routes/userRoutes');
const socket = require('./socket'); // Import shared socket logic

const app = express();
const PORT = process.env.PORT || 3001;

// Set up HTTP + Socket.IO via shared module
const http = require('http').createServer(app);
const io = socket.init(http); // Initialize socket with server

// Middleware
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/myprojectDB");
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

// Routes
app.use('/api/projects', projectRoutes);
app.use('/api/users', userRoutes);

// Socket.IO setup
io.on('connection', (socket) => {
  console.log('A user connected');

  // Emit random number every 1s
  const interval = setInterval(() => {
    socket.emit('number', Math.floor(Math.random() * 100));
  }, 1000);

  socket.on('disconnect', () => {
    clearInterval(interval);
    console.log('User disconnected');
  });
});

http.listen(PORT, () => {
  console.log(`Server with sockets running at http://localhost:${PORT}`);
});

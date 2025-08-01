const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const router = require('./routes/tasks.js');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(MongoDBUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/tasks', router);

// Start Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port: http://localhost:${PORT}`);
});
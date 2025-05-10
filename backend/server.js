const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/cards', require('./routes/cardRoutes'));
app.use('/api/facts', require('./routes/factRoutes'));
app.use('/api/quiz', require('./routes/quizRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/services', require('./routes/services'));
app.use('/api/saved-cards', require('./routes/savedCardRoutes'));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

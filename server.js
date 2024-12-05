const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const mentorRoutes = require('./routes/mentor');
const studentRoutes = require('./routes/student');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use('/mentor', mentorRoutes);
app.use('/student', studentRoutes);
mongoose.connect('mongodb://localhost:27017/mentor-student')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('Database connection error:', err));


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const express = require('express');
require('./config/db')();
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const linkRoutes = require('./routes/linkRoutes');

//----------Middlewares-------- ORDER is important
app.use(morgan('dev'));
app.use(bodyParser.json({ limit: '5mb', type: 'application/json' }));
app.use(cors());

//Routes
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', categoryRoutes);
app.use('/api', linkRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is starting at port ${PORT}`));

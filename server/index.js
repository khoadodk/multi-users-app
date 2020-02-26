const express = require('express');
require('./config/db')();
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();

const authRoutes = require('./routes/authRoutes');

//----------Middlewares-------- ORDER is important
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());

//Routes
app.use('/api', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is starting at port ${PORT}`));

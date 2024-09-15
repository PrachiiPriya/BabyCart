const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

app.use(cors());
app.use(express.json());

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require('dotenv').config();
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

const db = require('./database/db');

const DBdata = require('./DBdata');
DBdata();

const ProductData = require('./models/ProductSchema');

app.get('/', async (req, res) => {
  try {
    const showData = await ProductData.find();
    console.log('Data fetched.');
    res.status(200).json(showData);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

const BoutiqueRouter = require('./routes/BoutiqueRoutes');
const signupRouter = require('./routes/loginSignupRoute');
const cartRoutes = require('./routes/cartRoutes'); // Import cartRoutes

app.use('/api/loginSignup', signupRouter);
app.use('/api/boutiques', BoutiqueRouter);
app.use('/api/cart', cartRoutes); // Use cartRoutes


const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});

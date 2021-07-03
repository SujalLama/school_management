const express = require('express')
require('dotenv').config();
const db = require('./models/index');
const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('<h1>Hello world.</h1>')
})

const connectDB = async () => {
    try {
  await db.sequelize.authenticate();
  console.log('Connection has been established successfully.');
    } catch (error) {
    console.error('Unable to connect to the database:', error);
    }
}

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port: ${PORT}`))
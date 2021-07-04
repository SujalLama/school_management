const express = require('express')
require('dotenv').config();
const db = require('./models/index');

//routes import
const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');
const roleRoute = require('./routes/role');
const parentRoute = require('./routes/parent');
const teacherRoute = require('./routes/teacher');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('<h3>Welcome to school management system.</h3>')
})

// routes
app.use('/auth', authRoute);
app.use('/users', userRoute);
app.use('/roles', roleRoute);
app.use('/parents', parentRoute);
app.use('/teachers', teacherRoute);

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
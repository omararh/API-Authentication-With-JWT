const express = require("express");
const app = express();
require('dotenv').config({ path: './routes/.env' });
const mongoose = require('mongoose');
mongoose.set("strictQuery", false);
const authRoute = require('./routes/auth');
const usersList = require('./routes/usersList');



//connect to DB 

mongoose.connect(process.env.DB_CONNECT, {
    useUnifiedTopology: true,
    useNewUrlParser: true
});

app.use(express.json());

app.use('/api/user', authRoute);
app.use('/api/users', usersList);



app.listen(3000, () => {
    console.log("is runnig ;)");
});
require('dotenv').config();

const express = require('express');
const app = express();
//error handlers..
require('express-async-errors');
const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

const connectDB = require('./db/connect');
const productRouter = require('./routes/products');
const port = 3000;
app.use(express.json());

app.get('/', (req, res) => {
    return res.send('<h1>Store</h1><a href="api/v1/products"> Click here</a>');
});
app.use('/api/v1/products/',productRouter);

app.use(notFound);
app.use(errorHandlerMiddleware);

const start = async (port_num) => {
    try {
        //connectDB
        await connectDB(process.env.MONGO_URI);
        app.listen(port_num, console.log(`Server is active @${port_num}`));

    } catch (error) {
        console.log(error);
    }

};
start(port);
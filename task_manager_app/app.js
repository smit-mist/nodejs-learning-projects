const express = require('express');
const app = express();
const tasks = require('./routes/tasks');
const port = 3000;
const connectDB = require('./db/connect');
const notFound = require('./middleware/not-found');
app.use(express.static('./public'));
app.use(express.json());
const errorHandler = require('./middleware/error_handler');
require('dotenv').config();

app.use('/api/v1/tasks', tasks);
app.use(notFound);
app.use(errorHandler);

const start =async ()=>{
	try{
		await connectDB(process.env.MONGO_URI);
		app.listen(port,console.log(`Server is running @${port}...`));

	}
	catch(err){
		console.log(err);
	}
};
start();


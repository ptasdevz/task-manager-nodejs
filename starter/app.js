const express = require('express');
const app = express();
const tasks = require('./routes/tasks');
const connectDB = require('./db/connect');
require('dotenv').config();

//middleware
app.use(express.json())
app.use(express.static('./public'))
app.use('/api/v1/tasks', tasks);


//routes
app.get('/',(req, res)=>{
    res.send(`<h1>Task Manager App</>`)
}) 

//app.get('api/v1/tasks') - get all the task
//app.post('api/v1/tasks') - create a new task
//app.patch('api/v1/tasks/:id') - update task
//app.get('api/v1/tasks/:id') - getsingle task
//app.delete('api/v1/tasks/:id') - delete  task

const port = 3000

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, console.log(`Server is running on port ${port}...`));
    } catch (error) {
        console.log(error);
    }
}
start();

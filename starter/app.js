const express = require('express');
const app = express();
const tasks = require('./routes/tasks');
const connectDB = require('./db/connect');
require('dotenv').config();
const notFound = require('./middleware/not-found');
const errorhandler = require('./middleware/error-handler');
const path = require('path');
const morgan = require('morgan');
const rfs = require('rotating-file-stream');

//middleware
app.use(express.static('./public'));
app.use(express.json());
//log all request using daily files to access.log
app.use(morgan('combined', {
    stream: rfs.createStream('access.log',
        { interval: '1d', path: path.join(__dirname, 'logs') }, { flags: 'a' })

}));
app.use('/api/v1/tasks', tasks);
app.use(notFound);
app.use(errorhandler);




const port = process.env.PORT || 3000

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, console.log(`Server is running on port ${port}...`));
    } catch (error) {
        console.log(error);
    }
}
start();

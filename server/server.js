const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const ejs = require('ejs');
const io = require('socket.io')();
const app = express();

const bookings = require('./routes/bookings');

mongoose.connect('mongodb+srv://admin:admin@cluster0-waifx.gcp.mongodb.net/test?retryWrites=true&w=majority', (err) => {
    if(err) console.log('Unable to connect to database : ', err);
    else console.log('Successfully connected to database');
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', ejs.renderFile);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.get('/', (req, res) => res.render('index.html'));
app.use('/api', bookings);

io.listen(app.listen(5000, () => console.log('Server running at port 5000')));
app.io = io.on('connection', (socket) => console.log('Socket connected : ', socket.id));
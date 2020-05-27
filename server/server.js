const express = require('express');
const path = require('path');
const ejs = require('ejs');
const io = require('socket.io')();
const app = express();

const bookings = require('./routes/bookings');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', ejs.renderFile);

app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.get('/', (req, res) => res.render('index.html'));
app.use('/api', bookings);

io.listen(app.listen(5000, () => console.log('Server running at port 5000')));
app.io = io.on('connection', (socket) => console.log('Socket connected : ', socket.id));
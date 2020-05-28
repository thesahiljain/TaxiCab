const express = require('express');
const router = express.Router();
const Booking = require('../models/bookings');

router.get('/bookings', (req, res) => {
    Booking.find({}, (err, bookings) => {
        if(err) res.send(err);
        res.json(bookings);
    });
});

router.post('/bookings', (req, res) => {
    const booking = req.body.data;
    if(!booking) res.status(400).json({success : false, error : 'Bad data'});
    else new Booking(booking).save((err, savedBooking) => {
        if(err) res.json({success : false, error : err});
        res.json({success : true, payload : booking});
    });
});

module.exports = router;
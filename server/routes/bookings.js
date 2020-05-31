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
    const nearByDriver = req.body.nearByDriver;
    var io = req.app.io;

    if(!booking) res.status(400).json({success : false, error : 'Bad data'});
    else new Booking(booking).save((err, savedBooking) => {
        if(err) res.json({success : false, error : err});
        else {
            res.json({success : true, payload : booking});
            if(nearByDriver.socketId) {
                var socketRequest = nearByDriver.socketId + 'driverRequest';
                io.emit(socketRequest, savedBooking);
            }
            else
                console.log('Driver not connected');
        }
    });
});

router.put('/bookings/:id', (req, res) => {
    var io = req.app.io;
    Booking.findOne({_id : req.params.id}, (err, booking) => {
        if(err) res.json({success : false, error : err});
        else {
            booking.driverId = req.body.driverId;
            booking.status = req.body.status;
            booking.save((err, updatedBooking) => {
                if(err) res.json({success : false, error : err});
                else {
                    res.send({success : true, confirmedBooking : updatedBooking});
                    io.emit("action", {
                        type : "BOOKING_CONFIRMED",
                        payload : updatedBooking
                    });
                }
            });
        } 
    });
});

module.exports = router;
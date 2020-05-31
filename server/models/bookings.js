const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({
    userName : {type : String, required : true},
    pickUp : { type : Object, required : true},
    dropOff : { type : Object, required : true },
    fare : {type : Number, required : true},
    status : {type : String, required : true},
    driverId : {type : String}
});

const Booking = module.exports = mongoose.model('Booking', bookingSchema);
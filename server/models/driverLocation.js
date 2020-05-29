const mongoose = require('mongoose');

let driverLocationSchema = mongoose.Schema({
    driverId : {type : String, required : true},
    coordinate : {
        type : {type : String, required : true},
        coordinates : [{type : Number}]
    },
    socketId : {type : String}
});

driverLocationSchema.index({coordinate : '2dsphere'});
const DriverLocation = module.exports = mongoose.model('DriverLocation', driverLocationSchema);
const mongoose = require('mongoose');

const driverSchema = mongoose.Schema({
    firstName : {type : String, required : true},
    lastName : {type : String, required : true},
    profilePic : {type : String, required : true},
    rating : {type : Number, required : true},
    vehicle : {
        bodyType : {type : String, required : true},
        model : {type : String, required : true},
        plateNumber : {type : String, required : true},
        color : {type : String, required : true},
    }
});

const Driver = module.exports = mongoose.model('Driver', driverSchema);
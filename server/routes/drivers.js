const express = require('express');
const router = express.Router();
const Driver = require('../models/drivers');
const DriverLocation = require('../models/driverLocation');

router.get('/driver/:id', (req, res) => {
    Driver.findOne({_id : req.params.id}, (err, driver) => {
        if(err) res.json({success : false, error : err});
        else res.json({success : true, drivers : driver});
    });
});

router.get('/drivers', (req, res) => {
    Driver.find({}, (err, drivers) => {
        if(err) res.json({success : false, error : err});
        else res.json({success : true, drivers : drivers});
    });
});

router.get('/driverLocation/:id', (req, res) => {
    DriverLocation.findOne({driverId : req.params.id}, (err, driver) => {
        if(err) res.json({success : false, error : err});
        else res.json({success : true, driver : driver});
    });
});

router.get('/driverLocation', (req, res) => {
    DriverLocation.find({
        "coordinate":{
            "$near":{
                "$geometry":{
                    "type":"Point",
                    "coordinates": [parseFloat(req.query.longitude), parseFloat(req.query.latitude)]
                },
                "$maxDistance":10000
            }
        }
    }, (err, location) => {
        if(err) res.json({success : false, error : err});
        else res.json({ success : true , location : location });
    });
});

router.get('/driverLocations', (req, res) => {
    DriverLocation.find({}, (err, drivers) => {
        if(err) res.json({success : false, error : err});
        else res.json({success : true, drivers : drivers});
    });
});

router.post('/driver', (req, res) => {
    new Driver(req.body).save((err, driver) => {
        if(err) res.json({success : false, error : err});
        else res.json({success : true, driver : driver});
    });
});

router.post('/driverLocation', (req, res) => {
    new DriverLocation(req.body).save((err, driverLocation) => {
        if(err) res.json({success : false, error : err});
        else res.json({success : true, driverLocation : driverLocation});
    });
});

module.exports = router;
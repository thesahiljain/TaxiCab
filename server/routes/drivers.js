const express = require('express');
const router = express.Router();
const Driver = require('../models/drivers');

router.get('/drivers', (req, res) => {
    Driver.find({}, (err, drivers) => {
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

module.exports = router;
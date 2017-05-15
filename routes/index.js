var express = require('express');
var router = express.Router()

router.get("/", function(req, res) {
    res.send('initial setup');
});

module.exports = router;

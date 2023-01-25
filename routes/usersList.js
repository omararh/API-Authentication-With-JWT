const router = require('express').Router();
const User = require('../models/User');
const verify = require('../routes/verifieTokens');

router.get('/', verify, async(req, res) => {

    User.find({}, function(err, users) {
        var userMap = {};

        users.forEach(function(user) {
            userMap[user._id] = user;
        });

        res.send(userMap);
    });
});

module.exports = router;
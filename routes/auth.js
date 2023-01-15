const router = require('express').Router();
const User = require('../modules/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validateUser, logInValidation } = require('../routes/validation');



//Register
router.post('/register', async(req, res) => {

    //create a new user 
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    const { error } = validateUser(user);
    if (error) return res.status(400).send(error.details[0].message);

    //check if the user is already in the DB
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send('email Already exists');

    //hash the password 
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    user.password = hashedPassword;

    try {
        await user.save();
        res.send({ user: user._id });
    } catch (err) {
        res.status(400).send(err);
    }

});



//LogIn
router.post('/login', async(req, res) => {
    const { error } = logInValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //check if user exist 
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('email or password is wrong');

    //password verification
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('email or password is wrong');


    //create and assigned a token 
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);


})


module.exports = router;
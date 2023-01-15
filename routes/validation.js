//data Validation
const Joi = require('joi');

function validateUser(user) {    
    const JoiSchema = Joi.object({
        name: Joi.string().min(3).max(30).required(),
        email: Joi.string().email().min(5).max(50).required(),
        password: Joi.string().min(6).max(30).required()    
    }).unknown();      
    return JoiSchema.validate(user)
}



function logInValidation(user) {    
    const JoiSchema = Joi.object({
        email: Joi.string().email().min(5).max(50).required(),
        password: Joi.string().min(6).max(30).required()    
    }).unknown();      
    return JoiSchema.validate(user)
}



module.exports.validateUser = validateUser;
module.exports.logInValidation = logInValidation;
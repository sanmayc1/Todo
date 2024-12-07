import {body} from 'express-validator'

const validationRule = [

    body('name')
    .trim()
    .isAlpha()
    .escape()
    .withMessage('Enter a valid Name'),
    

    body('email')
    .isEmail()
    .trim()
    .escape()
    .withMessage('Enter a valid Email'),

    body('password')
    .trim()
    .isLength({min: 8})
    .withMessage('Password must be at least 8 characters long'),


    body('confirmPassword').custom((value,{req})=>{
        if(value !== req.body.password){
            
           throw new Error("Password do not match");
               
        }

        return true

    })

]


const loginValidationRules = [
    body('email')
    .isEmail()
    .escape()
    .trim()
    .withMessage('Enter a valid Email')
]


export {validationRule,loginValidationRules}
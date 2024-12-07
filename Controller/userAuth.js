import User from "../model/userModel.js";
import bcrypt from 'bcrypt'
import { validationResult } from "express-validator";
const saltRound = 12;



// SignUp submit. user entered data are came here and validate it then if it is vaild store date to database else it was return the errors

const signupSubmit = async (req, res) => {
    try {

        const err = validationResult(req);

        if (!err.isEmpty()) {

            return res.render('user/signupPage', { error: err.array(), data: req.body });

        }

        const exist = await User.findOne({ email: req.body.email });


        if (exist) {

            return res.render('user/signupPage', { data: {}, exist: "exist" });

        }


        const hashedPassword = await bcrypt.hash(req.body.password, saltRound);
        const userData = new User({ name: req.body.name, email: req.body.email, password: hashedPassword });
        const saved = await userData.save();

        if (saved) {

            return res.render('user/signupPage', { data: {}, success: "success" });

        }


    } catch (error) {

        console.error(`Error occurred ${error}`);
        res.status(500).render('user/signupPage', { data: {}, err: "error" });

    }


}


// user authentiction and giving access to to the user account and home


const loginAuthentication = async (req, res, next) => {


    try {

        const error = validationResult(req)

        if (!error.isEmpty()) {

          return  res.render('user/loginPage',{ error:error.array()[0].msg, data:req.body})

        }

        const user = await User.findOne({email:req.body.email});

        if(user){

         const match = await bcrypt.compare(req.body.password,user.password);
        
           if(match){
                req.session.user_id = user._id
                res.redirect('/home')
             
           }

        }else{

            res.render('user/loginPage',{data:req.body,error2:"No user found please login"});

        }

        

    } catch (error) {

        console.error(`Error occurred ${error}`)
        next(error)

    }



}

export {
    loginAuthentication,
    signupSubmit
}
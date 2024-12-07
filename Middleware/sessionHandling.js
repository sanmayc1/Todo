
//login and signup page session handling 

const loginSession = (req,res,next) =>{

   if(req.session.user_id){

    res.redirect('/home');

   }else{

    next();

   }

}

//

const checkSession = (req,res,next) =>{

    if(req.session.user_id){

        next()

    }else{
        
        res.redirect('/')

    }
}


export {
    loginSession,
    checkSession
}
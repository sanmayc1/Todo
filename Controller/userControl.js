import { name } from "ejs";
import User from "../model/userModel.js";

//  Landing page rendering. This is the first page of the application.

const landingPage = (req,res,next) =>{

    try {
  
        res.render('user/landingPage');
        
    } catch (error) {
        
        console.error(`Error rendering landing page:${error.stack}`);
        next(error);
        
    }
    
}

//  Login page rendering

const loginPageLoad = (req,res,next) =>{

    try {

        res.render('user/loginPage',{data:{}});
        
    } catch (error) {

        console.error(`Error rendering loginPage:${error}`);
        next(error);

    }
   
}

// SignUp page is rendering

const signupPageLoad = (req,res,next) =>{

    try {

        res.render('user/signupPage',{data:{}});

    } catch (error) {

        console.error(`Error rendering signupPage: ${error}`);
        next(error);

    }

    
}

// Home page is rendering

const homePageLoad = async (req,res,next)=>{

    try {
        

        const user = await User.findById({_id:req.session.user_id})
        
        if(req.query.msg){

            return res.render('user/home',{name:user.name , tasks:user.task ,msg:'enter a value'});

        }
       

        res.render('user/home',{name:user.name , tasks:user.task});

    } catch (error) {

        console.error(`Error in home page rendering ${error}`);
        next(error)
        
    }

}

// Session destroy and redirect to landing page

const logout = (req,res,next) =>{
    try {

        req.session.destroy((err) =>{
            if(err){
                throw err
            }
            res.clearCookie('connect.sid')
            res.redirect('/')
        })
        
        
    } catch (error) {

        next(error)

    }
}

//Task add to database

const addTask = async (req,res,next) =>{


    try {

        const task = req.body.task
        
        if(!task.trim()){

           return res.redirect('/home?msg=novalue')

        }

        const user = await User.findById(req.session.user_id)

        const newTask = {
            _id: new Date(),
            tittle:req.body.task
        }

       
        const saved = await User.findByIdAndUpdate({_id:req.session.user_id},{$push:{task:newTask}})

        if(saved){
            res.redirect('/home')
        }

    } catch (error) {

        next(error)
        
    }
    
}

//Delete the task

const deleteTask = async(req,res,next) => {
    try {
       
       const deleted = await User.findByIdAndUpdate(req.session.user_id,{$pull:{task:{_id:req.params.id}}})
    
       if(deleted){

        res.redirect('/home');

       }
        
    } catch (error) {
        
        next(error)

    }
}

//task Completed

const taskComplete = async(req,res,next) =>{
    try {

        const completed = await User.updateOne({_id:req.session.user_id ,'task._id':req.params.id},{$set:{'task.$.complete':1}})

        if(completed){

            res.redirect('/home')

        }
        
        
        
    } catch (error) {

        next(error)
        
    }
}

export {
    landingPage,
    loginPageLoad,
    signupPageLoad,
    homePageLoad,
    logout,
    addTask,
    deleteTask,
    taskComplete
    
    
}
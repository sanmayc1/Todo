import express from 'express'
import dotenv from 'dotenv'
import session from 'express-session'
import mongoose from 'mongoose'
import MongoStore from 'connect-mongo'
import nocache from 'nocache'
import userRouter from './Routes/user.js'
import path from 'path'



dotenv.config()
const app = express()
const PORT = process.env.PORT || 3000

// MongoDb Connecting 
mongoose.connect(process.env.MongoDB_Url)
.then(()=>console.log('MongoDb Connected'))
.catch((err)=>console.log(err));

app.use(nocache())
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.set('view engine','ejs');
app.set('views',path.join(process.cwd(),'views') );
app.use(express.static(path.join(process.cwd(),'public')));


// set up session and data are stored in Databas

app.use(session({
    secret:process.env.Secret_,
    saveUninitialized:false,
    resave:false,
    store:MongoStore.create({
        mongoUrl:process.env.MongoDB_Url             
    }),
    cookie:{ 
        maxAge:1000*60*60,
        httpOnly:true
    }
}));




app.use('/',userRouter)


app.use((req,res,next)=>{
     
   const error = new Error('Page not found')
   error.status = 404
   next(error)
   
})

app.use((err,req,res,next)=>{

    const statusCode = err.status || 500
    res.status(statusCode).render('user/errorHandling',{status:statusCode,message:err.message})
    
})


app.listen(PORT,()=>{
    console.log(`Server is Running on Port ${PORT}`)
})
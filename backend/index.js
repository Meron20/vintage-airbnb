import express from 'express'
import cors from 'cors'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import User from './models/user.js';
import cookieParser from 'cookie-parser';
import dotenv from "dotenv";
dotenv.config();

const app = express();


const bcryptSalt =  bcrypt.genSaltSync(10)
const jwtSecret = 'fasefraw4r5r3wq45wdfgw34twdfg';


app.use(express.json());
app.use(cookieParser());

app.use (
    cors({
    credentials: true,
    origin: ["http://localhost:5173", "http://localhost:5174", "http://127.0.0.1:5173", "http://127.0.0.1:5174"],
}));

console.log(process.env.MONGO_URL)
 
mongoose
.connect(process.env.MONGO_URL)
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err))


app.get('/test', (req,res) => {
    res.json('test ok');
}); 


app.post('/register', async (req,res)=> {
   const { name, email, password } = req.body;

   try{
      const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt)
   });
   res.json(userDoc);
   } catch (error) {
     console.error('Registration error:', error)
     res.status(422).json({ message: error.message });
   }    
})

app.post('/login', async (req,res) => {
    const {email, password} = req.body; 

      const userDoc= await User.findOne({ email })
      
      if(!userDoc){
        return res.status(404).json({ message: "User not found" });
     }
  
      const match = bcrypt.compareSync(password, userDoc.password)
    
    if (!match) {
        return res.status(401).json({ message: "Wrong password" });
      }

      jwt.sign(
        {
            email:userDoc.email,
            id:userDoc._id,
            name:userDoc.name,
         }, 
         jwtSecret, 
         {}, 
         (err,token) => { 
            if(err) throw err;
            res.cookie('token', token).json(userDoc)
         
        });

      })

  app.get('/profile', (req,res) => {
    const {token} = req.cookies;
    if (!token) {
        return res.json(null);
      }
      jwt.verify(token, jwtSecret, {}, async (err, userData) => {
         if (err) throw err;
         const {name, email, _id} = await User.findById(userData.id)
         res.json({name, email, _id})
      });
    })

    app.post('/logout', (req, res) => {
        res.cookie('token', '', {expires: new Date(0) }).json({message: 'Logged out' })
    })
app.listen(4000, () => console.log('Server running on port 4000'));

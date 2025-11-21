import express from 'express'
import cors from 'cors'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import User from './models/user.js';
import cookieParser from 'cookie-parser';
import dotenv from "dotenv";
import imageDownloader from 'image-downloader';
import path from 'path';
import multer from 'multer';
import fs from "fs";
import Booking from './models/Booking.js';

import { fileURLToPath } from 'url';
import Place from './models/place.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



dotenv.config();

const app = express();


const bcryptSalt =  bcrypt.genSaltSync(10)
const jwtSecret = 'fasefraw4r5r3wq45wdfgw34twdfg';

app.use (
    cors({
    credentials: true,
    origin: ["http://localhost:5173", "http://localhost:5174", "http://127.0.0.1:5173", "http://127.0.0.1:5174"],
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "DELETE"],
}));


function getUserDataFromReq(req, res) {
    return new Promise((resolve, reject) => {

    jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData) => {
        if (err) return res.status(401).json({ message: 'Invalid token' })
            resolve(userData)   

   })
 })
}

app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));


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
            if(err) {
                console.error('Jwt sign error', err);
                return res.status(500).json({ message: 'Failed to create token' });
              }

            res.cookie('token', token, {
                httpOnly: true,
                secure: false,
                sameSite: "lax",

            }).json(userDoc);
         
        });

      })

  app.get('/profile', (req,res) => {
    const {token} = req.cookies;
    if (!token) {
        return res.json(null);
      }
      jwt.verify(token, jwtSecret, {}, async (err, userData) => {
         if (err) 
            return res.status(401).json({ message: 'Invalid token'});

         const {name, email, _id} = await User.findById(userData.id)
         res.json({name, email, _id})
      });
    })

    app.post('/logout', (req, res) => {
        res.cookie('token', '', {expires: new Date(0) }).json({message: 'Logged out' })
    })



    app.post ('/upload-by-link', async(req, res) => {
        const { link } = req.body;

        if (!link || typeof link !== 'string' || !link.startsWith('http')) {
            return res.status(400).json({ message: 'Invalid or missing image URL' });
          }
        

        const newName = 'Photo' + Date.now() + '.jpg';

        const uploadsDir = path.join(__dirname, 'uploads');
        if(!fs.existsSync(uploadsDir)) {
            fs.mkdirSync(uploadsDir, { recursive: true})
        }

        const destPath = path.join(uploadsDir, newName);


        try{
         await imageDownloader.image({
            url: link,
            dest: destPath
        });

        res.json(newName)
    } catch (error) {
        console.error('Error downloading image:', error);
        res.status(500).json({ message: 'Failed to download image', error})
      }
    })


    const photosMiddleware = multer({dest:'uploads/'});
    app.post('/upload', photosMiddleware.array('photos', 100), (req, res) => {

        const uploadedFiles =[];

        for( let i = 0; i < req.files.length; i++){
           const {path,originalname} = req.files[i];
           const parts = originalname.split('.');
           const ext = parts[parts.length - 1];
           const newPath = path + '.' + ext;
           fs.renameSync(path, newPath)
           uploadedFiles.push(newPath.replace('uploads/',''))

        }
        res.json(uploadedFiles) 
    });

    app.post('/places', (req,res) => {
        const {token} = req.cookies;
        const {title, address, addedPhotos, description, perks, checkIn, checkOut, maxGuests, price }= req.body;
         
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) 
               return res.status(401).json({ message: 'Invalid token'});
            
       
            try{
                const placeDoc = await Place.create({
                    owner: userData.id,
                    title,
                    address,
                    addedPhotos,
                    description,
                    perks,
                    checkIn,
                    checkOut,
                    maxGuests,
                    price,
                
            });   
            res.json(placeDoc);
        } catch(error) {
            console.error('Error saving place:', error);
            res.status(500).json({ message: 'Failed to save the place'})
         }
        })
    })

    app.get('/user-places',  (req,res) => {
        const {token} = req.cookies;
        if (!token) return res.status(401).json({ message: 'Not authenticated' });

        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if(err) return res.status(401).json({ message: 'Invalid token' })
            const { id } = userData;
            const places = await Place.find({owner:id})
            res.json(places);
        });
    });


    //UPDATE place

    app.put('/places/:id', async (req,res) => {
        const {token} = req.cookies;
        if (!token) return res.status(401).json({ message: 'Not authenticated' });



        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) return res.status(401).json({ message: 'Invalid token' })

                const {id } = req.params;
                const { title, address, addedPhotos, description, 
                     perks, checkIn, checkOut, maxGuests, price
                      } = req.body;

                try {
                    const placeDoc = await Place.findById(id);
                    if(!placeDoc) return res.status(404).json({ message: 'Place not found' });

                    if(userData.id !== placeDoc.owner.toString()){
                        return res.status(403).json({ message: 'Not allowed to edit this place' })

                    }
                    placeDoc.set({
                        title, address, addedPhotos, description, 
                        perks, checkIn, checkOut, maxGuests, price
                    })
                    await placeDoc.save()
                    res.json('placeDoc');

                } catch (error) {
                  console.error ('Error updating place:', error);
                  res.status(500).json({ message: 'Failed to update place '})
                }
        
               
            });     
    })

    app.get('/places', async(req,res) => {
        res.json( await Place.find())
    });


    app.get('/places/search', async (req, res) => {
        const { place, guests } = req.query;
      
        let filters = {};
      
        if (place && place.trim() !== "") {
          filters.title = { $regex: place, $options: "i" };
        }
      
        if (guests) {
          filters.maxGuests = { $gte: guests };
        }
      
        try {
          const results = await Place.find(filters);
          res.json(results);
        } catch (error) {
          console.error("Search error:", error);
          res.status(500).json({ message: "Search failed" });
        }
      });
       // Single Place (GET)

    app.get('/places/:id', async (req,res) => {
        const {id} = req.params;

        try {
            const place = await Place.findById(id);
            if(!place) return res.status(404).json({ message: 'Place not found' })
            res.json(place);

        } catch (err){
            console.error('Get place error', err);
            res.status(500).json({ message: 'Server error' });
        }
    })
    

    app.post('/bookings', async (req, res)=> {

        try {
            const userData = await getUserDataFromReq(req, res)
            const {
            place,checkIn,checkOut,numberOfGuests,name,phone,price,
            } = req.body;

         const bookingDoc = await Booking.create({
                place, checkIn, checkOut, numberOfGuests, name, phone, price,
                user:userData.id,
            })
                res.json (bookingDoc);

        }catch(err) {
            console.error('Booking error:', err);
            res.status(500).json({ message: 'Failed to create booking,', error: err.message})
        }
         
    });

   

    app.get('/bookings', async (req,res) => {
        try {

        const userData = await getUserDataFromReq(req, res);
        res.json(await Booking.find({user:userData.id}).populate('place'));
        userData.id
        }catch (err) {
            console.error('Get bookings error:', err)
            res.status(500).json({ message: 'Failed to fetch bookings' });
        
        }

    })


app.listen(4000, () => console.log('Server running on port 4000'));

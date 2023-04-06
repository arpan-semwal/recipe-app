import express from "express";
import cors from 'cors';
import mongoose from 'mongoose';
import {userRouter} from './routes/users.js'

const app = express();

app.use(express.json());// will create data send from frontend into json
app.use(cors());

app.use("/auth" , userRouter);
mongoose.connect(
    "mongodb+srv://arpansemwal:Noodle123@recipies.0mpszk0.mongodb.net/recipies?retryWrites=true&w=majority",
  
    );


app.listen(3001 , () => console.log("SERVER STARTED")); //Tells api to start

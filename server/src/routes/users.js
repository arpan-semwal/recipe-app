import  express  from "express";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { UserModel } from "../models/Users.js";


const router = express.Router();

router.post("/register" , async(req , res) =>{ //res : to send data who made the reques
    const {username , password} = req.body;

    const user = await UserModel.findOne({username}); // finding user in database through findONE funciton 

    if(user) { //checking if user already exist in database
        return res.json({message : "user already exist"});
    }

    const hashedPassword = await bcrypt.hash(password , 10);

    const newUser = new UserModel({username , password:hashedPassword});// new user created in mongoDB
    await newUser.save(); //saving the new user 
    res.json({message: "User Registered Successfully"})
});

router.post("/login" , async(req  , res) => {
    const {username , password} = req.body;
    const user = await UserModel.findOne({username});

    if(!user){
        return res.json({message: "user does not exit"});
    }
    //comparing password , once the password has been hashed it acannot be unhashed 
    const isPasswordValid = await bcrypt.compare(password , user.password);

    if(!user){
        return res.json({message:"Username or password is not correct"});
    }

    //create token 
    const token = jwt.sign({id: user.id},"secret");
    res.json({token , userID: user._id})



});

export {router as userRouter};

//middleware
export const verifyToken = (req , res , next) => {
    const  token = req.headers.authorization;
    if(token){
        jwt.verify(token , "secret" , (err) => {
            if(err) return res.sendStatus(403);
            next();
        });
    }else{
        res.sendStatus(401);
    }
};
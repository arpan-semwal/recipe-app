import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({ // a schema is object that will define the structure of our data
   //what do we want from user
    username : {
        type: String , required: true , unique: true
    },
    password:{
        type:String , required:true
    },

    savedRecipes:[{
        type:mongoose.Schema.Types.ObjectId , ref:"recipes"
    }]
});

export const UserModel = mongoose.model("users" , UserSchema)

























//A Mongoose model is a wrapper of the Mongoose schema. A Mongoose schema defines the document's properties, default values, types of data, validators, etc. In contrast, a Mongoose model provides an interface for the database to create, query, update, delete records, and so on
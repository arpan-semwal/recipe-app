import express from 'express';      
import{RecipeModel} from "../models/Recipes.js";
import { UserModel } from '../models/Users.js';


const router = express.Router();

//createRecipe
router.get("/" , async(req , res) => {
    try{

        const response = await RecipeModel.find({});
        res.json(response);

    }catch(err){
        console.log(err);
    }
});


router.post("/" , async(req , res) => {

    const recipe = new RecipeModel(req.body);
        
    try{

        const response = await recipe.save();
        res.json(response);

    }catch(err){
        console.log(err);
    }
});

//save Recipe
router.put("/" , async(req , res) => {       
    try{
        const recipe = await RecipeModel.findById(req.body.recipeID);
        const user = await UserModel.findById(req.body.userID);
        user.savedRecipes.push(recipe);
        await user.save();
        res.json({savedRecipes: user.savedRecipes});

    }catch(err){
        console.log(err);
    }
});

//to get saved recipes with id to front end
router.get("/savedRecipes/ids" , async(req , res) => {
    try{
        const user = await UserModel.findById(req.body.userID);
        res.json({savedRecipes: user?.savedRecipes})
    }catch(err){
        res.json(err);
    }
});

router.get("/savedRecipes" , async(req , res) => {
    try{
        const savedRecipes = await RecipeModel.find({ // to grap savedRecipes where id is inside 
            _id: {$in : user.savedRecipes},
        })
        const user = await UserModel.findById(req.body.userID);
        res.json({savedRecipes: user?.savedRecipes})
    }catch(err){

    }
})

export{router as recipesRouter}



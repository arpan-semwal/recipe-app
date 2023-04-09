import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios';
import { useGetUserId } from '../hooks/useGetUserId';
import{ useCookies} from "react-cookie";


export default function Home() {
  const [recipes , setRecipes] = useState([]);
  const [savedRecipes , setSavedRecipes] = useState([]);
  const [cookies ] = useCookies(["access_token"]);



  const userID = useGetUserId();
    useEffect(() => {
      const fetchRecipe = async() => {
        try{
          const response = await axios.get("http://localhost:3001/recipes");
          setRecipes(response.data);
        }catch(err){
        console.log("clicked");
      }

      };
      const fetchSavedRecipe = async() => {
        try{
          const response = await axios.get(`http://localhost:3001/recipes/savedRecipes/ids${userID}`,) 
        
          setSavedRecipes(response.data.savedRecipes);

        
        }catch(err){
        console.log("clicked");
      }

      };
      fetchRecipe();
      fetchSavedRecipe();

    })


    const saveRecipe = async(recipeID) => {
      try{
          const response = await axios.put("http://localhost:3001/recipes" , {
           userID, 
           recipeID
          } );
        setSavedRecipes(response.data.savedRecipes);
      }catch(err){
        console.log("hello");
      }
    };


    const isRecipeSaved = (id) =>  savedRecipes && savedRecipes.includes(id);



    return(
      <div>
        <h2>Recipes</h2>
        <ul>
         {recipes.map((recipe) => {
          return(
            <li key={recipe._id}>
            
            <div>
              <h2>{recipe.name}</h2>
            </div>
            <button onClick={() => saveRecipe(recipe._id)}
            disabled={isRecipeSaved(recipe._id)}
            >
              {isRecipeSaved(recipe._id) ? "Saved": "Save"}
            </button>
            <div className='instruction'>
              <p>{recipe.instruction}</p>
            </div>
            <img src={recipe.imageUrl} alt={recipe.sname}/>
            <p>Cooking Time : {recipe.cookingTime}</p>
          </li>
          );
      

         })}
        </ul>
      </div>
    );

}

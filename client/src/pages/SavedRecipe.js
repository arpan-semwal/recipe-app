import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios';
import { useGetUserId } from '../hooks/useGetUserId';



export default function SavedRecipes() {
  const [savedRecipes , setSavedRecipes] = useState([]);
 
  const userID = useGetUserId();
    useEffect(() => {
     
      const fetchSavedRecipe = async() => {
        try{
          const response = await axios.get(`http://localhost:3001/recipes/savedRecipes/${userID}`,) 
        
          setSavedRecipes(response.data.savedRecipes);
        
        }catch(err){
        console.log("clicked");
      }

      };
     
      fetchSavedRecipe();

    })


    return(
      <div>
        <h2>Saved Recipes</h2>
        <ul>
         {
         savedRecipes?.map((recipe) => {
          return(
            <li key={recipe._id}>
            
            <div>
              <h2>{recipe.name}</h2>
            </div>
            <div className='instruction'>
              <p>{recipe.instruction}</p>
            </div>
            <img src={recipe.imageUrl} alt={recipe.name}/>
            <p>Cooking Time : {recipe.cookingTime}</p>
          </li>
          );
      

         })}
        </ul>
      </div>
    );

}

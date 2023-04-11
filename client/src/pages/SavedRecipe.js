import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios';
import { useGetUserId } from '../hooks/useGetUserId';
import './SavedRecipe.css'


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
    
      <div className='back'>
        <h1>Saved Recipes</h1>
        <ul>
         {
         savedRecipes?.map((recipe) => {
          return(
            <li key={recipe._id}>
            <div className='container'>
              <div>            
            <div className='center'>
              <h2>{recipe.name}</h2>
            </div>
            <div className='instruction'>
              <p>{recipe.instruction}</p>
            </div>
               
            <img className='image' src={recipe.imageUrl} alt={recipe.name}/>
            <p>Cooking Time : {recipe.cookingTime}</p>
            </div>
            </div>
          </li>
          );
      

         })}
        </ul>
      </div>
      
    );

}

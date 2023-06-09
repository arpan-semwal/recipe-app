import React, { useState } from 'react'
import axios from 'axios';
import {useGetUserId} from '../hooks/useGetUserId'
import{useNavigate} from 'react-router-dom';
import { useCookies } from 'react-cookie';
import "./CreateRecipe.css"
export default function CreateRecipe() {

  const userID = useGetUserId();
  const [cookies, ] = useCookies(["access_token"]);
  const [recipe , setRecipe] = useState({
    name:"",
    ingredients:[],
    instruction:"",
    imageUrl:"",
    cookingTime:0,
    userOwner:userID,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {

    const {name , value} = e.target;
    setRecipe({...recipe , [name]:value});

  }

  const handleIngredientChange = (e , idx) => {

    const {value} = e.target;
    const ingredients = recipe.ingredients;
    ingredients[idx] = value
    setRecipe({...recipe , ingredients });
    

  }

  const addIngredients = () => {
    setRecipe({...recipe , ingredients:[...recipe.ingredients , ""]})
    //.., everything is as before
  };


  const onSubmit = async(e) => {
    e.preventDefault();
   
    try{
      await axios.post("http://localhost:3001/recipes" , recipe,{
        headers:{authorization: cookies.access_token}

      });
      navigate("/");
      alert("created recipe");
    }catch(err){
    console.log("clicked");
  }
}

  

  return (
    <div className='create-recipe'>
      <h1>CREATE RECIPE</h1>

      <form onSubmit={onSubmit} >
        <label htmlFor='name'>Name</label>
        <input type='text' id="name" name='name' onChange={handleChange}/>
        <label htmlFor='ingredients'>Ingredients</label>

        {recipe.ingredients.map((ingredient , idx) => (
          <input 
          key={idx} 
          type='text' 
          name='ingredients' 
          value={ingredient}
          onChange={(e) => {
            handleIngredientChange(e ,idx);
          }}
          />
        ))}




       <button onClick={addIngredients} type='button'>Add Ingredients</button>
       

        <label htmlFor='instructions'>Instructions</label>
        <textarea 
        id='instructions'
        name='instructions'
        onChange={handleChange}
         
         ></textarea>
        <label htmlFor='imageUrl'>Image URL</label>
        <input
         type='text'
         id="imageUrl"
        name='imageUrl'
        onChange={handleChange}
        />
        <label htmlFor='cookingTime'>Cooking Time </label>
        <input type='number' 
        id="cookingTime"
        name='cookingTime' 
        onChange={handleChange}/>

        <button  type='submit'>CreateRecipe</button>
      </form>
    </div>
  )
}

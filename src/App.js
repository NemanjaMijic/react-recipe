import React,{useEffect, useState} from 'react';
import './App.css';
import Recipe from './Recipe';

const App = () =>{

  const APP_ID = '9038e56e';
  const APP_KEY = '6771f69c3f415d8efa06898322ce6fd7';

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState('chicken');


  useEffect( () => {
    getRecipes();
  },[query])

  const getRecipes = async () =>{
    const response = await fetch(`http://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    console.log(data.hits);
    setRecipes(data.hits);
  }

  const updateSearch = (e) => {
    setSearch(e.target.value);
  }

  const getSearch = (e) => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  }

  return(
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input type="text" className="search-bar" value={search} onChange={updateSearch}/>
        <button type="submit" className="search-button">Search</button>
      </form>
      <div className="recipes">
        {recipes.map( recipe => (
          <Recipe 
            key={Math.random()*1000} 
            title={recipe.recipe.label} 
            calories={recipe.recipe.calories} 
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}>
          </Recipe>
        ))}
      </div>
    </div>
  );
}

export default App;

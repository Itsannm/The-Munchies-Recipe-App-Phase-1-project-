// client.js (Client-side code)

// Select the elements using DOM methods
const searchBtn = document.getElementById('search-btn');
const searchInput = document.querySelector('input[type="text"]');
const recipeContainer = document.getElementById('recipe-container');

// Add event listener to search button
searchBtn.addEventListener('click', searchRecipes);

// Function to search for recipes
function searchRecipes() {
  const userInput = searchInput.value;
  const apiKey = 'd40b55e0b55f4099b859b04b2533d17a';
  const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${userInput}`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      displayRecipes(data.results);
    })
    .catch(error => {
      console.log('Error:', error);
    });
}

// Function to display the recipe results on the page
function displayRecipes(recipes) {
  recipeContainer.innerHTML = '';

  recipes.forEach(recipe => {
    const recipeCard = document.createElement('div');
    recipeCard.classList.add('recipe-card');
    recipeCard.innerHTML = `
      <img src="${recipe.image}" alt="${recipe.title}" />
      <h3>${recipe.title}</h3>
    `;

    recipeCard.addEventListener('click', () => {
      showRecipeDetails(recipe.id);
    });

    recipeContainer.appendChild(recipeCard);
  });
}

// Function to show recipe details
function showRecipeDetails(recipeId) {
  const apiKey = 'd40b55e0b55f4099b859b04b2533d17a';
  const apiUrl = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      // Display recipe details
      console.log(data);
    })
    .catch(error => {
      console.log('Error:', error);
    });
}

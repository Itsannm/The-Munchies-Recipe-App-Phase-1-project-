// Get references to HTML elements
const searchBtn = document.getElementById('search-btn');
const searchInput = document.querySelector('input[type="text"]');
const recipeContainer = document.getElementById('recipe-container');

// Add event listener to search button
searchBtn.addEventListener('click', searchRecipes);

// Function to search for recipes
function searchRecipes() {
  // Get user input from the search input field
  const userInput = searchInput.value;

  // Construct the API URL with the user input
  const apiKey = 'd40b55e0b55f4099b859b04b2533d17a';
  const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${userInput}`;

  // Fetch data from the API
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      // Process the API response and display the results on the page
      displayRecipes(data.results);
    })
    .catch(error => {
      console.log('Error:', error);
    });
}

// Function to display the recipe results on the page
function displayRecipes(recipes) {
  // Clear previous results
  recipeContainer.innerHTML = '';

  // Loop through the recipes and create HTML elements for each recipe
  recipes.forEach(recipe => {
    const recipeCard = document.createElement('div');
    recipeCard.classList.add('recipe-card');
    recipeCard.innerHTML = `
      <img src="${recipe.image}" alt="${recipe.title}" />
      <h3>${recipe.title}</h3>
    `;
    recipeContainer.appendChild(recipeCard);
  });
}


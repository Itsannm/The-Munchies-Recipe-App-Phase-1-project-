const searchBtn = document.getElementById('search-btn');
const searchInput = document.querySelector('input[type="text"]');
const recipeContainer = document.getElementById('recipe-container');
const perPage = 3; // Number of recipes to display per page
let currentPage = 1; // Current page of results

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
      const startIndex = (currentPage - 1) * perPage;
      const endIndex = startIndex + perPage;
      const recipes = data.results.slice(startIndex, endIndex);
      displayRecipes(recipes);
    })
    .catch(error => {
      console.log('Error:', error);
    });
}

// Function to display the recipe results on the page
function displayRecipes(recipes) {
  // Clear previous results
  recipeContainer.innerHTML = '';

  // Loop through the recipes for the current page
  for (let i = 0; i < recipes.length; i++) {
    // Create a recipe card element
    const recipeCard = document.createElement('div');
    recipeCard.classList.add('recipe-card');
    recipeCard.innerHTML = `
      <img src="${recipes[i].image}" alt="${recipes[i].title}" />
      <h3>${recipes[i].title}</h3>
    `;

    // Add event listener to each recipe card
    recipeCard.addEventListener('click', () => {
      showRecipeDetails(recipes[i].id);
    });

    recipeContainer.appendChild(recipeCard);
  }
}

// Function to show recipe details
function showRecipeDetails(recipeId) {
  // Construct the API URL for the recipe details
  const apiKey = 'd40b55e0b55f4099b859b04b2533d17a';
  const apiUrl = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`;

  // Fetch recipe details from the API
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      // Create recipe details elements
      const recipeImage = document.createElement('img');
      recipeImage.src = data.image;
      recipeImage.alt = data.title;

      const recipeTitle = document.createElement('h3');
      recipeTitle.textContent = data.title;

      const recipeDetails = document.createElement('div');
      recipeDetails.innerHTML = `
        <h4>Ready in ${data.readyInMinutes} minutes</h4>
        <p>Servings: ${data.servings}</p>
        <p>${data.summary}</p>
      `;

      // Clear previous recipe details
      recipeContainer.innerHTML = '';

      // Append recipe details to recipe container
      recipeContainer.appendChild(recipeImage);
      recipeContainer.appendChild(recipeTitle);
      recipeContainer.appendChild(recipeDetails);
    })
    .catch(error => {
      console.log('Error:', error);
    });
}

// Function to handle pagination navigation
function goToPage(page) {
  currentPage = page;
  searchRecipes
}
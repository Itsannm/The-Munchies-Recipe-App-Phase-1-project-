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
          <h4>Ingredients:</h4>
          <ul>
            ${data.extendedIngredients.map(ingredient => `<li>${ingredient.original}</li>`).join('')}
          </ul>
          <h4>Method:</h4>
          <ol>
            ${data.analyzedInstructions[0].steps.map(step => `<li>${step.step}</li>`).join('')}
          </ol>
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
  
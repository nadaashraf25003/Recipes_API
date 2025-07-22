let select_category = document.getElementById("select_category");
let searchName = document.getElementById("searchName");
let searchBtn = document.getElementById("searchBtn");
let recipesContainer = document.getElementById("recipesContainer");
let recipeDetails = document.getElementById("recipeDetails");
let recipeDetailsCard = document.querySelector(".card");
let close_btn_details = document.querySelector("#close_btn_details");
let mealsCount = document.getElementById("mealsCount");
let favorites = document.getElementById("favorites");
let section_title = document.querySelector(".section-title");
let main_title = document.querySelector("main .title");
let Fav_btn = document.getElementById("Fav_btn");
let fav_btn_count = document.getElementById("fav_btn-count");
let Click_fav = document.getElementById("Click_fav");

// List all meal categories
async function getCategories() {
  let response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/categories.php"
  );
  let data = await response.json();
  //   console.log(data);
  let categories = data.categories;
  categories.forEach((category) => {
    let option = document.createElement("option");
    option.value = category.strCategory;
    option.textContent = category.strCategory;
    select_category.appendChild(option);
  });
  fav_btn_count.innerHTML = localStorage.length;
}

// Search meal by name
async function searchMealbyName(searchValue) {
  //   let searchValue = searchName.value;
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`
  );
  let data = await response.json();
  let meals = data.meals;
  console.log(meals);
  if (meals) {
    favorites.innerHTML = "";
    // recipeDetailsByName.innerHTML = "";
    recipesContainer.innerHTML = "";
    recipeDetails.innerHTML = "";
    mealsCount.textContent = "";
    mealsCount.innerHTML = meals.length;
    section_title.innerHTML = "";
    section_title.innerHTML = `${searchValue} Meal`;

    meals.forEach((meal) => {
      let div = document.createElement("div");
      div.innerHTML = `
        <div class="card">
          <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
          <button id="Click_fav"><i class="fa-solid fa-heart"></i></button>
          <div class="card-body">
            <h5 class="card-title">${meal.strMeal}</h5>
            <button onclick="getRecipeDetails('${meal.idMeal}')">View Details</button>
            <button id="Click_fav" onclick="addTofavoritesLocalStorage('${meal.idMeal}')"><i class="fa-solid fa-heart"></i></button>
          </div>
        </div>
            `;
      recipesContainer.appendChild(div);
    });
  } else {
    recipesContainer.innerHTML = "";
    recipeDetails.innerHTML = "";
    section_title.innerHTML = "Nothing from ";
    mealsCount.textContent = 0;
    recipesContainer.innerHTML = `<h3 class="card-error">Your Search did not return any results</h3>`;
  }
}

// search meal by first letter
async function searchMealbyFirstLetter(searchValue) {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${searchValue}`
  );
  let data = await response.json();
  let meals = data.meals;
  console.log(meals);
  if (meals) {
    favorites.innerHTML = "";
    // recipeDetailsByName.innerHTML = "";
    recipesContainer.innerHTML = "";
    recipeDetails.innerHTML = "";
    mealsCount.textContent = "";
    mealsCount.innerHTML = meals.length;
    section_title.innerHTML = "";
    section_title.innerHTML = `All Meals that Start with '${searchValue}'`;
    meals.forEach((meal) => {
      let div = document.createElement("div");
      div.innerHTML = `
        <div class="card">
          <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
          <i class="fa-solid fa-heart"  id="Click_fav"></i>
          <div class="card-body">
            <h5 class="card-title">${meal.strMeal}</h5>
            <button onclick="getRecipeDetails('${meal.idMeal}')">Details</button>
            <button id="Click_fav" onclick="addTofavoritesLocalStorage('${meal.idMeal}')"><i class="fa-solid fa-heart"></i></button>
          </div>
        </div>
      `;
      recipesContainer.appendChild(div);
    });
  } else {
    recipesContainer.innerHTML = "";
    recipeDetails.innerHTML = "";
    section_title.innerHTML = "Nothing from ";
    mealsCount.textContent = 0;
    recipesContainer.innerHTML = `<h3 class="card-error">Your Search did not return any results</h3>`;
  }
}

// Get recipes by selected category
async function getRecipes(selectedValue) {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedValue}`
  );
  let data = await response.json();
  let recipes = data.meals;
  console.log(data);
  if (recipes) {
    favorites.innerHTML = "";
    recipesContainer.innerHTML = "";
    recipeDetails.innerHTML = "";
    mealsCount.textContent = "";
    mealsCount.innerHTML = recipes.length;
    section_title.innerHTML = "";
    section_title.innerHTML = `${selectedValue} Category`;
    console.log(recipes);
    // recipeDetailsByName.innerHTML = "";
    recipes.forEach((recipe) => {
      let recipeCard = document.createElement("div");
      // recipeCard.classList.add("recipe-card");
      recipeCard.innerHTML = `
    <div class="card">
      <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}">
      <div class="card-body">
        <h5 class="card-title">${recipe.strMeal}</h5>
        <button onclick="getRecipeDetails('${recipe.idMeal}')">View Details</button>
        <button id="Click_fav" onclick="addTofavoritesLocalStorage('${recipe.idMeal}')"><i class="fa-solid fa-heart"></i></button>
      </div>
    </div>`;
      recipesContainer.appendChild(recipeCard);
    });
  } else {
    recipesContainer.innerHTML = "";
    recipeDetails.innerHTML = "";
    section_title.innerHTML = "Nothing from ";
    mealsCount.textContent = 0;
    recipesContainer.innerHTML = `<h3 class="card-error">Your Search did not return any results</h3>`;
  }
}

// Lookup full meal details by id
async function getRecipeDetails(id) {
  let response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  let data = await response.json();
  let recipe = data.meals[0];
  console.log(recipe);
  if (recipe) {
    recipeDetails.classList.add("active");
    // favorites.innerHTML = "";
    // recipesContainer.innerHTML = "";
    // recipeDetails.innerHTML = "";
    // section_title.innerHTML = "";
    // mealsCount.textContent = 1;
    // section_title.innerHTML = `${recipe.strMeal} Meal`;
    // recipeDetailsByName.innerHTML = "";
    // Extract ingredients and measurements
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      if (
        recipe[`strIngredient${i}`] &&
        recipe[`strIngredient${i}`].trim() !== ""
      ) {
        ingredients.push({
          ingredient: recipe[`strIngredient${i}`],
          measure: recipe[`strMeasure${i}`],
        });
      }
    }

    recipeDetails.innerHTML = `
      <div class="card">
        <div class="sec">
          <button id="close_btn_details"><i class="fa-solid fa-circle-xmark"></i></button>
          <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}">
          <div>
            <p>The Name of "${recipe.idMeal}": <span>${recipe.strMeal}</span></p>
            <p>Area: <span>${recipe.strArea}</span></p>
            <p>Category <span>${recipe.strCategory}</span> </p>
            <button><a href="${
              recipe.strYoutube
            }" target="_blank" ><i class="fa-brands fa-youtube"></i> Watch on YouTube</a></button>
            <button><a href="${
              recipe.strYoutube
            }" target="_blank" >The Source</a></button>
          </div>
        </div>
        <div class="sec">
          <div class="ingredients">
            <h3 class="sub-title">Ingredients: </h3>
            <ul class="ingredient-list">
                ${ingredients
                  .map(
                    (item) => `
                    <li>
                        <span>${item.ingredient}:</span>
                        <span>${item.measure}</span>
                    </li>
                `
                  )
                  .join("")}
            </ul>
          </div>
          <div class="instruction">
            <h3 class="sub-title">Instructions:</h3>
            <p class="instructions">${recipe.strInstructions}</p>        
          </div>
        </div>
      </div>    
    `;
  } else {
     recipesContainer.innerHTML = "";
    recipeDetails.innerHTML = "";
    section_title.innerHTML = "Nothing from ";
    mealsCount.textContent = 0;
    recipesContainer.innerHTML = `<h3 class="card-error">Your Search did not return any results</h3>`;
  }
}

// Trigger recipes loading when a new category is selected
select_category.addEventListener("change", function () {
  let selectedValue = select_category.value;
  getRecipes(selectedValue);
});

// Search for meals by name and first letter
searchBtn.addEventListener("click", function () {
  let searchValue = searchName.value;
  if (searchValue.length === 1) {
    console.log("Search value:", searchValue);
    searchMealbyFirstLetter(searchValue);
    console.log("object");
  } else {
    searchMealbyName(searchValue);
  }
});

// Initial call to laod recipes in select category
getCategories();

function addToFavoritePage() {
  console.log("object");
  recipesContainer.innerHTML = "";
  recipeDetails.innerHTML = "";
  section_title.innerHTML = "";
  favorites.innerHTML = "";
  fav_btn_count.innerHTML = localStorage.length;
  mealsCount.textContent = localStorage.length;
  section_title.innerHTML = `Your Favourite Meals`;
  if (localStorage.length === 0) {
    recipeDetails.innerHTML = `<h3 class="card-error">You have not added any meals to your favourites</h3>`;
  } else {
    for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i);
      let meal = JSON.parse(localStorage.getItem(key));
      let recipeCard = document.createElement("div");
      recipeCard.innerHTML = `
      <div class="card">
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
        <div class="card-body">
          <h5  class="card-title">${meal.strMeal}</h5>
          <button onclick="getRecipeDetails('${meal.idMeal}')">View Details</button>
          <button onclick="removeFromFav('${meal.idMeal}')">Remove from Fav</button>
        </div>
      </div>
    `;
      favorites.appendChild(recipeCard);
    }
  }
}
 localStorage.clear();

async function addTofavoritesLocalStorage(mealId) {
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
  );
  const data = await response.json();
  const meal = data.meals[0];

  // Save full object in localStorage using ID as key
  localStorage.setItem(mealId, JSON.stringify(meal));
  alert(`${meal.strMeal} has been added to your favorites!`);
  fav_btn_count.innerHTML = localStorage.length; // Update the count
}

// to remove from fav
function removeFromFav(mealId) {
  localStorage.removeItem(mealId);
  alert("Removed from favorites.");
  addToFavoritePage();
}



// for close recipe details page
recipeDetails.addEventListener("click", function () {
  recipeDetails.classList.toggle("active");
});
// recipeDetails.addEventListener("click", function (e) {
//   const isCard = e.target.closest(".card");
//   if (isCard) {
//     e.stopPropagation(); // Don't bubble up if inside .card
//   }
// });
// recipeDetailsCard.addEventListener("click", function (e) {
//   e.stopPropagation(); // Don't bubble up if inside .card
// })

// close_btn_details.addEventListener("click", function () {
//   recipeDetails.classList.toggle("active");
// })

const api = require("./API.js");
var readlineSync = require("readline-sync");

// console.log(api.read("bread"));

function getAllNames() {
  return api.readDb().map((recipe) => recipe.name);
}

function reviewAvg(reviewArray) {
  reviewArray.reduce((acc, currentValue, idx, entireArray) => {
    return acc + currentValue;
  }, 0) / reviewArray.length;

  return result.toFixed(2);
}

function recipeDetails(recipeObj) {
  console.log("--YOUR RECIPE--");
  console.log(`Name: ${recipeObj.name}`);
  console.log(`Ingredients: ${recipeObj.ingredients}`);
  if (recipeObj.review) {
    console.log("No reviews yet!");
  } else {
    console.log(`Review: ${reviewAvg(recipeObj.reviews)} stars`);
  }
}

function mainMenu() {
  console.log("----------------");
  console.log("1. View All Recipes");
  console.log("2. Review Recipe");
  console.log("3. Add Recipe");
  console.log("4. Exit");
  console.log("----------------");

  const userSelection = readlineSync.question("Please select your option ");
  console.log("userSelection ->", userSelection);

  if (userSelection === "1") {
    console.log("----------------");
    console.log("-*OUR RECIPES*-");
    var recipeNames = getAllNames();
    console.log("----------------");

    recipeIndex = readlineSync.keyInSelect(
      recipeNames,
      "Please select a recipe "
    );

    if (recipeIndex === -1) {
      mainMenu();
    }

    var recipeName = recipeNames[recipeIndex];

    let recipeObj = api.read(recipeName);

    recipeDetails(recipeObj);

    mainMenu();
  }

  if (userSelection === "2") {
    var recipeNames = getAllNames();
    recipeIndex = readlineSync.keyInSelect(
      recipeNames,
      "Please select a recipe "
    );
    if (recipeIndex === -1) {
      mainMenu();
    }
    var recipeName = recipeNames[recipeIndex];
    recipeReview = readlineSync.keyInSelect(
      [1, 2, 3, 4, 5],
      "Select nr of stars for your review"
    );

    recipeReview += 1;
    api.addReview(recipeName, recipeReview);

    let recipeObj = api.read(recipeName);
    recipeDetails(recipeObj);
    mainMenu();
  }

  if (userSelection === "3") {
    console.log("-----------------------------------------");
    console.log("-*ENTER YOUR RECIPE NAME AND INGREDIENTS*-");
    console.log("------------------------------------------");

    var newRecipeName = readlineSync.question("Please enter recipe name ");

    var newRecipeIngredients = readlineSync.question(
      "Please enter list of ingredients "
    );
    console.log("Your recipe name is " + newRecipeName.toUpperCase());
    console.log(
      "Your recipe ingredients are " + newRecipeIngredients.toUpperCase()
    );

    var newRecipeObj = {
      name: newRecipeName,
      ingredients: newRecipeIngredients.split(" "),
      reviews: [],
    };

    api.update(newRecipeObj);
    let recipeObj = newRecipeObj;
    api.read(recipeObj);
    recipeDetails(recipeObj);
    mainMenu();
  }

  if (
    !userSelection === "1" ||
    !userSelection === "2" ||
    !userSelection === "3" ||
    !userSelection === "4"
  ) {
    console.log("-*SORRY, TRY AGAIN.");
    console.log("Please select one of the options below: ");
    mainMenu();
  } else userSelection === "4";
  console.log("---*THANK YOU, SEE YOU AGAIN SOON*---");
}

mainMenu();

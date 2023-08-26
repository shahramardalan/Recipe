

function formatRecipe(rawData) {
  const { strArea, strCategory, strInstructions, idMeal, strMeal, strTags } =
    rawData;

  const ingredients = [];
  for (let i = 1; i <= 20; i += 1) {
    const ing = rawData[`strIngredient${i}`];
    if (ing) {
      const o = {
        ing,
      };

      const measure = rawData[`strMeasure${i}`];
      if (measure) {
        o.measure = measure;
      }
      ingredients.push(o);
    }
  }

  return {
    id: idMeal,
    name: strMeal,
    instructions: strInstructions,
    area: strArea,
    category: strCategory,
    tags: strTags ? strTags.split(",") : [],
    ingredients,
  };
}

function render(meal) {
  const parent = document.querySelector("#food");
  const template = `<h2 class="title">${meal.name}</h2>
  <p class="cat">
    ${meal.category}
  </p>
  <p class="area">
    ${meal.area}
  </p>
  <ul class="tags">
    ${meal.tags
      .map(function (tag) {
        return `<li>${tag}</li>`;
      })
      .join("\n")}
  </ul>
  <hr>
  <p class="ins">
      ${meal.instructions}
  </p>
  <hr>
  <ol class="ing">
      ${meal.ingredients
        .map(function (ingObject) {
          return `<li>${ingObject.ing} - ${ingObject.measure}</li>`;
        })
        .join("\n")}
  </ol>
  `;
  parent.innerHTML = template;
}

function getRandomRecipe(){
  return new Promise((resolve, reject) => {
    axios.get("https://www.themealdb.com/api/json/v1/1/random.php")
      .then(response => {
        const formattedData = formatRecipe(response.data.meals[0])
        resolve(formattedData).catch(error => {
          reject(error)
        })
      })
  })
}

function getRandomRecipe1(){
  axios.get("https://www.themealdb.com/api/json/v1/1/random.php")
    .then(response => {
      const formattedData = formatRecipe(response.data.meals[0])
      render(formattedData)
    })
}

getRandomRecipe()
  .then(response => {
    render(response)
  })
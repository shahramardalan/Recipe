import axios from "axios";

axios.get("https://www.themealdb.com/api/json/v1/1/random.php")
    .then(res => {
        console.log(res.data.meals[0].strIngredient1)
    })
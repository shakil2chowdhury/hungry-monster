//function for getting response of data from themealdb
const search = () => {
    document.getElementById('results').innerHTML = null;
    const searchQuery = document.getElementById('searchQuery').value;
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`)
        .then(res => res.json())
        .then(datas => resultChecker(datas))
}


//checking the response of themealdb
const resultChecker = datas => {
    if (datas.meals == null) {
        document.getElementById('notFound').style.display = 'block';
    } else {
        mealList(datas);
    }
}

//Displaying MealList Function
const mealList = datas => {
    document.getElementById('notFound').style.display = 'none';

    const results = document.getElementById('results');
    datas.meals.forEach(meal => {
        const result = document.createElement('div');
        result.id = 'detail';
        result.className = 'result';
        const mealResult = `
        <div onclick="meal(${meal.idMeal})">
        <img src="${meal.strMealThumb}">
        <p>${meal.strMeal}</p>
        </div>
        `;

        result.innerHTML = mealResult;
        results.append(result);
    });
}


//function for fetching meal Details
const meal = mealId => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
        .then(res => res.json())
        .then(datas => mealDetail(datas.meals[0]))
}


//displaying meal details
const mealDetail = meal => {

    //merging ingredients with measurements
    const ingredMeasure = [];
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredMeasure[i] = meal[`strMeasure${i}`] + ' ' + meal[`strIngredient${i}`];
            console.log(ingredMeasure[i]);
        } else {
            break;
        }
    }

    //displaying ingredients with measurements
    const detailMeal = `
    <img src="${meal.strMealThumb}">
    <h1>${meal.strMeal}</h1>
    <h3>Ingredients</h3>
    <ul>
    ${ingredMeasure.map(ingred => `<li>${ingred}</li>`).join('')}
    </ul>
    `;

    const mealDetails = document.getElementById('mealDetails');
    mealDetails.innerHTML = detailMeal;

    document.getElementById('searchList').style.display = 'none';
}
const button = document.getElementById('search-button');
const mealHolder = document.getElementById('foods');
const resultHolder = document.getElementById('show-result');
const errorMessage = document.getElementById('error-message');

button.addEventListener('click', (event) => {
    event.preventDefault();
    const userInput = document.getElementById('input-search').value;
    loadInfo(userInput);
});

function loadInfo(userInput) {
    let url = "";
    mealHolder.innerHTML = null;
    resultHolder.innerHTML = null;
    if (userInput.length === 1) {
        url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${userInput}`;

    } else {
        url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${userInput}`;
    }
    fetch(url)
        .then(res => res.json())
        .then(data => {
            displayData(data)
        })
        .catch(error => {
            errorMessage.style.display = 'block';
        })
}

const displayData = data => {
    data.meals.forEach(element => {
        const div = document.createElement('div');
        const mealIntro = `
        <div class="col">
            <div class="card h-100">
                <img class="card-img-top" src="${element.strMealThumb}" onclick="displayMealDetails('${element.strMeal}')"/>
                <div class="card-body" onclick="displayMealDetails('${element.strMeal}')">
                    <h4 class="card-title mx-auto">${element.strMeal}</h4>
                </div>
            </div>
        </div> `;
        div.innerHTML = mealIntro;
        mealHolder.appendChild(div);
    });
}

const displayMealDetails = (string) => {
    url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${string}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            resultHolder.style.display = "block"
            const div = document.createElement('div');

            let element;
            let mealInfo;
            for (let i = 0; i < data.meals.length; i++) {
                element = data.meals[i];
                if (string === element.strMeal) {
                    mealInfo = `
                    <img src="${element.strMealThumb}" class="card-img-top">
                    <div class="card-body">
                    <h2 class="card-title">${element.strMeal}</h2>
                    <h6>Ingredients:</h6>
                    <ul>                    
                        <li>${element.strIngredient1}</li>
                        <li>${element.strIngredient2}</li>
                        <li>${element.strIngredient3}</li>
                        <li>${element.strIngredient4}</li>
                        <li>${element.strIngredient5}</li>
                        <li>${element.strIngredient6}</li>
                        <li>${element.strIngredient7}</li>
                        <li>${element.strIngredient8}</li>
                        <li>${element.strIngredient9}</li>
                    </ul>
                    </div> `;
                }
            }
            div.innerHTML = mealInfo;
            resultHolder.appendChild(div);
        });
    resultHolder.innerHTML = null;
}
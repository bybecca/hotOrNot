//JavaScript Document

// 1. Get input value from user 
// 2. Make an API call 
// 3. With user input
// 4. Spit data back out on page


// This is my api key 

const app = {};
app.key = "950505b3a829b24ccf5ebf4fe5f99991";


// This is an initalize function for our app 
app.init = () => {
    console.log("App Initialized...");

    // Listen for form submit
    $('form').on('submit', function (event) {
        event.preventDefault();

        // This line allows us empty out results container with each search
        $(`.results`).empty();

        // console.log("form submitted...");

        // this line allows us get input value from user 
        const userInput = $(`input[type="text"]`).val()

        // console.log(userInput);
        app.getWeather(userInput);
    });
}

// Document Ready | stuff you want to happen on page load 
$(() => {
    // console.log("Document ready...");
    app.init();
});

// We want to create a method using a function | .then allows us to get the following information
app.getWeather = (city) => {
    console.log("Getting Weather...")
    console.log("Query in getWeather", city);
    $.ajax({
        url: `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${app.key}`,
        method: "GET",
        dataType: "json",
        data: {
            api_key: app.key,
            q: city
        }
    }).then(res => {
        console.log("result of getWeather", res);
        // console.log("result of getWeather", res.main.temp);
        const weatherObject = res;

        // **** This is a note for myself to work on later: I can make a second ajax call to get the 5 day forecast ****/

        //Passed the object to the display function as an argument
        app.displayWeather(weatherObject);
    }).catch((error) => {
        alert('Sorry somthing went wrong. Try agian by typing the city you wish to view.', error)
    })
}

// Have a function to print to page 
// WeatherInfo is a pram for the weatherObject 
app.displayWeather = (weatherInfo) => {
    //get the contaner with the class .results and .append **print to page
    $('.results').append(
        //This is the content we want to be printed to page when information is returned
        //Use of template literal to get information we want printed to the page
        `<div>
            <p class="weather-name">${weatherInfo.name}</p>
            <img alt="" src=http://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}@2x.png>
            <p class="weather-temp">${Math.round(weatherInfo.main.temp)}</p>
        </div>`
    )
}







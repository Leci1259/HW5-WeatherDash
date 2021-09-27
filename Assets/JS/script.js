//Grab elements off the page
var todayWeatherInfo = $(".today")
var laterWeatherInfo = $(".week")
var cityInput = $("input")
var buttonHolder= $("#button-holder")
var submitButton= $("#submit")


//api key
var ApiKey='6b48a9a445f2d6135a213e01e7d1d9cc';

//variables needed
var city= $(".city").val().trim();

//append city buttons to side
var appendButton = function (city) {

    //create button elements
    var cityButton = document.createElement("button");

    //add class and text content
    cityButton.textContent= city;
    cityButton.classList="side-buttons"

    //append button
    buttonHolder.appendChild(cityButton);
}

//get city's info
var myCityInfo = function (city) {
     
        //construct proper url
        var cityURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "appid=" + ApiKey;
        //fetch data
        fetch(cityURL)
        .then(function (response) {
            return response.json();
        })
        //pull needed info from fetched data
        .then(function (data) {
            console.log(data)
            
           //send data through another function to get weather 
            myWeatherInfo(data.coord.lat,data.coord.long,city);
        }); 
};

var myWeatherInfo = function (lat,long,name) {
    
    //construct proper url
    var weatherURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + long + "&units=imperial&appid=" + ApiKey;
    //fetch data
    fetch(weatherURL)
    .then(function(response) {
        return response.json();
    })
    .then(function (data) {

     //today temperature
    todayWeatherInfo[0].text(data[0].daily.temp)

    //today wind
    todayWeatherInfo[1].text(data.daily.wind_speed)

    // today humidity
    todayWeatherInfo[2].text(data.daily.humidity)  
    
    //today uvi
    todayWeatherInfo[3].text(data.daily.uvi) 
    //uvi color change
    if (data.current.uvi < 3) {
        todayWeatherInfo[3].css("background-color", "green")   
    }
    else if (data.current.uvi < 6) {
        todayWeatherInfo[3].css("background-color", "yellow") 
    }
    else if (data.current.uvi < 8) {
        todayWeatherInfo[3].css("background-color", "orange") 
    }
    else if (data.current.uvi < 11) {
        todayWeatherInfo[3].css("background-color", "red") 
    }
    else {
        todayWeatherInfo[3].css("background-color", "purple") 
    }

})


}

//on submit button click
submitButton.on('click', function(event) {
    //keeps text up to read
    event.preventDefault();
    //grabs city input
    var city= $(".city").val().trim();

     //if not empty
    if (city) {
        //run through function
        myCityInfo(city)
    }
    else {
        alert("Error! City not entered correctly. Try again.")
    }

    //clears input
    $(".city").text('');
});

//on side button click
buttonHolder.on('click', function(event) {
    //identify which button
    var button = event.target

    //get the city from that button
    city = button.text();

    //run city through weather data process again
    myCityInfo(city)

});
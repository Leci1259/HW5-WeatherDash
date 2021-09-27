//Grab elements off the page
var todayWeatherInfo = $(".today")
var laterWeatherInfo = $(".week")
var cityInput = $("input")
var buttonHolder= $("#button-holder")
var submitButton= $("submit")
var sideList = $("side-buttons")

//api key
var ApiKey='949cfd5d625b3cd45f6ad2527b38c843';

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
        var cityURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + ApiKey;
        //fetch data
        fetch(cityURL)
        .then(function (response) {
            return response.json();
        })
        //pull needed info from fetched data
        .then(function (data) {
            //send data through another function to get weather
            myWeatherInfo(data[0].lat,data[0].long,city)
        })   
};

var myWeatherInfo = function (lat,long,city) {

}

//on submit button click
submitButton.addEventlistener('click', function(event) {
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
})

//on side button click

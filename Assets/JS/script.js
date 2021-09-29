//Grab elements off the page
var todayWeatherInfo = $(".today")
var laterWeatherInfo = $(".week")
var cityInput = $("input")
var buttonHolder= $("#button-holder")
var submitButton= $("#submit")
var laterWeatherDates= $(".weekHead")
var storedCity;
var city= $(".city").val().trim();
var images = $("img")
//api key
var ApiKey="6b48a9a445f2d6135a213e01e7d1d9cc";


//get city's info
var myCityInfo = function (city) {

        //construct proper url
        var cityURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + ApiKey;
        //fetch data
        fetch(cityURL)
        .then(function (response) {
            return response.json();
        })
        //pull needed info from fetched data
        .then(function (data) {            
            //send data through another function to get weather 
            myWeatherInfo(data.coord.lat,data.coord.lon,city);
        }); 
        //append button with city name
        appendButton(city.toUpperCase());
};


var myWeatherInfo = function (lat,lon,name) {
    
    //construct proper url
    var weatherURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + ApiKey;
    //fetch data
    fetch(weatherURL)
    .then(function(response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data)   
        displayData(data)
    })
}


var displayData = function (data) {
    //display name and date 
    $("#cityName").text(name.toUpperCase() +" " + moment().format("MM/DD/YYYY"))

    //display icon
    $(images[0]).attr("src","https://openweathermap.org/img/w/" + data.daily[0].weather[0].icon + ".png")

    //today temperature
    $(todayWeatherInfo[0]).text(data.daily[0].temp.day)

    //today wind
    $(todayWeatherInfo[1]).text(data.daily[0].wind_speed)

    // today humidity
    $(todayWeatherInfo[2]).text(data.daily[0].humidity)  

    //today uvi
    $(todayWeatherInfo[3]).text(data.daily[0].uvi) 

    //uvi color change
    if (data.current.uvi < 3) {
        $(todayWeatherInfo[3]).css("background-color", "green")   
    }
    else if (data.current.uvi < 6) {
        $(todayWeatherInfo[3]).css("background-color", "yellow") 
    }
    else if (data.current.uvi < 8) {
        $(todayWeatherInfo[3]).css("background-color", "orange") 
    }
    else if (data.current.uvi < 11) {
        $(todayWeatherInfo[3]).css("background-color", "red") 
    }
    else {
        $(todayWeatherInfo[3]).css("background-color", "purple") 
    }


    //display for next five days
    var x =1;
    var y = 0;
    for (var i = 0; i<laterWeatherInfo.length;i++) {

    //title
    $(laterWeatherDates[y]).text(moment().add(x,'d').format("MM/DD/YYYY"))

    //icon
    $(images[x]).attr("src","https://openweathermap.org/img/w/" + data.daily[x].weather[0].icon + ".png")

    //temperature
    $(laterWeatherInfo[i]).text(data.daily[x].temp.day)
    //wind
    $(laterWeatherInfo[++i]).text(data.daily[x].wind_speed)

    // humidity
    $(laterWeatherInfo[++i]).text(data.daily[x].humidity) 

    x++;
    y++;
    } 
}

//append city buttons to side
var appendButton = function (city) {

    //create button elements
    var cityButton = document.createElement("button");

    //add class and text content
    cityButton.textContent= city;
    cityButton.classList="side-buttons"

    //append button
    buttonHolder.append(cityButton);

    //change value of storedCity and save it to local storage
    storedCity=city;
    localStorage.setItem('storedCity',storedCity);
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

    //appends button on side
    appendButton (city);
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

//run function and show last searched info
function init () {
    //Grab stored city list from local storage
    var lastCity = localStorage.getItem("storedCity")
    
    if (lastCity) {
        city=lastCity;
       //Run through function 
        myCityInfo(city)
    }
    
    
}
init();

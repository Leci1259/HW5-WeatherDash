//Grab elements off the page
var todayWeatherInfo = $(".today")
var laterWeatherInfo = $(".week")
var cityInput = $("input")
var buttonHolder= $("#button-holder")
var submitButton= $("#submit")
var city= $(".city").val().trim();
var laterWeatherDates= $(".weekHead")

//api key
var ApiKey="949cfd5d625b3cd45f6ad2527b38c843";

//get city's info
var myCityInfo = function (city) {
     
        //construct proper url
        var cityURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "appid=" + ApiKey;
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

        //display name and date 
        $("#cityName").text(name + moment().format("MM/DD/YYYY"))

        //today temperature
        todayWeatherInfo[0].text(data.daily[0].temp)

        //today wind
        todayWeatherInfo[1].text(data.daily[0].wind_speed)

        // today humidity
        todayWeatherInfo[2].text(data.daily[0].humidity)  
        
        //today uvi
        todayWeatherInfo[3].text(data.daily[0].uvi) 

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


        //display for next five days
        var x =1;
        var y = 0;
        for (var i = 0; i<laterWeatherInfo.length;i++) {

            //title
            laterWeatherDates[y].text(moment().add(x,'d').format("MM/DD/YYYY") )

            //temperature
            laterWeatherInfo[i].text(data.daily[x].temp)

            //wind
            laterWeatherInfo[++i].text(data.daily[x].wind_speed)

            // humidity
            laterWeatherInfo[++i].text(data.daily[x].humidity) 

            x++;
        }

})
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

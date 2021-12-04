//api key
const ApiKey = "6b48a9a445f2d6135a213e01e7d1d9cc";

//get city's info
export default function getWeatherInfo(city) {

    //construct proper url
    var cityURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + ApiKey;
    //fetch data
    fetch(cityURL)
        .then(function (response) {
            return response.json();
        }).then(function (data) {
            //send data through another function to get weather 
            myWeatherInfo(data.coord.lat, data.coord.lon, city);
        });



    function myWeatherInfo(lat, lon, name) {

        //construct proper url
        var weatherURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + ApiKey;
        //fetch data
        fetch(weatherURL)
            .then(function (response) {
                return response.json();
            }).then(function (data) {
                return data
            })
    }
};



// export function displayData(data) {

//     //display icon
//     $(images[0]).attr("src", "https://openweathermap.org/img/w/" + data.daily[0].weather[0].icon + ".png")

//     //today temperature
//     $(todayWeatherInfo[0]).text(data.daily[0].temp.day)

//     //today wind
//     $(todayWeatherInfo[1]).text(data.daily[0].wind_speed)

//     // today humidity
//     $(todayWeatherInfo[2]).text(data.daily[0].humidity)

//     //today uvi
//     $(todayWeatherInfo[3]).text(data.daily[0].uvi)

//     //uvi color change
//     if (data.current.uvi < 3) {
//         $(todayWeatherInfo[3]).css("background-color", "green")
//     }
//     else if (data.current.uvi < 6) {
//         $(todayWeatherInfo[3]).css("background-color", "yellow")
//     }
//     else if (data.current.uvi < 8) {
//         $(todayWeatherInfo[3]).css("background-color", "orange")
//     }
//     else if (data.current.uvi < 11) {
//         $(todayWeatherInfo[3]).css("background-color", "red")
//     }
//     else {
//         $(todayWeatherInfo[3]).css("background-color", "purple")
//     }


//     //display for next five days
//     var x = 1;
//     var y = 0;
//     for (var i = 0; i < laterWeatherInfo.length; i++) {

//         //title
//         $(laterWeatherDates[y]).text(moment().add(x, 'd').format("MM/DD/YYYY"))

//         //icon
//         $(images[x]).attr("src", "https://openweathermap.org/img/w/" + data.daily[x].weather[0].icon + ".png")

//         //temperature
//         $(laterWeatherInfo[i]).text(data.daily[x].temp.day)
//         //wind
//         $(laterWeatherInfo[++i]).text(data.daily[x].wind_speed)

//         // humidity
//         $(laterWeatherInfo[++i]).text(data.daily[x].humidity)

//         x++;
//         y++;
//     }
// }


// //on submit button click
// submitButton.on('click', function (event) {
//     //keeps text up to read
//     event.preventDefault();
//     //grabs city input
//     var city = $(".city").val().trim();

//     //if not empty
//     if (city) {
//         //run through function
//         myCityInfo(city)
//     }
//     else {
//         alert("Error! City not entered correctly. Try again.")
//     }

//     //clears input
//     $(".city").text('');

// });




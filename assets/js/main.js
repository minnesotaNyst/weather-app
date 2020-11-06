//api key and url
var url = 'https://api.openweathermap.org/data/2.5/forecast?q=';
var appid = '&units=imperial&appid=';
var key = '8e6479f6b364bc5de90337af11e4ecd9'; //If you're seeing this, you need to sign up for the site (https://openweathermap.org/api) and navigate to "My API Keys to grab yours..."

//what fields will we need to have access to (DOM)
var cityEl = $('#search-city');
var submit = $('#submit');

//function to get the forecast for the specified city
var getForecast = function (city) {
	//format the url (module 6.1)
	var queryURL = url + city + appid + key;
	console.log(queryURL); //remove this when we no longer need the URL

	//now we need to get the data
	fetch(queryURL).then(function (response) {
		console.log(response);
		if (response.ok) {
			response.json().then(function (data) {
				console.log(data);
				displayData(data);
			});
		} else {
			alert('There was a problem with your request!');
		}
	});
};

//function to get the city
var getCity = function (e) {
	e.preventDefault();
	//create a new variable for city to pass into the getForecast function
	var city = $.trim(cityEl.val());
	console.log(city);

	if (city) {
		getForecast(city);
		cityEl.value = '';
	} else {
		alert('Please enter a City');
	}

	console.log(e);
};

//function to display the weather data for that day
var displayData = function (weatherData) {
	console.log(weatherData.list[2].main.temp);
};

$(submit).on('click', getCity);

//what do we need to do with the field once it has been entered into the search engine
//--store it
//--display in the history section below the search menu
//--use it to lookup the weather in the api

//what kind of weather information do we need to get (this will be in a separate div from the 5 day forecast)
//--city (using the seach box)
//--current date/time (moment.js or newer tool)
//--temperature (fahrenheit) (make sure to get the imperial value in the api instead of doing kelvin conversions)
//--humidity
//--wind speed (mph)
//--uv index (this section needs to include a color element when it's a high index versus a low index)

//we need to display the five day forecast in a card (reference bootstrap)

/* $( document ).ready( function () { */
var wUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=';
var uUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=';
var appid = '&units=imperial&appid=';
var key = '21d337020a0247b874a0d43202c4ad83';
var weather = '';
var cities = [];

//function to display search history in the left column of the app
/* var searchHistory = function () {
	cities = JSON.parse(localStorage.getItem('cities'));
	console.log(cities);

	if (!cities) {
		cities = [];
		return;
	} else {
		for (var i = 0; i < cities.length; ++i) {
			var historyEl = $('search-history').add('p');
			historyEl.text(cities[i]);
			historyEl.addClass('list-group-item btn btn-light');
			$('#search-history').append(historyEl);
		}
	}
}; */

//function to grab the searched for city and return required data elements
var getWeather = function (city) {
	fetch(wUrl + city + appid + key).then(function (response) {
		if (response.ok) {
			response.json().then(function (data) {
				var lat = data.city.coord.lat;
				var lon = data.city.coord.lon;
				var location = data.city.name;
				console.log(lat, lon, location);
				var currentDate = moment().format('MM/DD/YYYY');
				$('#current-city').text(location + ' ' + currentDate);
				/* $('#weather-img').attr('src', wUrl + json.data.weather[0].icon + '.png'); */
				$('#temperature').text(data.list[0].main.temp.toFixed(0) + '°F');
				$('#temp_low').text(data.list[0].main.temp_min.toFixed(0) + '°F');
				$('#temp_high').text(data.list[0].main.temp_max.toFixed(0) + '°F');
				$('#humidity').text(data.list[0].main.humidity + '%');
				$('#windspeed').text(data.list[0].wind.speed.toFixed(0) + ' ' + 'mph');

				//pass the location into the setHistory function to store the city
				setHistory(location);
				//pass lat/lon into the getForecast function
				getForecast(lat, lon);

				fetch(uUrl + lat + '&lon=' + lon + appid + key).then(function (
					response
				) {
					if (response.ok) {
						response.json().then(function (data) {
							$('#uvIndex').text(data.current.uvi);
							console.log(data.current.uvi);
							if (data.current.uvi > 2 && data.current.uvi < 5) {
								//come back to this and figure out the addclass method to change the warning
								$('#uvIndex').css('bg-warning');
							} else if (data.current.uvi < 2) {
								$('uvIndex').css('bg-success');
							} else if (data.current.uvi > 5) {
								$('uvIndex').css('bg-danger');
							}
						});
					} else {
						alert('Sorry, unable to display UV Index');
					}
				});
			});
		} else {
			alert(
				'Your search did not work, please make sure the city is spelled correctly!'
			);
		}
	});
};

// Fetch forecast data from weather API (use the onecall api here)

var getForecast = function (lat, lon) {
	var oneCall = uUrl + lat + '&lon=' + lon + appid + key;
	console.log(oneCall);
	fetch(oneCall).then(function (response) {
		// display forecast data from API
		if (response.ok) {
			response.json().then(function (data) {
				var forecast = data.daily.splice(3);
			});
		}
	});
};

//function to get the city
var getCity = function (e) {
	e.preventDefault();
	//create a new variable for city to pass into the getForecast function
	var cityEl = $('#city');
	var city = $.trim(cityEl.val());

	if (city) {
		getWeather(city);
		cityEl.value = '';
	} else {
		alert('Please enter a City');
	}

	console.log(e);
};

//function to set the history for cities searched
var setHistory = function (location) {
	if (cities.includes(location)) {
		return;
	} else {
		//if a location does exist, then push the value to the cities variable
		cities.push(location);
	}

	//ths will put the most recent 8 entries at the top of the list
	if (cities.length > 8) {
		cityHistory.shift();
	}

	//set the local storage with a key name of cities
	localStorage.setItem('cities', JSON.stringify(cities));

	$('cities').each(function () {
		$(this).remove();
	});

	/* 	searchHistory(); */
};

$('#submit').on('click', getCity);
/* searchHistory(); */

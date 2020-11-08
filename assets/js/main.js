/* $( document ).ready( function () { */
var url = 'https://api.openweathermap.org/data/2.5/forecast?q=';
var appid = '&units=imperial&appid=';
var key = '21d337020a0247b874a0d43202c4ad83';
var weather = '';
var city = '';
var currentDate = moment().format('L');
var searchHistory =
	JSON.parse(localStorage.getItem('cities')) === null
		? []
		: JSON.parse(localStorage.getItem('cities'));
displaySearchHistory();

// When user searches for a city, hit the API
function getWeather() {
	if ($(this).attr('id') === 'search-city') {
		city = $('#city').val();
	} else {
		city = $(this).text();
	}
	if (searchHistory.indexOf(city) === -1) {
		searchHistory.push(city);
	}
	// Store city searches in local storage
	localStorage.setItem('cities', JSON.stringify(searchHistory));
	weather = url + city + appid + key;
	// Display data from weather API
	$.getJSON(weather, function (json) {
		$('#city').text(json.name + ' ' + currentDate);
		$('#weather-img').attr(
			'src',
			'https://openweathermap.org/img/w/' + json.weather[0].icon + '.png'
		);
		$('#temperature').text(temp.toFixed(0) + '°F');
		$('#temp_low').text(temp_min.toFixed(0) + '°F');
		$('#temp_high').text(temp_max.toFixed(0) + '°F');
		$('#humidity').text(humidity + '%');
		$('#windspeed').text(windspeed.toFixed(0) + ' ' + 'mph');
	});
}
// Fetch forecast data from weather API
function Forecast() {
	var fiveForecast = url + city + appid + key;
	console.log(fiveForecast);
	var dayCounter = 1;
	$.ajax({
		url: fiveForecast,
		method: 'GET'
	}).then(function (response) {
		// display forecast data from API
		for (var i = 0; i < response.list.length; i++) {
			var dateTime = response.list[i].dt_txt;
			var date = dateTime.split(' ')[0];
			var time = dateTime.split(' ')[1];
			if (time === '15:00:00') {
				var year = date.split('-')[0];
				var month = date.split('-')[1];
				var day = date.split('-')[2];
				$('#day-' + dayCounter)
					.children('.card-date')
					.text(month + '/' + day + '/' + year);
				$('#day-' + dayCounter)
					.children('.weather-icon')
					.attr(
						'src',
						'https://api.openweathermap.org/img/w/' +
							response.list[i].weather[0].icon +
							'.png'
					);
				$('#day-' + dayCounter)
					.children('.weather-temp')
					.text('Temp: ' + (response.list[i].main.temp.toFixed(0) + '°F'));
				$('#day-' + dayCounter)
					.children('.weather-humidity')
					.text('Humidity: ' + response.list[i].main.humidity + '%');
				dayCounter++;
			}
		}
	});
}
// display prior search history from local storage
function displaySearchHistory() {
	$('#searchHistory').empty();
	searchHistory.forEach(function (city) {
		var historyItem = $('<li>');
		historyItem.addClass('list-group-item btn btn-light');
		historyItem.text(city);
		$('#searchHistory').prepend(historyItem);
	});
	$('.btn').click(getWeather);
	$('.btn').click(Forecast);
}

$('#search-city').click(displaySearchHistory);

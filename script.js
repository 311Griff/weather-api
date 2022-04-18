$(document).ready(function() {
  var currWeather = [];
  var lon; //= geoplugin_longitude();
  var lat; //= geoplugin_latitude();
  var city;

  $.getJSON('https://ipinfo.io/', function(data) {
    var splitted = data['loc'].split(',');
    lon = splitted[1];
    lat = splitted[0];
    city = data.city;

  }).done(function() {

    //get weather data from openweathermap api then parse it for display

    $.getJSON('https://api.openweathermap.org/data/2.5/find?lat=' + lat + '&lon=' + lon + '&cnt=1&units=metric&APPID=9882d5617ad6a7eabb47f937ee234679', function(data) {
      currWeather['now'] = Math.round(data.list[0].main['temp']);
      currWeather['high'] = Math.round(data.list[0].main['temp_max']);
      currWeather['low'] = Math.round(data.list[0].main['temp_min']);
      
      //currWeather['humidity'] = Math.round(data.list[0].main['humidity']);
      //currWeather['pressure'] = data.list[0].main['pressure'] * 0.02961339710085;
      //currWeather['pressure'] = currWeather['pressure'].toFixed(2);
      currWeather['description'] = data.list[0].weather[0].description;

      //converted variables
       
      var farCurr = Math.round(currWeather['now'] * (9 / 5) + 32),
          farHigh = Math.round(currWeather['high'] * (9 / 5) + 32),
        farLow = Math.round(currWeather['low'] * 9 / 5 + 32);






      $('#loc').html(city || 'your IP can\'t be detected');
      //celcius temperatures
      $('#nowTemp').html(currWeather['now'] + "&deg;C");
      $('#highTemp').html(currWeather['high'] + "&deg;C");
      $('#lowTemp').html(currWeather['low'] + "&deg;C");
      //fahrenheit tempuratures
      $('#nowTempF').html(farCurr + "&deg;F");
      $('#highTempF').html(farHigh + "&deg;F");
      $('#lowTempF').html(farLow + "&deg;F");
      $('#cond').html(currWeather['description']);

      if (farCurr > 90) {
        $('.main-container').css('background', 'url(\'http://hdwallpaperbackgrounds.net/wp-content/uploads/2016/06/Beautiful-Beach-Pictures-5.jpg\') no-repeat center');
      } else if (farCurr > 65) {
        $('.main-container').css('background', 'url(\'https://pattip0414.files.wordpress.com/2016/05/sunny-day.jpg\') no-repeat center');
      } else if (farCurr > 30 && farCurr < 65) {
        $('.main-container').css('background', 'url(\'http://img04.deviantart.net/ebeb/i/2016/015/c/1/cloudy_day__new_mexico_by_hseamons-d73q533.jpg\') no-repeat center');
      } else {
        $('.main-container').css('background', 'url(\'http://way-up-north.com/wp-content/uploads/2015/01/snowy-road.jpg\') no-repeat center');
      }

    });
  });

  $('.temperatures').each(function() {
    var self = $(this);
    var button = self.find('button');
    var tempC = self.find('.cel');
    var tempF = self.find('.far');

    button.on('click', function() {
      if (tempC.hasClass('inactive')) {
        tempC.removeClass('inactive');
      } else {
        tempC.addClass('inactive');
      }
      if (tempF.hasClass('inactive')) {
        tempF.removeClass('inactive');
      } else {
        tempF.addClass('inactive');
      }
    });
  });

});
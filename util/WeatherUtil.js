export const fetchWeather = success => {
  const handleFetchWeather = location => {
    const lat = location.coords.latitude;
    const long = location.coords.longitude;
    const xml = new XMLHttpRequest();

    xml.onreadystatechange = () => {
      if (xml.readyState == XMLHttpRequest.DONE) {
        if (xml.status === 200) {
          const weather = JSON.parse(xml.responseText);
          success(weather);
        }
      }
    };

    const apiKey = '8db01288eae41457c8486f5288ffcc2f';
    const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&APPID=${apiKey}`;

    xml.open('GET', url, true);
    xml.send();
  };
  navigator.geolocation.getCurrentPosition(handleFetchWeather);
};

export const convertTemp = temperature => {
  return Math.round((temperature - 273.15) * 1.8 + 32);
};

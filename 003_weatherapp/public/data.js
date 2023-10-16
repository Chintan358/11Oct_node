


const getWeatherData = () => {

    const cityname = document.getElementById("cityname").value

    fetch(`/weather?location=${cityname}`).then(result => {
        return result.json()
    }).then(data => {

        city.innerHTML = data.City;
        lat.innerHTML = data.Lat;
        lng.innerHTML = data.Lng;
        temp.innerHTML = data.Temp;
        pressure.innerHTML = data.Pressure;
        humidity.innerHTML = data.Humidity;

    }).catch(err => {
        console.log(err);
    })


}
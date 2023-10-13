const axios = require("axios")



const getWeatherData = (lat, lng, callback) => {

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=2efcb1475da327f09164daaace231821&units=metric`;

    axios.get(url).then(result => {
        const dt = result.data.main;

        const city = result.data.name
        const temp = dt.temp;
        const pressure = dt.pressure
        const humidity = dt.humidity

        //     console.log(`

        // City : ${city}
        // Temp : ${temp}
        // Pressure : ${pressure}
        // Humidity : ${humidity}


        // `);

        callback({ city, temp, pressure, humidity })



    }).catch(err => {
        // console.log(err);
        callback(undefined, err)
    })

}

module.exports = { getWeatherData }
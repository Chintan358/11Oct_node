const geocode = require("./geocode")
const weather = require("./weather")


const city = process.argv[2];
if(!city)
{
    console.log("Enter city name !!!");
    return;
}
geocode.getGeocode(city, (data, err) => {
    if (err) {
        console.log(err);
        return
    }

    weather.getWeatherData(data.lat, data.lng, (result, err) => {
        if (err) {
            console.log(err);
            return
        }

        console.log(`
           
            City : ${result.city}
            Lat : ${data.lat}
            Lng : ${data.lng}
            Temp : ${result.temp}
            Pressure : ${result.pressure}
            Humidity : ${result.humidity}
           
           
           `);


    })
})
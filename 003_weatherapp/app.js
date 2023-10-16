const express = require("express")
const app = express()
require("dotenv").config()
const PORT = process.env.PORT
const path = require("path")
const geocode = require("./geocode")
const weather = require("./weather")
const publicpath = path.join(__dirname, "public")
app.use(express.static(publicpath))
app.get("/", (req, resp) => {
    resp.sendFile(path.join(__dirname, "index.html"))
})

app.get("/weather", (req, resp) => {

    const city = req.query.location
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

            resp.send({

                City: result.city,
                Lat: data.lat,
                Lng: data.lng,
                Temp: result.temp,
                Pressure: result.pressure,
                Humidity: result.humidity,


            });




        })
    })


})

app.listen(PORT, () => {
    console.log(`server runinng on port ${PORT}`);
})
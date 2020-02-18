const express = require('express')
const path = require('path')
const hbs = require('hbs')
const fetch = require('fetch')
const { getGeoData } = require('./helpers/geoData')
const { getWeather } = require('./helpers/weatherData')

const app = express()

const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partial/')
const staticPath = path.join(__dirname, '../public')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
app.use(express.static(staticPath))
hbs.registerPartials(partialPath)

app.get('/weather', function (req, res) {
    const location = req.query.location
    return res.render('weather', { data: "Some string with weather data and location" })
})

app.get('/data', function (req, res) {
    const location = req.query.location

    if (location) {
        getGeoData(location, (err, geoData) => {
            if (err) return console.log(err.message)

            const { latitude, longitude, location } = geoData

            getWeather(latitude, longitude, (err, weatherData) => {
                if (err) return console.log(err.message)
                console.log(`\nLocation: ${location} \n ${weatherData}`)
                res.send({ weatherData: `\nLocation: ${location} \n ${weatherData}` })

            })
        })
    }
})

app.get('/', function (req, res) {
    res.render('index')
})

app.get('/about', function (req, res) {
    res.render('about')
})

app.get('*', function (req, res) {
    res.sendStatus(404)
})

app.listen(3000, () => {
    console.log("Server running")
})


module.exports = app
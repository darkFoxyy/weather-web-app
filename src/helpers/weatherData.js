const request = require('request')

const getWeather = (latitude, longitude, callback) => {
    const timestamp = Date.now().toString().slice(0, -3);
    const url = `https://api.darksky.net/forecast/91d409621bfccb9f0fa0f5ef1b0ba2b3/${latitude},${longitude},${timestamp}`
    request(url, (error, res) => {
        if (error)
            return callback({ error: true, message: "No response" }, null)

        const body = res.body
        const info = JSON.parse(body)

        if (info.error)
            return callback({ error: true, message: info.error }, null)

        if (!info.daily)
            return callback({ error: true, message: "No data" }, null)

        const weatherData = {
            temperature: info.currently.temperature,
            summary: info.daily.data[0].summary,
            precipProbability: info.daily.data[0].precipProbability,
            precipType: info.daily.data[0].precipType
        }
        
        const result = `\nWeather for today: \n${weatherData.summary}\nTemperature now is ${weatherData.temperature} F\nProbability of ${weatherData.precipType} is ${weatherData.precipProbability * 100}%\n`
        return callback(null, result)
    })
}


module.exports = {
    getWeather
}
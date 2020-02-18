const request = require('request')

const getGeoData = (location, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=pk.eyJ1IjoiZGFya2ZveHl5IiwiYSI6ImNrNjh6NDl3ZDA5bmgza3BrNzhpODAxMnMifQ.ywDuhs8HsrjQiBTnja4HJw`
    request(url, (error, res) => {
        if (error)
            return callback({ error: true, message: "No response" }, null)

        const body = res.body
        const info = JSON.parse(body)

        if (info.message)
            return callback({ error: true, message: info.message }, null)

        if (!info.features.length)
            return callback({ error: true, message: `No data about ${location}` }, null)
            
        const coord = {
            longitude: info.features[0].center[0],
            latitude: info.features[0].center[1],
            location: info.features[0].place_name
        }
        return callback(null, coord)
    })
}

module.exports = {
    getGeoData
}


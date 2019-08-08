const request = require('request')
const chalk = require('chalk')

const forecast = (latitude, longitude, callback) => {

    const url = 'https://api.darksky.net/forecast/3e81b4e4af666f14f6df7ee41d14cbd7/' + latitude + ',' + longitude + '?units=si'
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback(chalk.red.inverse('Unable to connect to weather service!'))
        } else if (body.error) {
            callback(chalk.red.inverse('Unable to find location'))
        } else {
            {
                callback(undefined, {
                    forecast: body.daily.data[0].summary,
                    temperature: body.currently.temperature,
                    chanceOfRain: body.currently.precipProbability
                })
            }
        }
    })
}

module.exports = forecast


// {
//     callback(undefined,
//         console.log(chalk.green(`${body.daily.data[0].summary} It is currently ${body.currently.temperature} degrees, with a ${body.currently.precipProbability}% of rain.`)))
//     }

// {
//     callback(undefined, {
//         forecast: body.daily.data[0].summary,
//         temperature: body.currently.temperature,
//         chanceOfRain: body.currently.precipProbability
//     })
// }
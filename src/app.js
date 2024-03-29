const path = require('path')
const express = require('express')
const chalk = require('chalk')
const hbs = require('hbs')
const geocode = require('./geocode')
const forecast = require('./forecast')

const app = express()

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
const port = process.env.PORT || 3000

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Slobodan Blagojevic'
    })  // this call gets the index.hbs in views folder
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Slobodan Blagojevic'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        helpMsg: 'This is where you get help',
        title: 'Help',
        name: 'Slobodan Blagojevic'
    })

})
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Must provide an address'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }
            res.send({
                location,
                forecast: forecastData,
                address: req.query.address
                
                
            })
        })
    })
    
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'Must provide search term'
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Error 404',
        name: 'Slobodan Blagojevic',
        errorMsg: 'Help page not found'
    })
})
app.get('*', (req, res) => {
    res.render('404', {
        title: 'Error 404',
        name: 'Slobodan Blagojevic',
        errorMsg: 'Page not found'
    })
})

app.listen(port, () => {
    console.log(chalk.blue.inverse('Server is up on' + port))
})
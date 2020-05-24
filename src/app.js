const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()
const port = process.env.PORT || 3000

//Define paths for express configu
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


//Setup handlebars engine and view location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)
// hbs.registerPartial('headerPartial', 'header') ==> Learn how to use this

//Setup static directory
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'stemitom'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: "Contact stemitom@gmail.com for more inquiries",
        title: 'Help',
        name: 'stemitom'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: "stemitom"
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {} ) => {
        if(error){
            return res.send({error})
        }
        
        forecast(longitude, latitude, (error, forecastData) => {
            if(error){
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address,
            })
        })
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({error: 'You must provide a search item'})
    }
    res.send({
        products: [],
    })
})
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        error: 'Help article not found',
        name: 'stemitom'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        error: 'Page not found',
        name: 'stemitom'
    })
})

app.listen(port, () => {
    console.log('Server is running on ' + port)
})

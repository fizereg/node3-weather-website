const path = require('path')
const express = require('express')

const app = express()
const port = process.env.PORT || 3000

const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// Define paths for express configuration
const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setting up handlbars engine and views location
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectory))

app.get('', (req, res)=>{
    res.render('index', {
        title: 'Weather App',
        name: 'Eric Fizer'
    })
})

app.get('/about',(req, res)=>{
    res.render('about', {
        title: 'About Me',
        name: 'Eric Fizer'
    })
})

app.get('/help', (req, res)=>{
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Eric Fizer'
    })
})

app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide a address!'
        })
    }

    geocode(req.query.address,(error, {latitude, longitude, location} ={}) =>{

        if(error){
            return res.send({
                error:error
            })
        }
        //else if(!address){
        //     return console.log('Please Provide a Location')
        // }
        
        forecast(latitude, longitude, (error, forecastData) => {
    
            if(error){
                return res.send({
                    error:error
                })
            }
        
           
            return res.send({
                forecast:forecastData,
                location:location,
                address:req.query.address
                
            })

        })
    })

  
})


app.get('/products', (req, res) =>{
    if(!req.query.search){
        return res.send({
            error:'You must provide a search term!'
        })
    }
    res.send({
        products:[]
    })
})
//This * wildcard has to come to come last.

app.get('/help/*',(req, res)=>{
    res.render('404',{
        title: 'Help 404 Page',
        message: 'Help Article Not Found',
        name: 'Eric Fizer'
    })

})

app.get('*', (req, res)=>{
    res.render('404',{
        title: '404 Page',
        message: '404 Page Not Found',
        name: 'Eric Fizer'
        
    })
})

app.listen(port, ()=>{
    console.log('Server is Up on '+port)
})

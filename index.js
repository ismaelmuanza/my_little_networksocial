const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const routes = require('./routes/route')
const session = require('express-session')
const flash = require('express-flash')
var cookieParser = require('cookie-parser')


// cookie-parser
app.use(cookieParser('jkjkhkhkhkvb323'))

// express-session
const time = 1000 * 60 * (60 * 4)
app.set('trust proxy', 1) // trust first proxy
app.use(session({
    secret: 'y341jkbueJHHJEUWENyud21j23h3h',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: time }
}))

// view engine e static files
app.set('view engine', 'ejs')
app.use(express.static('public'))

// body-parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// express flash
app.use(flash())

// routes
app.use('/', routes)

// servidor
const port = 4000
app.listen(port, () => console.log('API COM KNEX RODANDO NA PORTA: ' + port))
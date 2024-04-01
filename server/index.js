const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const authRoute = require('./router/auth-router')
const contactRoute = require('./router/contact-router')
const serviceRoute = require('./router/service-router')
const adminRoute = require('./router/admin-router')
const cors = require('cors')
const fileupload = require('express-fileupload');
app.use(fileupload());
app.use(express.static('assets'))
const path = require('path');
app.use('/assets', express.static(path.join(__dirname, 'assets')));

require('./utils/db')
const corsOptions = {
    origin: 'http://localhost:3000',
    methods: 'GET, POST, PUT, DELETE',
    credentials: true
}
app.use(cors(corsOptions))

app.use(express.json())

app.use('/api/auth', authRoute)
app.use('/api/form', contactRoute)
app.use('/api/data', serviceRoute)

//let's define admin route
app.use('/api/admin', adminRoute)



// app.get('/', (req, res) => {
//     res.send('This is our first class')
// })

// app.all('*', (req, res) => {
//     res.send('404 - Page not found')
// })

// app.post('/', (req, res) => {
//     res.send('This is post method')
// })

// app.put('/:id', (req, res) => {
//     res.send('This is update method')
// })

// app.delete('/:id', (req, res) => {
//     res.send('This is delete method')
// })

app.listen(port, () => {
    console.log('Running on the https://localhost:5000')                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
})                                                                                                                                                                                                                   
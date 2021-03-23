const express = require('express')
const request = require('./Request.js')
const app = express()
const port = 3000

request.test3();

//app.get('/', (req, res) => res.send('Hello World!'))
//app.listen(port, () => console.log(`Example app listening on port port!`))
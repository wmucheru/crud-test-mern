const express = require('express')
const bodyParser = require('body-parser')

const app = express()

// Apply middleware
app.use(bodyParser.urlencoded({ extended: true }))

app.listen(3000, ()=>{
    console.log('listening on 3000')
})

app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/index.html')
})

app.post('/register', (req, res)=>{
    console.log(req.body)
})
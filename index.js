const express = require('express')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

const app = express()

let db

MongoClient.connect('mongodb://localhost:27017', {
    useUnifiedTopology: true,
    useNewUrlParser: true
}, (err, client)=>{
    if(err){
        return console.log(err)
    }

    db = client.db('register')
})  

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

    const usersCollection = db.collection('users')

    usersCollection.insertOne(req.body)
        .then(result => {
            console.log('User added!')
        })
        .catch(error => {
            console.log('Error adding user!')
        })
})
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const { ObjectId } = require('mongodb')
const MongoClient = require('mongodb').MongoClient

const app = express()

let db

/*
MongoClient.connect('mongodb://localhost:27017', {
    useUnifiedTopology: true,
    useNewUrlParser: true
}, (err, client)=>{
    if(err){
        return console.log(err)
    }

    db = client.db('register')
})
*/

app.use(express.static(path.join(__dirname, 'public')))

// Apply middleware
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.set('view engine', 'pug')

app.listen(3000, ()=>{
    console.log('listening on 3000')
})

app.get('/test', (req, res) => {
    res.send('<h2>Register</h2>');
})

app.get('/', (req, res)=>{

    /*
    db.collection('users').find().toArray()
        .then(result => {
            res.render('index', {users:result})
        })
    */
})

app.post('/register', (req, res)=>{
    console.log(req.body)

    db.collection('users').insertOne(req.body)
        .then(result => {
            console.log('User added!')
            res.redirect('/')
        })
        .catch(error => {
            console.log('Error adding user!')
        })
})

app.put('/users', (req, res)=>{
    const name = req.body.name
    const email = req.body.email

    db.collection('users').findOneAndUpdate(
        { _id: ObjectId(req.body.id) },
        {
            $set: {
                name,
                email
            }
        },
        {
            upsert: false
        }
    )
        .then(result => {
            res.json({message:result})
        })
        .catch(err => {
            console.log(err)
        })
})

app.delete('/users', (req, res) => {
    db.collection('users').deleteOne(
        { _id: ObjectId(req.body.id) }
    )
        .then(response => {
            res.json(response)
        })
        .catch(err => {
            console.log(err)
        })
})
require('dotenv').config()
const express = require('express') //imports express
const fs = require('fs') //imports file system functions
const path =require('path') //imports path utils
const hbs=require('hbs') //imports handlebars
//add other imports here
const mongoose = require('mongoose')
const saledb = require('./models/saledb');

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useCreateIndex:true,
    useUnifiedTopology: true,
    useFindAndModify: false
})

const app = express(); //creates express application and returns an object
const port=process.env.PORT; //selects the port to be used
app.listen(port) // starts listening for client requests on specified port
app.use(express.json());

const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')
app.use(express.static('./public')) //points to static resources like css, client side js etc.
app.set('view engine','hbs') //tells express top use handlebars templating engine
app.set('views',viewsPath) //sets the apps view directory to the viewsPath defined above
hbs.registerPartials(partialsPath)//registers the partials for the app

let items=[]

/* GET index listing. */

app.get('/', (req, res)=> {
    res.render('index',{title :'Sell Your Junk'})
    
});

app.get('/items', (req, res)=> {
    saledb.find({},(error,result)=>{
        if (error)
            console.log(error)
        else{
            
            items=result
            console.log(items)
            res.send(items)
        }
    })
    
});

app.get('/items/:id', (req, res)=> {
    
    saledb.find({_id: req.params.id},(error, result)=>{
        if(error)
            res.send({error: 'Something went wrong. Try again!'})
        else{
            if (result.length === 0)
                res.send({error: 'Entry not found'})
            else
                res.send(result[0])
        }
       
    })
    
});

app.post('/items',(req,res)=>{
    const item = req.body
    saledb.create(item,(error,result)=>{
        if(error)
            res.send({error: 'Error saving entry'})
        else
            res.send(item)
    })
})

app.delete('/items/:id',(req, res)=> {
    
    saledb.deleteOne({_id: req.params.id},(error, result)=>{
        if(error)
            res.send({error: 'Something went wrong. Try again!'})
        else{
            if (result.length === 0)
                res.send({error: 'Entry not found'})
            else
                res.send(result[0])
        }
       
    })
})

app.get('*', (req, res)=> {
    res.render('error')
});

/*
const test_entry = {
    title: 'Used Car',
    description: '2003 Ford Taurus, Runs Good, Has Rust',
    sellerName: 'Grip',
    category: 'Other',
    price: 1200,
    lat: 75.1966,
    long: 84.2472, 
    contact: '(989)949-1072'
}

const test_entry = {
    title: 'Nintendo Switch',
    description: 'Used, Good Condition, No scratches',
    sellerName: 'Jacob',
    category: 'Electronics',
    price: 250,
    lat: 88.1966,
    long: -45.2472, 
    contact: '(989)496-4572'
}

const test_entry = {
    title: 'Puppies',
    description: 'Boxer-Lab Mix, 3-Months',
    sellerName: 'Katlyn',
    category: 'Other',
    price: 50,
    lat: 45.1966,
    long: 20.2472, 
    contact: '(989)327-6439'
}

saledb.create(test_entry,(error,result)=>{
    if(error)
        console.log(error)
    else
        console.log(result)
})*/
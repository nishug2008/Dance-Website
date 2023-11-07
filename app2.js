const express = require("express");
const path = require("path");
const fs = require("fs");
const bodyParser = require("body-parser")
const app2 = express();
const mongoose = require("mongoose");
const port = 80;

main().catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/contactDance');
}

//Define Mongoose Schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
  });


  const Contact = mongoose.model('Contact', contactSchema);
    

app2.use('/static',express.static(path.join(__dirname,'static')));
app2.use(express.urlencoded());

app2.set('view engine','pug');
app2.set('views' , path.join(__dirname ,"views"));

app2.get('/',(req,res)=>
{
    const con = "This is this the best content on internet use it wisely"
    const params = {'title': 'Dance Academy','content': con};
    res.status(200).render('index.pug',params);
});

app2.get('/contact',(req,res)=>
{
    const con = "This is this the best content on internet use it wisely"
    const params = {'title': 'Dance Academy','content': con};
    res.status(200).render('contact.pug',params);
});

app2.post('/contact',(req,res)=>
{
    var myData= new Contact(req.body);
    myData.save().then(()=>{
        res.send("Your Form has been submitted")
    }).catch(()=>{
        res.status(404).send("Your Form has not been saved")
    }) 
    // res.status(200).render('contact.pug');
});

app2.listen(port,()=>{
    console.log(`The website is started successfully on port ${port}\n`);
});
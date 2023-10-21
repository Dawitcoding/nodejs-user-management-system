require("dotenv").config()
const express = require("express")
const expressLayout = require("express-ejs-layouts")
const methodOverride = require("method-override")
const {flash} = require('express-flash-message');
const session = require('express-session');


const coonectDB = require("./server/config/db")
const app = express()
const port= 5000 || process.env.PORT

// connect to db
coonectDB()

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(methodOverride('_method'))

// static files
app.use(express.static("public"))

app.use(
    session({
      secret: 'secret',
      resave: false,
      saveUninitialized: true,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
      }
    })
  );
  
  // Flash Messages
  app.use(flash({ sessionKeyName: 'flashMessage' }));

// templting engine
app.use(expressLayout)
app.set("layout","./layouts/main")
app.set("view engine","ejs")

// routes
app.use("/", require("./server/routes/customer"))

// 404 page
app.get("*", (req,res)=>{
    res.status(404).render("404")
})
app.listen(port, ()=>{
    console.log(`app lisinning on port ${port}`)
})
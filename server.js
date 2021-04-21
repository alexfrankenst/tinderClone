import express from 'express'
import mongoose from 'mongoose'
import Cards from './dbCards.js'
import cors from 'cors'
// App Config
const app = express();
const port = process.env.PORT || 8002 ;
const connection_url = 'mongodb+srv://alex:alex@cluster0.k6yvv.mongodb.net/tinderdb?retryWrites=true&w=majority'

// MiddleWares
app.use(express.json())
app.use(cors)
// DBConfig
mongoose.connect(connection_url, {
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true,
})

// API Endpoints
app.get('/',(req,res) => res.status(200).send("Hello ALex"))


app.post("/tinder/cards",(req,res)=>{
    const dbCard = req.body;

    Cards.create(dbCard,(err,data)=>{
        if(err){
            res.status(500).send(err)
        }else{
            res.status(201).send(data)
        }
    })
})

app.get("/tinder/cards",(req,res)=>{
    
    Cards.find((err,data)=>{
        if(err){
            res.status(500).send(err)
        }else{
            res.status(201).send(data)
        }
    })
})

// Listener

app.listen(port, ()=> console.log(`listening on localhost : ${port}`));
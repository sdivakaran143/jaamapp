const express=require("express");
const {MongoClient} =require("mongodb");
const cors = require('cors');

const exp=express();
exp.use(cors());
exp.use(express.json());
var mainapp;

exp.get("/",(req,res)=>{
    res.send("sucess");
})
exp.get("/p", async(req, res) => {
        var colletion = mainapp.collection("Users");
        result =await colletion.find({}).toArray();
        res.send(result);
        console.log(result);
});

exp.listen(8000,(err,result)=>{
    const MONGO_URI = "mongodb+srv://developerD:vaD8WpBedDz8oxrb@diva.tnace52.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(MONGO_URI, {
        serverApi: {
            version: '1',
            strict: true,
            deprecationErrors: true,
        }
    });
    client.connect();
    mainapp = client.db("JaamApp");
    console.log("Successfully connected to MongoDB");
})
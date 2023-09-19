const express=require("express");
const {MongoClient} =require("mongodb");
const cors = require('cors');
const exp=express();

exp.use(cors());
exp.use(express.json());
require('dotenv').config();
var mainapp;

exp.get("/",(req,res)=>{
    res.send("sucess");
})
exp.get("/alluser",async(req,res)=>{
    var Users = mainapp.collection("Users");
    const result=await Users.find({}).toArray();
    res.send(result);
})
exp.get("/allcourse", async(req, res) => {
        var colletion = mainapp.collection("Products");
        result =await colletion.find({}).toArray();
        res.send(result);
    });
exp.post("/storePayment", async(req, res) => {
    const {infos,Productdata,user } = req.body;
    var PaidContent = mainapp.collection("PaidContent");
    // console.log(id);
    result =await PaidContent.find({product_id:Productdata._id}).toArray();
    coursedata={
        ...Productdata,
        ...result[0],
        ...infos
    }
    var Users = mainapp.collection("Users");
    await Users.updateOne({ uid:user.uid},{ $push: { Products: coursedata } } );
    res.status(200).json({ message: "Payment data stored successfully" });
});
exp.post("/UserDetials", async(req, res) => {
    var Users = mainapp.collection("Users");
    const result=await Users.find({uid:req.body.uid}).toArray();
    res.send(result);
});
exp.post("/RegistertoDB", async(req, res) => {
    var Users = mainapp.collection("Users");
    await Users.insertOne({...req.body,Products:[]});
    res.status(200).json({ message: "User successfully registered..." });
});

exp.listen(process.env.PORT,(err,result)=>{
    const client = new MongoClient(process.env.MONGO_URL, {
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
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
exp.get("/allcourse", async(req, res) => {
        var colletion = mainapp.collection("Products");
        result =await colletion.find({}).toArray();
        res.send(result);
});
exp.post("/storePayment", (req, res) => {
    const {data,detials } = req.body;
    console.log(detials);
    res.status(200).json({ message: "Payment data stored successfully" });
  });
exp.post("/allcourseuhique", (req, res) => {
    mainapp.collection("").aggregate([
        {
          $lookup: {
            from: "collection2",
            localField: "name", // Field in collection1
            foreignField: "name", // Field in collection2
            as: "matches"
          }
        },
        {
          $match: {
            matches: { $eq: [] } // Filter documents with no matches in collection2
          }
        }
      ]);
      
  });
exp.listen(8080,(err,result)=>{
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
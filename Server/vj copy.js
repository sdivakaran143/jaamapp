const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8080;
const MONGO_URI = "mongodb+srv://developerD:vaD8WpBedDz8oxrb@diva.tnace52.mongodb.net/?retryWrites=true&w=majority";

let mainapp; // Define mainapp globally

app.get('/', (req, res) => {
    res.send("Server connected ...");
});

async function connectToMongoDB() {
    try {
        const client = new MongoClient(MONGO_URI, {
            serverApi: {
                version: '1',
                strict: true,
                deprecationErrors: true,
            }
        });

        await client.connect();
        mainapp = client.db("MainProject");
        console.log("Successfully connected to MongoDB");

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (err) {
        console.error("Failed to connect to MongoDB:", err);
        process.exit(1);
    }
}

connectToMongoDB();

app.get('/products', async (req, res) => {
    try {
        const collection = mainapp.collection("Products");
        const result = await collection.find({}).toArray();
        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching data from MongoDB");
    }
});



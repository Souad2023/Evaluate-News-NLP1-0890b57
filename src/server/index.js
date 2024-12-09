var path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const fetch = require('node-fetch');  
dotenv.config();
const port = 5050;

const app = express();
const cors = require('cors');
app.use(express.static('dist'));
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

console.log(__dirname);

// Variables for url and api key
const MEAN_CLOUD_API_ID = process.env.API_ID;
const MEAN_CLOUD_API_KEY = process.env.API_KEY;

// POST Route
app.post("/", async (req, res) => {
    const url = req.body.URI;

    // Define the analyzeURL function to call the MeaningCloud API
    async function analyzeURL(url, apiKey) {
        const response = await fetch('https://api.meaningcloud.com/sentiment-2.1', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',  
            },
            body: new URLSearchParams({
                key: apiKey,                
                url: url,                   
                lang: 'en'                 
            })
        });

        if (!response.ok) {
            throw new Error('Failed to analyze URL');
        }

        const data = await response.json();
        return data; 
    }

    try {
        // Call the analyzeURL function with the URL and API key
        const analyzeResponse = await analyzeURL(url, MEAN_CLOUD_API_KEY);
        
        // Send the response back to the client
        res.send(analyzeResponse);
    } catch (error) {
        res.status(500).send({ error: 'Error analyzing URL' });
    }
});

// Designates what port the app will listen to for incoming requests
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

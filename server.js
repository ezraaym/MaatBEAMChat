const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

// Replace with your Airtable API key and base ID
const AIRTABLE_PERSONAL_ACCESS_TOKEN = 'patdLgAbyVmU7QX6r.73efea998f9559137132aff5017ee1036091d38ef9df318cde98b0908d876423';
const AIRTABLE_BASE_ID = 'appgeMbO5wIe4STRM';

// Function to query Airtable
async function queryAirtable(userInput) {
    const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/Master?filterByFormula={Asset Name}='${userInput}'`;

    const config = {
        headers: {
            Authorization: `Bearer ${AIRTABLE_API_KEY}`
        }
    };

    const response = await axios.get(url, config);
    return response.data.records;
}

// Endpoint to handle requests from the chat app
app.post('/chat', async (req, res) => {
    const userInput = req.body.text;
    const records = await queryAirtable(userInput);
    res.json(records);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
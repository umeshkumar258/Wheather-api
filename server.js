const express = require('express');

const dotenv = require('dotenv');

const path = require('path');



dotenv.config({ quiet: true });



const app = express();

const PORT = Number(process.env.PORT) || 5000;



// Serve frontend files from public/
app.use(express.static(path.join(__dirname, 'public')));

// Allow the frontend to call this API when opened through VS Code Live Preview.
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});



// Homepage route
app.get('/', (req, res) => {

    res.sendFile(path.join(__dirname, 'public', 'index.html'));

});

// Weather API route
app.get('/weather/:city', async (req, res) => {

    const city = req.params.city?.trim();

    const apiKey = process.env.API_KEY?.trim();



    if (!city) {
        return res.status(400).json({ message: 'Please enter a city name.' });
    }

    if (!apiKey) {
        return res.status(500).json({ message: 'Missing API_KEY in .env file.' });
    }



    const apiUrl = new URL('https://api.openweathermap.org/data/2.5/weather');
    apiUrl.search = new URLSearchParams({
        q: city,
        appid: apiKey,
        units: 'metric'
    });



    try {

        const response = await fetch(apiUrl);

        const data = await response.json();



        if (!response.ok) {
            return res.status(response.status).json({
                message: data.message || 'Could not fetch weather data.'
            });
        }

        res.json(data);

    }

    catch (error) {

        console.error('Weather API error:', error.message);

        res.status(500).json({
            message: 'Something went wrong while fetching weather data.'
        });

    }

});

const server = app.listen(PORT, () => {

    console.log(`Server running on http://localhost:${PORT}`);

});

server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use. Change PORT in .env or close the other app.`);
        process.exit(1);
    }

    throw error;
});

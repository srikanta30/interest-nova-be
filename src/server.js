const express = require('express');
const app = express();
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

app.use(cors());

app.get("/", (req, res) => {
    return res.status(200).json({message: "Welcome to interest nova server."});
})

app.get("/search", async (req, res) => {

    try {

        if (req.query.q) {

            const results = await axios.get(`https://graph.facebook.com/search?type=adinterest&q=${req.query.q}&limit=10000&locale=en_US&access_token=${process.env.ACCESS_TOKEN}`);

            return res.status(200).json({ success: true, data: results.data });

        }

        else {

            return res.status(200).json({ success: true, data : [] });
        }

    } catch (err) {

        return res.status(500).json({ success: false, error: err || "Sorry, something went wrong." });

    }

});

const PORT = process.env.PORT || 3001;

app.listen(PORT, async () => {
    console.log(`Server started on port ${PORT}...`);
});


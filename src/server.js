const express = require('express');
const app = express();
const cors = require('cors');
const axios = require('axios');

app.use(cors());

app.get("/", (req, res) => {
    return res.status(200).json({message: "Welcome to interest nova server."});
})

app.post("/", async (req, res) => {

    try {

        const { searchQuery } = req.body.data;

        if (searchQuery) {

            const results = await axios.get(`https://graph.facebook.com/search?type=adinterest&q=${searchQuery}&limit=10000&locale=en_US&access_token=1039939589945829|Xy4mSGgfa0zBPdRL_Lc9ldkmEGc`);

            return res.status(200).json({ success: true, results: results.data });

        }

        else {

            return res.status(200).json({ success: true, results: [] });
        }

    } catch (err) {

        return res.status(500).json({ success: false, error: err || "Sorry, something went wrong." });

    }

});

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
    await connect();
    console.log(`Server started on port ${PORT}...`);
});


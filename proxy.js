const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

app.post("/proxy", async (req, res) => {
  try {
    console.log("Incoming data:", req.body);

    const response = await axios.post(
      "https://live-trail-server.vercel.app/api/data",
      {
        trailId: req.body.trailId,
        moisture: req.body.moisture,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": req.body.apiKey,
        },
      }
    );

    res.json(response.data);
  } catch (err) {
    console.error("Proxy fetch error:", err.message);
    res.status(500).json({ error: "Proxy error", details: err.message });
  }
});

app.listen(3000, () => {
  console.log("Proxy server running on http://localhost:3000");
});

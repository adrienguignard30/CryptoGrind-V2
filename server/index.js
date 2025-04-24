const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const X_API_TOKEN = 'AAAAAAAAAAAAAAAAAAAAACaW0gEAAAAACB636aGf6g9Js3p%2FxVfzyE9TM8M%3DVIVtpFxA8QYi6n9TuoapC5P88JZjV6hyrTQRuZcgHgRlWDEAgT';

app.get('/api/tweets/:tweetId', async (req, res) => {
  const { tweetId } = req.params;
  try {
    const response = await axios.get(`https://api.x.com/2/tweets/${tweetId}`, {
      params: { 'tweet.fields': 'text,created_at' },
      headers: { Authorization: `Bearer ${X_API_TOKEN}` },
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json(error.response?.data || { message: error.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Serveur backend démarré sur http://localhost:${PORT}`);
});
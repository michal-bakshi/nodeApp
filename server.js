const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const cors = require('cors');

// הגדרת dotenv
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
// הגדרת ה-API Key
const apiKey = process.env.RENDER_API_KEY;

// Endpoint לקבלת רשימת האפליקציות
app.get('/apps', async (req, res) => {
  try {
    const response = await axios.get('https://api.render.com/v1/services', {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });

    // שליחת רשימת האפליקציות כ-JSON
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching data from Render API:', error);
    res.status(500).send('Error fetching data from Render API');
  }
});

// האזנה לפורט
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

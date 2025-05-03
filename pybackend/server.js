const express = require('express');
const multer = require('multer');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());
const upload = multer({ dest: 'uploads/' });

let travelCards = [];

app.post('/api/cards', upload.array('images'), (req, res) => {
  const { interests, budget, climate, ecoFriendly } = req.body;
  const card = {
    id: travelCards.length + 1,
    images: req.files ? req.files.map(f => f.filename) : [],
    interests,
    budget: parseFloat(budget),
    climate,
    ecoFriendly: ecoFriendly === 'true',
  };
  travelCards.push(card);
  res.status(201).json({ message: 'Card created', card });
});

app.get('/api/cards', (req, res) => {
  res.json(travelCards);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies (for POST requests)
app.use(express.json());

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// In-memory array to store quotes
let quotes = [
  "The best way to predict the future is to invent it.",
  "Life is 10% what happens to us and 90% how we react to it.",
  "The only limit to our realization of tomorrow is our doubts of today.",
  "Do not wait to strike till the iron is hot; but make it hot by striking."
];

// GET endpoint to retrieve a random quote
// Usage: http://localhost:3000/api/quote
app.get('/api/quote', (req, res) => {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  res.json({ quote: quotes[randomIndex] });
});

// Optional: POST endpoint to add a new quote
// Example POST body: { "quote": "Your new inspirational quote." }
app.post('/api/quote', (req, res) => {
  const { quote } = req.body;
  if (!quote || typeof quote !== 'string') {
    return res.status(400).json({ error: 'Please provide a valid quote.' });
  }

  quotes.push(quote);
  res.json({ message: 'Quote added successfully.', quotes });
});

//
// GET all quotes
app.get('/api/quotes', (req, res) => {
    res.json({ quotes: quotes });
  });
//

//
//for DELETE handson in POSTMAN 
//DELETE endpoint to remove a quote by index
app.delete('/api/quote/:index', (req, res) => {
    const index = parseInt(req.params.index);
  
    if (isNaN(index) || index < 0 || index >= quotes.length) {
      return res.status(400).json({ error: 'Invalid index' });
    }
  
    const removedQuote = quotes.splice(index, 1);
    res.json({
      message: `Quote at index ${index} removed successfully.`,
      removed: removedQuote[0],
      quotes: quotes
    });
  });
//

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3003;

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// GET: /add?a=5&b=3
app.get('/add', (req, res) => {
  const a = parseFloat(req.query.a);
  const b = parseFloat(req.query.b);

  if (isNaN(a) || isNaN(b)) {
    return res.status(400).json({ error: 'Invalid numbers entered.' });
  }

  const sum = a + b;
  res.json({ result: sum });
});

// POST: /add
// Body: { "a": 20, "b": 7 }
app.post('/add', (req, res) => {
    const { a, b } = req.body;
  
    const num1 = parseFloat(a);
    const num2 = parseFloat(b);
  
    if (isNaN(num1) || isNaN(num2)) {
      return res.status(400).json({ error: 'Invalid numbers entered.' });
    }
  
    const sum = num1 + num2;
    res.json({ result: sum });
  });  

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

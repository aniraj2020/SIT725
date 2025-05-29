const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    name: "Anisha Raj",
    studentId: "s222558616"
  });
});

module.exports = router;

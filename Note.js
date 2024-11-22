const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require('child_process');

const app = express();
app.use(bodyParser.json());

app.post('/compile', (req, res) => {
  const code = req.body.code;

  // Save code to a file
  const fs = require('fs');
  fs.writeFileSync('temp.c', code);

  // Compile and execute the code
  exec('gcc temp.c -o temp && ./temp', (error, stdout, stderr) => {
    if (error) {
      res.json({ output: stderr });
    } else {
      res.json({ output: stdout });
    }
  });
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

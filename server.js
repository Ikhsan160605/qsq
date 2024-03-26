const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.post('/api/data', (req, res) => {
    const { name, data } = req.body;
    const db = JSON.parse(fs.readFileSync('db.json', 'utf-8'));
    db.data.push({ name, data });
    fs.writeFileSync('db.json', JSON.stringify(db, null, 2));
    res.json({ message: 'Data added successfully', newData: { name, data } });
});

app.use(express.static('public'));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

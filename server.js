const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static(__dirname));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio');

const Contact = mongoose.model('Contact', {
    name: String,
    email: String,
    message: String,
    date: { type: Date, default: Date.now }
});

app.post('/api/contact', async (req, res) => {
    try {
        const contact = new Contact(req.body);
        await contact.save();
        res.status(200).json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Failed to save' });
    }
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running`));

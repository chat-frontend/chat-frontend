const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const groupsFile = './groups.json';

// Guruhlar ro'yxatini olish
app.get('/api/groups', (req, res) => {
    if (fs.existsSync(groupsFile)) {
        const data = fs.readFileSync(groupsFile);
        res.json(JSON.parse(data));
    } else {
        res.json([]);
    }
});

// Yangi guruh yaratish
app.post('/api/groups', (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ error: 'Guruh nomi kerak' });
    }

    let groups = [];
    if (fs.existsSync(groupsFile)) {
        groups = JSON.parse(fs.readFileSync(groupsFile));
    }

    const newGroup = { id: Date.now(), name };
    groups.push(newGroup);
    fs.writeFileSync(groupsFile, JSON.stringify(groups, null, 2));
    res.status(201).json(newGroup);
});

app.listen(PORT, () => {
    console.log(`Server https://chat-frontend.github.io/chat-frontend/:${PORT} da ishlayapti`);
});

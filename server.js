const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const connectDB = require('./db');
const User = require('./User');

const app = express();
connectDB();

app.use(cors());
app.use(bodyParser.json());

// Обслуживание статических файлов
app.use(express.static(__dirname)); // Для всех файлов в корне проекта

// Получить карму пользователя
app.get('/karma/:username', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username });
        if (user) {
            res.json({ karma: user.karma });
        } else {
            res.status(404).json({ msg: 'Пользователь не найден' });
        }
    } catch (error) {
        res.status(500).json({ msg: 'Ошибка сервера', error });
    }
});

// Обновить карму пользователя
app.post('/karma/:username', async (req, res) => {
    const { amount } = req.body;
    try {
        const user = await User.findOneAndUpdate(
            { username: req.params.username },
            { $inc: { karma: amount } },
            { new: true, upsert: true }
        );
        res.json({ karma: user.karma });
    } catch (error) {
        res.status(500).json({ msg: 'Ошибка сервера', error });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

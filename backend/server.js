const express = require('express');

// initialize express into a variable app
const app = express();

app.get('/', (req, res) => res.send('Hello'));

// Define Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/movierate', require('./routes/movieRate'));
app.use('/api/watchlist', require('./routes/watchList'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

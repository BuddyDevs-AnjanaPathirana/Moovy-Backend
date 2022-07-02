const express = require('express');
const app = express();

app.use(express.json())

const genres = [
    { id: 1, name: 'action' },
    { id: 2, name: 'Horror' },
    { id: 3, name: 'Romance' }
]

//Genres API

//Getting all genres 

app.get('/api/genres', (req, res) => {
    res.send(genres);
})

//Getting genre with a id

app.get('/api/genres/:id', (req, res) => {
    const genre = genres.find(genre => genre.id === parseInt(req.params.id));
    if (!genre) res.status(404).send('Genre with the given ID was not found');
    res.send(genre);
})

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`))
const express = require('express');
const Joi = require('joi')
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

//Creating a new genre

app.post('/api/genres', (req, res) => {
    const { error } = validateGenre(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    const genre = {
        id: genres.length + 1,
        name: req.body.name
    };
    genres.push(genre);
    res.send(genre);
})



function validateGenre(genre) {
    const schema = {
        name: Joi.string().min(3).required()
    }

    return Joi.validate(genre, schema)
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`))
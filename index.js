const express = require('express');
const Joi = require('joi');
const app = express();
const genres = require('/Routes/Genres')

app.use(express.json())
app.use('/api/genres', genres);



//Define environmental variables

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
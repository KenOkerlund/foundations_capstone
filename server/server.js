require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const {SERVER_PORT} = process.env;
const { seed, getDiscs, deleteDisc, addDisc, sortDisc } = require('./controller.js')

app.use(express.json());
app.use(express.static(`${__dirname}/public`))
app.use(cors());

//seed our database
app.post('/seed', seed);

//get the discs
app.get('/discs', getDiscs);
//sort the discs
app.get('/sort/:type', sortDisc);

//delete a disc
app.delete('/discs/:id', deleteDisc);

//add a disc
app.post('/discs', addDisc);

app.listen(SERVER_PORT, () => console.log(`Listening on ${SERVER_PORT}`))
const express = require('express');
const cors = require('cors')
const fs = require('fs');
const bodyParser = require('body-parser');
import { postgraphile } from 'postgraphile';

import getBeerlist from './database/functions/getBeerList' 
import getFavoritfoodoptions from './database/functions/getFavoritfoodoptions' 
import createUser from './database/functions/createUser'
import createFavoritFoodOptions from './database/functions/createFavoritFoodOptions'
import createFavoritBeer from './database/functions/createFavoritBeer'
import createFavoritFood from './database/functions/createFavoritFood'
import createPrivateDetails from './database/functions/createPrivatedetail'

'use strict';	
require('dotenv').config();

const app = express();
const port = process.env.PORT;
const postgres = process.env.DATABASE_URL;

console.log(`Your port is ${port}`);

app.use(postgraphile(
    "postgres://oactaquy:SVmN2rdJwsp6yAFIpD-9p3kBtMpkbTvy@suleiman.db.elephantsql.com:5432/oactaquy",
    {
        graphiql: true,
        enhanceGraphiql: true,
    }
));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))


app.listen(port, () => console.log(`Listening on port ${port}`));

app.get('/beerList', getBeerlist)
app.post('/users', createUser) 
app.post('/favoritFoodOptions', createFavoritFoodOptions)
app.get('/favoritFoodOptions', getFavoritfoodoptions) 
app.post('/privateDetails', createPrivateDetails)
app.post('/favoritFood', createFavoritFood)
app.post('/favoritBeer', createFavoritBeer)
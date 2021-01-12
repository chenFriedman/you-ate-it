const cors = require('cors')
const express = require('express');
const port = process.env.PORT || 5000;	
'use strict';	
const fs = require('fs');
const bodyParser = require('body-parser');

require('dotenv').config();

const app = express();
import {postgraphile} from 'postgraphile';
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

import getBeerlist from './database/functions/getBeerList' 
import getFavoritfoodoptions from './database/functions/getFavoritfoodoptions' 
import createUser from './database/functions/createUser'
import createFavoritFoodOptions from './database/functions/createFavoritFoodOptions'
import createFavoritBeer from './database/functions/createFavoritBeer'
import createFavoritFood from './database/functions/createFavoritFood'
import createPrivateDetails from './database/functions/createPrivatedetail'

app.listen(port, () => console.log(`Listening on port ${port}`));

app.get('/beerList', getBeerlist)
app.post('/users', createUser) 
app.post('/favoritFoodOptions', createFavoritFoodOptions)
app.get('/favoritFoodOptions', getFavoritfoodoptions) 
app.post('/privateDetails', createPrivateDetails)
app.post('/favoritFood', createFavoritFood)
app.post('/favoritBeer', createFavoritBeer)
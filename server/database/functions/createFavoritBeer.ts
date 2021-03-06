import { request } from 'graphql-request';
import { Request, Response } from 'express';

import { createFavoritBeerMutation } from '../mutations/createFavoritBeerMutation'

const createFavoritBeer = async (req: Request, res: Response) => {
    try {
        const data = await request(String(process.env.GRAPHQL_URL), createFavoritBeerMutation, {
            email: req.body.email,
            favoriteFoodOrBeer: req.body.favoriteFoodOrBeer
        });
        res.send('added')
    } catch (error) {
        return res.status(400).send(error)
    }
}

export default createFavoritBeer
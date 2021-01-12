import { request } from 'graphql-request';
import { Request, Response } from 'express';

import { createFavoritBeerMutation } from '../mutations/createFavoritBeerMutation'

const createFavoritBeer = async (req: Request, res: Response) => {
    console.log('in createFavoritBeer')
    try {
        const data = await request("http://localhost:5000/graphql", createFavoritBeerMutation, {
            email: req.body.email,
            favoriteFoodOrBeer: req.body.favoriteFoodOrBeer
        });
        res.send('added')
    } catch (error) {
        return res.status(400).send(error)
    }
}

export default createFavoritBeer
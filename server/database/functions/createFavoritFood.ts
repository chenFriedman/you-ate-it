import { request } from 'graphql-request';
import { Request, Response } from 'express';

import { createFavoritFoodMutation } from '../mutations/createFavoritFoodMutation'

const createFavoritFood = async (req: Request, res: Response) => {
    try {
        const data = await request(String(process.env.GRAPHQL_URL), createFavoritFoodMutation, {
            email: req.body.email,
            favoriteFoodOrBeer: req.body.favoriteFoodOrBeer
        });
        res.send('added')
    } catch (error) {
        return res.status(400).send(error)
    }
}

export default createFavoritFood
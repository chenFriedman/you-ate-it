import { request } from 'graphql-request';
import { Request, Response } from 'express';

import { createFavoritFoodOptionsMutation } from '../mutations/createFavoritFoodOptionsMutation'

const createFavoritFoodOptions  = async (req: Request, res: Response) => {
    try {
        const data = await request(String(process.env.GRAPHQL_URL), createFavoritFoodOptionsMutation, {
            value: req.body.value,
            key: req.body.key,
        });
        res.send('success')
    } catch (error) {
        return res.status(400).send(error)
    }
}

export default createFavoritFoodOptions
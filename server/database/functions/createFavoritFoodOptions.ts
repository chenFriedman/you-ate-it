import { request } from 'graphql-request';
import { Request, Response } from 'express';

import { createFavoritFoodOptionsMutation } from '../mutations/createFavoritFoodOptionsMutation'

const createFavoritFoodOptions  = async (req: Request, res: Response) => {
    try {
        console.log('in createFavoritFoodOptions', req.body.value, req.body.key)
        const data = await request("http://localhost:5000/graphql", createFavoritFoodOptionsMutation, {
            value: req.body.value,
            key: req.body.key,
        });
        res.send('success')
    } catch (error) {
        return res.status(400).send(error)
    }
}

export default createFavoritFoodOptions
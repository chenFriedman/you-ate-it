import { request } from 'graphql-request';
import { Request, Response } from 'express';

import { createUserMutation } from '../mutations/createUserMutation'

const createUser = async (req: Request, res: Response) => {
    try {
        const data = await request(String(process.env.GRAPHQL_URL), createUserMutation, {
            email: req.body.email,
        });
        res.send('user added')
    } catch (error) {
        return res.status(400).send(error)
    }
}

export default createUser
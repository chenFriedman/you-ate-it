import { request } from 'graphql-request';
import { Request, Response } from 'express';

import { createPrivatedetailsMutation } from '../mutations/createPrivatedetailMutation'

const createPrivateDetails = async (req: Request, res: Response) => {    
    try {
        const data = await request(String(process.env.GRAPHQL_URL), createPrivatedetailsMutation, {
            email: req.body.email,
            firstname: req.body.firstName,
            lastname: req.body.lastName,
            birthdate: req.body.birthdate,
            id: req.body.id,
            phone: req.body.phone
        });
        res.send("added")
    } catch (error) {
        return res.status(400).send(error)
    }
}

export default createPrivateDetails
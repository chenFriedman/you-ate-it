import { request } from 'graphql-request';
import { Request, Response } from 'express';

import { getFavoritfoodoptionsQuery } from '../queries/getFavoritfoodoptionsQuery'

const getFavoritfoodoptions = async (req: Request, res: Response) => {
    try {
        const data = await request(String(process.env.GRAPHQL_URL), getFavoritfoodoptionsQuery)
        if (!data) {
            return res.status(400).send(data)
        }
        res.send(data.allFavoritfoodoptions.nodes)
        // res.send([{id:1 ,val: 'ice', key:'ice'}])    
    } catch (error) {
        return res.status(400).send(error)
    }
}

export default getFavoritfoodoptions
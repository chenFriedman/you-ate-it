import { request } from 'graphql-request';
import { Request, Response } from 'express';

import { getBeerListQuery } from '../queries/getBeerListQuery'

const getBeerlist = async (req: Request, res: Response) => {
    try {
        const data = await request(String(process.env.GRAPHQL_URL), getBeerListQuery)
        if (!data) {
            return res.status(400).send(data)
        }
        const beerList: Array<string> = data.allBeerlists.nodes.map((node: { beername: string }) => (node.beername))
        res.send(beerList)    
    } catch (error) {
        return res.status(400).send(error)
    }
}

export default getBeerlist
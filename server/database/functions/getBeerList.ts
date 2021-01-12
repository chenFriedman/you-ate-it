import { request } from 'graphql-request';
import { Request, Response } from 'express';

import { getBeerListQuery } from '../queries/getBeerListQuery'

const getBeerlist = async (req: Request, res: Response) => {
    try {
        const data = await request("http://localhost:5000/graphql", getBeerListQuery)
        if (!data) {
            return res.status(400).send(data)
        }
        const beerList: any = data.allBeerlists.nodes.map((node: any) => (node.beername))
        res.send(beerList)    
    } catch (error) {
        return res.status(400).send(error)
    }
}

export default getBeerlist
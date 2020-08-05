import { Request, Response } from 'express'

//Database Connection
import db from '../database/connection'

export default class ConnectionsController {
  async store(req: Request, res: Response) {
    const { user_id } = req.body

    await db('connections').insert({
      user_id,
    })

    return res.status(201).json({ message: 'Connection created!'})
  }
  
  async index(req: Request, res: Response) {
    const totalConnections = await db('connections'). count('* as total')

    const { total } = totalConnections[0]

    return res.json({ total })
  }
}

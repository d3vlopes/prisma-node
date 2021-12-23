import { Request, NextFunction, Response } from 'express'
import { verify } from 'jsonwebtoken'

interface IPayload {
  sub: string
}

export async function ensureAuthenticateDeliveryman(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({
      message: 'Token missing',
    })
  }

  const [, token] = authHeader.split(' ')

  try {
    const { sub } = verify(
      token,
      '019acc25a4e242bb77ad489832ada12d',
    ) as IPayload

    req.id_deliveryman = sub

    return next()
  } catch (error) {
    return res.status(401).json({
      message: 'Invalid token!',
    })
  }
}

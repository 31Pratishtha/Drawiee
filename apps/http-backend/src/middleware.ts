import { JWT_SECRET } from '@repo/backend-common/config'
import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

export function middleware(req: Request, res: Response, next: NextFunction) {
	try {
		const token = req.cookies?.['auth_token']
		const decoded = jwt.verify(token, JWT_SECRET)

		if (decoded) {
      //@ts-ignore //todo
			req.userId = decoded.userId
			next()
		}
	} catch (error) {
		return res.status(403).json({
			message: 'Unauthorized',
		})
	}
}

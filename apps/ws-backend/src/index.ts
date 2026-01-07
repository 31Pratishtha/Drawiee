import 'dotenv/config'

import { JWT_SECRET } from '@repo/backend-common/config'
import { prisma } from '@repo/db/client'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { WebSocket, WebSocketServer } from 'ws'

interface User {
	ws: WebSocket
	rooms: string[]
	userId: string
}

const users: User[] = []

const wss = new WebSocketServer({ port: 8080 })


const checkUser = (token: string): string | null => {
	try {
		const decoded = jwt.verify(token, JWT_SECRET)

		if (typeof decoded == 'string') {
			return null
		}

		if (!decoded || !(decoded as JwtPayload).userId) {
			return null
		}

		return decoded.userId
	} catch (e) {
		return null
	}
}

wss.on('connection', function connection(ws, request) {
	const url = request.url

	if (!url) {
		return
	}

	const queryParams = new URLSearchParams(url.split('?')[1])

	const token = queryParams.get('token') ?? ''

	const userId = checkUser(token)

	if (!userId) {
		ws.close()
		return null
	}

	users.push({
		ws,
		rooms: [],
		userId,
	})

	ws.on('message', async function message(data) {
		try {

			const parsedData = JSON.parse(data as unknown as string)

			if (parsedData.type === 'join_room') {
				const roomId = parsedData.roomId

				const checkRoom = await prisma.room.findUnique({
					where: {
						id: roomId
					}
				})

				if(!checkRoom){
					throw new Error('Room not found')
				}

				const user = users.find((u) => u.ws === ws)
				if(!user?.rooms.includes(parsedData.roomId)){
					user?.rooms.push(parsedData.roomId)
				}
			}

			if (parsedData.type === 'leave_room') {
				const user = users.find((u) => u.ws === ws)
				if (!user) {
					return
				}
				user.rooms = user?.rooms.filter((r) => r !== parsedData.roomId)
			}

			if (parsedData.type === 'chat') {
				const roomId = parsedData.roomId
				const message = parsedData.message

				await prisma.chat.create({
					data: {
						message,
						roomId,
						userId
					}
				})

				users.forEach((user) => {
					if (user.rooms.includes(roomId)) {
						user.ws.send(
							JSON.stringify({
								type: 'chat',
								message: message,
								roomId,
							})
						)
					}	
				})
			}
		} catch (e) {
			return e
		}
	})
})
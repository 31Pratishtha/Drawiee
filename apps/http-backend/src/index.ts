import 'dotenv/config'
import {
	CreateRoomSchema,
	CreateUserSchema,
	SignInSchema,
} from '@repo/common/types'
// import { prisma } from '@repo/db/client'
import express from 'express'
import { middleware } from './middleware.js'
import { JWT_SECRET} from '@repo/backend-common/config'
 
const app = express()
app.use(express.json())

console.log('Chal gayaa')
console.log(process.env.JWT_SECRET)
console.log('from env', JWT_SECRET)

//Signup
app.post('/signup', async (req, res) => {
	console.log('Signup called')
	//db call
	const parsedData = CreateUserSchema.safeParse(req.body)

	if (!parsedData.success) {
		console.log(parsedData.error)
		return res.json({
			message: 'Incorrect Input',
		})
	}

	try {
		console.log('Creating user')
		// const user = await prisma.user.create({
		// 	data: {
		// 		email: parsedData.data?.email,

		// 		//todo: hash password
		// 		password: parsedData.data.password,
		// 		name: parsedData.data.name,
		// 	},
		// })


		// res.json({
		// 	userId: user.id,
		// })
	} catch (e) {
		console.log('error: ', e)
		res.status(411).json({
			message: 'Error creating user',
		})
	}
})

app.post('/signin', async (req, res) => {
  console.log("Signin called")

	// const parsedData = SignInSchema.safeParse(req.body)

	// //todo: compare hashed password
	// if (!parsedData.success) {
	// 	console.log(parsedData.error)
	// 	return res.json({
	// 		message: 'Incorrect Input',
	// 	})
	// }

	// const user = await prisma.user.findFirst({
	// 	where: {
	// 		email: parsedData.data.username,
	// 		password: parsedData.data.password
	// 	}
	// })

	// if(!user){
	// 	res.status(403).json({
	// 		message: "Not authorized"
	// 	})
	// 	return
	// }

	// const token = jwt.sign({ userId: user?.id }, JWT_SECRET)

	// res.json({
	// 	token,
	// })
})

app.post('/room', middleware, async (req, res) => {
	//db call
	// const parsedData = CreateRoomSchema.safeParse(req.body)

	// if(!parsedData.success){
	// 	console.log(parsedData.error)
	// 	res.json({
	// 		message: 'Incorrect Input from room'
	// 	})
	// 	return
	// }

	//@ts-ignore //todo
	const userId = req.userId

	// try {
	// 	const room = await prisma.room.create({
	// 	data: {
	// 		slug: parsedData.data.name,
	// 		adminId: userId
	// 	}
	// })

	// res.json({
	// 	roomId: room.id
	// })
	
	// } catch (e) {
	// 	res.status(411).json({
	// 		message: 'Error creating room'
	// 	})
		
	// }

	
})

app.listen(3001, () => {
	console.log('Server is running on port 3001');
})
import { JWT_SECRET } from '@repo/backend-common/config'
import { CreateUserSchema, SignInSchema } from '@repo/common/types'
import express from 'express'
import jwt from 'jsonwebtoken'
import { middleware } from './middleware'

const app = express()
app.use(express.json())

//Signup
app.post('/signup', (req, res) => {

  //db call

  const data = CreateUserSchema.safeParse(req.body)

  if(!data.success){
    return res.json({
      message: "Incorrect Input"
    })
  }
  res.json({
    userId: '123'
  })
  
})

app.post('/signin', (req, res) => {

  const data = SignInSchema.safeParse(req.body)
  if(!data.success){
    return res.json({
      message: "Incorrect Input"
    })
  }
  const userId = 1
  const token = jwt.sign({userId}, JWT_SECRET)

  res.json({
    token
  }) 
})

app.post('/room', middleware, (req, res) => {
  //db call

  res.json({
    roomId: '101'
  })
})

app.listen(3001)
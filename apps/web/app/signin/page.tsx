'use client'
import { useContext, useState } from 'react'
import { AuthContext } from '../../providers'

export default function SignIn() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const {signIn} = useContext(AuthContext)

	const handleSignIn = async () => {
		const message = await signIn({email, password})
	}
	return (
		<>
			<h1>Sign In</h1>
			<input
				type='email'
				placeholder='Email'
				value={email}
				onChange={(e) => setEmail(e.target.value)}
			/>
			<input
				type='password'
				placeholder='Password'
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>
			<button onClick={handleSignIn}>Sign In</button>
		</>
	)
}

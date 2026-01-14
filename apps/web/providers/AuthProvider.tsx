'use client'

import { useRouter } from 'next/navigation'
import React, { createContext, useEffect, useState } from 'react'
import { IUser } from '../interfaces'
import { apiClient } from '../api/client'

interface IAuthContext {
	user: IUser | null
	signIn: ({email, password}: {email: string, password: string}) => Promise<string>
	signUp: ({email, password, name}: {email: string, password: string, name: string}) => Promise<string>
	loading: boolean
}

export const AuthContext = createContext<IAuthContext>({
	user: null,
	signIn: async () => '',
  signUp: async () => '',
	loading: false,
})

export default function AuthProvider({
	children,
}: {
	children: React.ReactNode
}) {
	const [user, setUser] = useState<IUser | null>(null)
	const [loading, setLoading] = useState(false)

  const router = useRouter()

  useEffect(() => {
    fetchUser()
  }, [])
 
	const fetchUser = async () => {
    setLoading(true)
    try {
      const { data } = await apiClient.get('/me')
		  setUser(data)      
    } catch (error) {
      setUser(null)
    } finally {
      setLoading(false)
    }
		
	}

	const signIn = async ({
		email,
		password,
	}: {
		email: string
		password: string
	}) => {
		try {
			setLoading(true)
			const response = await apiClient.post('/signin', {
				email,
				password,
			})

        await fetchUser()
        router.push('/')

			return response.data
		} catch (error) {
      setUser(null)
			throw error
		} finally {
			setLoading(false)
		}
	}


  const signUp = async ({
		email,
		password,
    name,
	}: {
		email: string
		password: string
    name: string
	}) => {
		try {
			setLoading(true)
			const response = await apiClient.post('/signup', {
				email,
				password,
        name,
			})

      await fetchUser()

      router.push('/')

			return response.data
		} catch (error) {
			throw error
		} finally {
			setLoading(false)
		}
	}

	return (
		<AuthContext.Provider value={{ user, signIn, signUp, loading }}>
			{children}
		</AuthContext.Provider>
	)
}

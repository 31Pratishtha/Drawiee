'use client'
import { useEffect, useState } from 'react'
import useConnectWebSocket from '../hooks/useConnectWebSocket'

interface IChatRoomClientProps {
	roomId: number
}
export default function ChatRoomClient({ roomId }: IChatRoomClientProps) {
	const { isConnecting, socket } = useConnectWebSocket()

	const [message, setMessage] = useState('')

	useEffect(() => {
		if (socket && !isConnecting) {
			socket.send(
				JSON.stringify({
					type: 'join_room',
					roomId: roomId,
				})
			)
		}
	}, [socket, isConnecting])

	if (isConnecting) {
		return <div>Connecting to the chat room...</div>
	}

	if (!socket) {
		return <div>Couldn't connect to the chat room</div>
	}

	const sendMessage = (message: string) => {
		socket.send(message)
	}

	return (
		<>
			<input
				type='text'
				placeholder='Message'
				value={message}
				onChange={(e) => setMessage(e.target.value)}
			/>
			<button onClick={() => sendMessage(message)}>Send</button>
		</>
	)
}

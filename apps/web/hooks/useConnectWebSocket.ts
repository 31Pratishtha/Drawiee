import { useEffect, useState } from 'react'
import { WS_URL } from '../config'

export default function useConnectWebSocket() {
	const [isConnecting, setIsConnecting] = useState<boolean>(true)
	const [socket, setSocket] = useState<WebSocket | null>(null)

	useEffect(() => {
		const ws = new WebSocket(WS_URL)

		ws.onopen = () => {
			setIsConnecting(false)
			setSocket(ws)
		}
	}, [])

	return { isConnecting, socket}
}

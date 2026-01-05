'use client'

import { useState } from 'react'
import styles from './page.module.css'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
	const [roomId, setRoomId] = useState<string>('')

  const handleJoinRoom = () => {
    router.push(`room/${roomId}`)
  }

	return (
		<div className={styles.page}>
			<input
				type='text'
				placeholder='Room ID'
				value={roomId}
				onChange={(e) => setRoomId(e.target.value)}
			/>
			<button onClick={handleJoinRoom}>Join Room</button>
		</div>
	)
}

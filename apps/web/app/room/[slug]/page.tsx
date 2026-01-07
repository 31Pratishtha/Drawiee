import axios from 'axios'
import { ChatRoomClient } from '../../../components'
import { HTTP_URL } from '../../../config'
import { IMessage } from '../../../interfaces'

const fetchRoomId = async (slug: string) => {
	const response = await axios.get(`${HTTP_URL}/room/${slug}`)

	if (response.status !== 200) {
		throw new Error('Room not found')
	}

	return response.data.roomId
}

const fetchChats = async (roomId: number) => {
	const response = await axios.get(`${HTTP_URL}/chats/${roomId}`)

	if (response.status !== 200) {
		throw new Error('Chats not found')
	}

	return response.data
}

export default async function ChatRoom({
	params,
}: {
	params: { slug: string }
}) {
	const slug = (await params).slug
	try {
		const roomId = await fetchRoomId(slug)

		const { messages } = await fetchChats(roomId)

		return (
			<>
				<h1>Room: {roomId}</h1>
				<div>
					{messages.map((msg: IMessage) => (
						<div key={msg.id}>{msg.message}</div>
					))}
				</div>
				<div>
					<ChatRoomClient roomId={roomId} />
				</div>
			</>
		)
	} catch (error) {
		return (
			<div>
				<h2>error: {error as string}</h2>
			</div>
		)
	}
}

import { getServerClient } from '../../../api/serverClient'
import { ChatRoomClient } from '../../../components'

const fetchRoomId = async (slug: string) => {
	const client = await getServerClient()

	try {
		const response = await client.get(`/room/${slug}`)

		return response.data.roomId
	} catch (error) {
		console.error('Error fetching room', error)
	}
}

const fetchChats = async (roomId: number) => {
	const client = await getServerClient()

	try {
		const response = await client.get(`/chats/${roomId}`)
		return response.data
	} catch (error) {
		console.error('Error fetching chats', error)
	}
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
				<ChatRoomClient roomId={roomId} messages={messages} />
			</>
		)
	} catch (error) {}
}

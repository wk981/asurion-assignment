import { useState } from 'react'
import { MessageProps } from '../types'
import { postChatBotGenerateStream } from '../api'
import ChatbotIcon from '@/assets/ChatbotIcon.jpg'
import UserProfile from '@/assets/userProfile.png'
// import { mockMessages } from '../data'

export const useChatBotHook = () => {
    // Array of messages
    const [messages, setMessages] = useState<MessageProps[]>([])

    // Streaming Message State
    const [streamMessage, setStreamMessage] = useState<MessageProps>({
        profilePic: ChatbotIcon,
        message: '',
    })

    // State for input
    const [inputValue, setInputValue] = useState('')

    const handleApiCall = async (message: string) => {
        try {
            const stream = await postChatBotGenerateStream(message)
            let intermediateMessage = ''

            for await (const chunk of stream) {
                // const cleanChunk = chunk.split("data:")[1].trim();
                intermediateMessage += chunk
                // Render stream message
                setStreamMessage((prevState) => ({
                    ...prevState,
                    message: prevState.message + chunk,
                }))
            }

            // After the for-await loop, append the completed streamMessage into messages
            setMessages((prevMessages) => [
                ...prevMessages,
                {
                    profilePic: streamMessage.profilePic,
                    message: intermediateMessage,
                },
            ])
            // Reset the streamMessage state
            setStreamMessage((prevState) => ({
                ...prevState,
                message: '',
            }))
        } catch (err) {
            /* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */
            const error = err as { message: string }
            const errorMessageObject = JSON.parse(error.message)
            console.log(errorMessageObject)
            /* eslint-enable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */
        }
    }

    const handleSearch = async (value: string) => {
        if (inputValue !== '') {
            // Temp to store so that input can be cleared
            const temp = value

            // Clear input
            setInputValue('')

            // Append to messages, user first
            setMessages((prevMessages) => [
                ...prevMessages,
                {
                    profilePic: UserProfile,
                    message: temp,
                },
            ])
            await handleApiCall(temp)
        }
    }

    return {
        messages,
        setMessages,
        streamMessage,
        setStreamMessage,
        inputValue,
        setInputValue,
        handleSearch,
    }
}

import { createContext, useState } from 'react'
import { MessageProps, ProviderProps } from '../types'
import { postChatBotGenerateStream } from '../api'
import ChatbotIcon from '@/assets/ChatbotIcon.png'
import UserProfile from '@/assets/userProfile.png'

export interface ChatBotContextValue {
    messages: MessageProps[],
    setMessages: React.Dispatch<React.SetStateAction<MessageProps[]>>,
    streamMessage: MessageProps,
    setStreamMessage: React.Dispatch<React.SetStateAction<MessageProps>>,
    inputValue: string,
    setInputValue: React.Dispatch<React.SetStateAction<string>>,
    handleSearch: (value: string) => Promise<void>,
    isLoading: boolean,
    autocompleteValue: string;
    setAutocompleteValue: React.Dispatch<React.SetStateAction<string>>
}

const ChatBotContext = createContext<ChatBotContextValue|undefined>(undefined)

const ChatBotProvider = ({children}:ProviderProps) => {
    // Array of messages
    const [messages, setMessages] = useState<MessageProps[]>([
        {
            profilePic: ChatbotIcon,
            message: 'Hello sir, what do you want to know about DeviceCare?',
        }
    ])

    const [autocompleteValue, setAutocompleteValue] = useState('');

    // Streaming Message State
    const [streamMessage, setStreamMessage] = useState<MessageProps>({
        profilePic: ChatbotIcon,
        message: '',
    });

    // loading State
    const [isLoading, setIsLoading] = useState<boolean>(false)

    // State for input
    const [inputValue, setInputValue] = useState('')

    const handleApiCall = async (message: string) => {
        try {
            setIsLoading(true)
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
            setIsLoading(false)
        } catch (err) {
            /* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */
            const error = err as { message: string }
            const errorMessageObject = JSON.parse(error.message)
            console.log(errorMessageObject)
            setIsLoading(false)
            /* eslint-enable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */
        }
    }

    const handleSearch = async (value: string) => {
        if (inputValue !== '' || value !== '') {
            // Temp to store so that input can be cleared
            const temp = value

            // Clear input
            setInputValue('');

            setAutocompleteValue('');

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

    const value = {
        messages,
        setMessages,
        streamMessage,
        setStreamMessage,
        inputValue,
        setInputValue,
        handleSearch,
        isLoading,
        autocompleteValue, 
        setAutocompleteValue
    }
    return <ChatBotContext.Provider value = {value}>{children}</ChatBotContext.Provider>
}

export { ChatBotProvider, ChatBotContext };
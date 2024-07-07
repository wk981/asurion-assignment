import { useFAQHook } from '../hooks/useFAQHook'
import { MessageProps } from '../types'
import { ChatMessage } from './ChatMessage'
import { FAQButton } from './FAQButton'

interface ChatWindowProps {
    data: MessageProps[]
    streamMessage: MessageProps
    messageContainerRef: React.MutableRefObject<HTMLDivElement | null>
    handleScroll: any
    isStreamingLoading: boolean
    handleSearch: (value: string) => Promise<void>
}

export const ChatWindow = ({
    data,
    streamMessage,
    messageContainerRef,
    handleScroll,
    isStreamingLoading,
    handleSearch,
}: ChatWindowProps) => {
    const { faq } = useFAQHook()

    return (
        <div className="w-full h-full">
            <div
                className={`w-full my-4 flex-1`}
                ref={messageContainerRef}
                onScroll={handleScroll}
            >
                <div className={`px-4 max-w-5xl mx-auto mt-4`}>
                    {data.map((item, index) => {
                        return (
                            <ChatMessage
                                message={item.message}
                                profilePic={item.profilePic}
                                key={index}
                            />
                        )
                    })}
                    {streamMessage.message !== '' && (
                        <ChatMessage
                            profilePic={streamMessage.profilePic}
                            message={streamMessage.message}
                        />
                    )}
                    <div className="flex flex-col min-w-[300px] w-3/4 sm:w-[24rem] gap-1 mt-2 ml-12">
                        {isStreamingLoading === false &&
                            faq.map((item, index) => (
                                <FAQButton
                                    question={item}
                                    handleSearch={handleSearch}
                                    key={index}
                                />
                            ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

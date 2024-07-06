import { MessageProps } from '../types'
import { ChatMessage } from './ChatMessage'

interface ChatWindowProps {
    data: MessageProps[]
    streamMessage: MessageProps
    messageContainerRef: React.MutableRefObject<HTMLDivElement | null>
    handleScroll: any
}

export const ChatWindow = ({
    data,
    streamMessage,
    messageContainerRef,
    handleScroll,
}: ChatWindowProps) => {
    return (
        <div className="w-full h-full">
            <div
                className={`w-full my-4 flex-1`}
                ref={messageContainerRef}
                onScroll={handleScroll}
            >
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
            </div>
        </div>
    )
}

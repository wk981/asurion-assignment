import { ChatInput } from '../../components/ChatInput'
import { useChatBotHook } from '../../hooks/useChatBotHook'
import { useChatScroll } from '../../hooks/useChatScroll'
import { ChatWindow } from '../../components/ChatWindow'
import { ScrollIntoViewButton } from '../../components/ScrollIntoViewButton'

export const ChatBotPage = () => {
   const {
        messages,
        streamMessage,
        inputValue,
        setInputValue,
        handleSearch,
    } = useChatBotHook()

    const {
        messageContainerRef,
        scrollBarContainerRef,
        handleClickScrollIntoView,
		isBottom,
        handleScroll
    } = useChatScroll({ messages, streamMessage })

    return (
        <div className="relative h-screen">
            <div className="flex flex-col gap-9 w-full h-full justify-center items-center py-6">
                <div
                    className="flex-grow w-full h-full flex justify-center items-center overflow-y-auto sm:px-1 px-0"
					ref={scrollBarContainerRef} onScroll={handleScroll}
                >
						<ScrollIntoViewButton handleClickScrollIntoView={handleClickScrollIntoView} isBottom={isBottom} />
                        <ChatWindow
                            data={messages}
                            streamMessage={streamMessage}
                            messageContainerRef={messageContainerRef}
                            handleScroll={handleScroll}
                        />

                </div>
				<ChatInput
                        inputValue={inputValue}
                        setInputValue={setInputValue}
                        handleSearch={handleSearch}
                    />
            </div>
        </div>
    )
}

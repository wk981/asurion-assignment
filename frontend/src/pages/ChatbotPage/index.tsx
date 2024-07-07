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
        isLoading: isStreamingLoading
    } = useChatBotHook();

    const {
        messageContainerRef,
        scrollBarContainerRef,
        handleClickScrollIntoView,
		isBottom,
        handleScroll
    } = useChatScroll({ messages, streamMessage });

    return (
        <div className="relative h-screen">
            <div className="flex flex-col h-full gap-9 w-full justify-center items-center py-6">
                <div
                    className="flex-grow w-full flex justify-center items-center overflow-y-auto sm:px-1 px-0"
					ref={scrollBarContainerRef} onScroll={handleScroll}
                >
						<ScrollIntoViewButton handleClickScrollIntoView={handleClickScrollIntoView} isBottom={isBottom} />
                        <ChatWindow
                            data={messages}
                            streamMessage={streamMessage}
                            messageContainerRef={messageContainerRef}
                            handleScroll={handleScroll}
                            isStreamingLoading = {isStreamingLoading}
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

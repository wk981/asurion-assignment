import { useEffect, useRef, useState } from 'react'
import { UseChatScrollProps } from '../types'

export const useChatScroll = ({
    messages,
    streamMessage,
}: UseChatScrollProps) => {
    const [isBottom, setIsBottom] = useState<boolean>(true)

    // ref for messageContainerDiv
    const messageContainerRef = useRef<HTMLDivElement | null>(null)

    // ref for scrollDiv
    const scrollBarContainerRef = useRef<HTMLDivElement | null>(null)

    const handleClickScrollIntoView = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()
        messageContainerRef.current?.scrollIntoView({ block: 'end' })
    }

    // When messge state is update, the user will be dragged to the bottom of chat.
    useEffect(() => {
        // Scroll to the bottom
        messageContainerRef.current?.scrollIntoView({
            block: 'end',
            behavior: 'smooth',
        })
    }, [messages])

    // When the component is mounted, the view of the chat will be at the bottom of the scroll
    useEffect(() => {
        // Scroll to the bottom
        messageContainerRef.current?.scrollIntoView({ block: 'end' })
    }, [streamMessage])

    // function to set state when user is not at the bottom
    const handleScroll = () => {
        if (scrollBarContainerRef.current) {
            // Destruct relevants metrics
            const { scrollHeight, scrollTop, clientHeight } =
                scrollBarContainerRef.current
            // Formula whether user is bottom of the scrollbar div
            setIsBottom(
                Math.round(scrollHeight - scrollTop - 40.66) <= clientHeight
            )
        }
    }
    return {
        messageContainerRef,
        scrollBarContainerRef,
        handleClickScrollIntoView,
        isBottom,
        handleScroll
    }
}

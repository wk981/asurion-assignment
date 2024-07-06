export interface MessageProps {
	profilePic: string | null | undefined;
	message: string;
}

export interface UseChatScrollProps {
    messages: MessageProps[],
    streamMessage: MessageProps
}
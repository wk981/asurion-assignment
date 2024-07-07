import { ReactNode } from "react";

export interface MessageProps {
	profilePic: string | null | undefined;
	message: string;
}

export interface UseChatScrollProps {
    messages: MessageProps[],
    streamMessage: MessageProps
}

export interface ProviderProps {
    children: ReactNode;
}
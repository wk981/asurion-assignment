import { useContext } from 'react'
import { ChatBotContext, ChatBotContextValue } from '../contexts/ChatBotProvider'
// import { mockMessages } from '../data'

export const useChatBotHook = ():ChatBotContextValue => {
    const context = useContext(ChatBotContext);

    if(!context){
        throw new Error("useChatBotHook must be used within a ChatBotProvider")
    }

    return context;
}

import { useContext } from "react"
import { FAQContext } from "../contexts/FAQProvider"

export const useFAQHook = () => {
    const context = useContext(FAQContext);
    if(!context){
        throw new Error("useFAQHook must be used within a ChatBotProvider")
    }

    return context;
}

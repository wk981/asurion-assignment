import { useEffect, useRef, useState } from "react"
import { getFAQ } from "../api"

export const useFAQHook = () => {
    // FAQ
    const [faq, setFaq] = useState<string[]>([''])

    // loading State
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const didMount = useRef(false)
    const handleFAQ = async () => {
        try {
            setIsLoading(true);
            const response = await getFAQ()
            const FAQmessages = await response.json()
            setFaq(FAQmessages)
        } catch (e) {
            console.log(e);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (didMount.current === false) {
            handleFAQ()
            didMount.current = true
        }
    }, []);

    return {
        faq,
        isLoading
    }
}

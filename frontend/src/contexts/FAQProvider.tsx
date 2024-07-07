import { ProviderProps } from "../types";
import { useEffect, useRef, useState, createContext } from "react";
import { getFAQ } from "../api";
export interface FAQContextValue {
    faq: string[];
    isLoading: boolean;
};

const FAQContext = createContext<FAQContextValue|undefined>(undefined);

const FAQProvider = ({children}:ProviderProps) =>{
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

        const value = {
            faq,
            isLoading
        }

        return <FAQContext.Provider value={value}>{children}</FAQContext.Provider>

}

export {FAQContext, FAQProvider};
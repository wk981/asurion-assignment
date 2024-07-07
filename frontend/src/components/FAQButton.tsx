import { useChatBotHook } from '../hooks/useChatBotHook'
import { Button } from './ui/button'

interface FAQButtonProps {
    question: string;
    disabled?: boolean;
}

export const FAQButton = ({ question,disabled }: FAQButtonProps) => {
    const { handleSearch } = useChatBotHook()

    const handleClick = async () => {
        console.log('Clicked')
        await handleSearch(question)
    }

    return (
        <Button
            className="text-[0.7rem] h-10 sm:h-8 py-2 whitespace-normal bg-white"
            variant="secondary"
            size="sm"
            onClick={handleClick}
            disabled={disabled}
        >
            {question}
        </Button>
    )
}

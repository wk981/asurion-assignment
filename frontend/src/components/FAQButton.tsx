import { Button } from './ui/button'

interface FAQButtonProps {
    question: string
    handleSearch: (value: string) => Promise<void>
}

export const FAQButton = ({ question, handleSearch }: FAQButtonProps) => {
    const handleClick = async () => {
        console.log("Clicked")
        await handleSearch(question)
    }

    return (
        <Button
            className="text-[0.7rem] h-10 sm:h-8 py-2 whitespace-normal"
            variant="secondary"
            size="sm"
            onClick={handleClick}
        >
            {question}
        </Button>
    )
}

import { Button } from './ui/button'
import { Input } from './ui/input'
import { useChatBotHook } from '../hooks/useChatBotHook'
interface ChatInputProps {
    inputValue: string
    setInputValue: React.Dispatch<React.SetStateAction<string>>
    handleSearch: (value: any) => Promise<void>
}
export const ChatInput = ({
    inputValue,
    setInputValue,
    handleSearch,
}: ChatInputProps) => {
    const { autocompleteValue } = useChatBotHook()
    const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch(inputValue)
        }
    }
    return (
        <div className="flex w-full max-w-5xl items-center space-x-2 px-4">
            <div className="relative w-full">
                <div className="absolute top-2.5 left-[0.8rem] text-gray-500 text-sm bg-transparent sm:w-full w-5/6 truncate ">
                    {autocompleteValue}
                </div>
                <Input
                    className="rounded-2xl "
                    placeholder={'Ask your questions!'}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyUp={handleKeyUp}
                />
            </div>
            <Button onClick={() => handleSearch(inputValue)}>Send</Button>
        </div>
    )
}

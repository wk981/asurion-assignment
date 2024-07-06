import { Button } from "./ui/button";
import { Input } from "./ui/input";
interface ChatInputProps {
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  handleSearch: (value: any) => Promise<void>; 
}
export const ChatInput = ({inputValue, setInputValue, handleSearch}:ChatInputProps) => {
  return (
    <div className="flex w-full max-w-5xl items-center space-x-2 px-4">
      <Input className="rounded-2xl" placeholder="Ask your questions!" value={inputValue} onChange={(e) => setInputValue(e.target.value)}/>
      <Button onClick={() => handleSearch(inputValue)}>Send</Button>
    </div>
  )
}

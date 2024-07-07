import { ChatBotProvider } from './contexts/ChatBotProvider'
import { FAQProvider } from './contexts/FAQProvider'
import { ChatBotPage } from './pages/ChatbotPage'

function App() {

  return (
    <ChatBotProvider>
      <FAQProvider>
        <ChatBotPage />
      </FAQProvider>
    </ChatBotProvider>
  )
}

export default App

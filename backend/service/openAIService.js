const OpenAI = require('openai')
require('dotenv').config()

const openai = new OpenAI()

// Caching
const conversationMap = new Map()

const addToConversation = (role, message, ipAddress) => {
    if (!conversationMap[ipAddress]) {
        throw new Error('User does not exist in map')
    } else if (
        role === 'system' ||
        role === 'assistant' ||
        role === 'user' ||
        role === 'tool'
    ) {
        conversationMap[ipAddress].push({
            role: role,
            content: message,
        })
    } else {
        throw new Error(
            "Wrong role. The supported roles are: 'system', 'assistant', 'user', 'function', and 'tool'"
        )
    }
}

const newConversation = () => {
    return [{
        role: 'system',
        content:
            "You will follow the conversation and respond to the queries asked by the 'user's content. You will act as the assistant",
    }]
}

const openaiSendMessage = async (message, ipAddress) => {
    try {
        // No ip, create a new conversation
        if (!conversationMap[ipAddress]) {
            conversationMap[ipAddress] = newConversation()
        } 
        addToConversation('user', message, ipAddress)
        const stream = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: conversationMap[ipAddress],
        })
        addToConversation(
            'assistant',
            stream.choices[0].message.content,
            ipAddress
        )
        console.log(conversationMap)
        return stream.choices[0].message.content
    } catch (e) {
        throw new Error(e)
    }
}

module.exports = { openaiSendMessage }

const OpenAI = require('openai')
const { logger } = require('./loggingService')
require('dotenv').config()

const openai = new OpenAI()

// Caching
const conversationMap = new Map() // TODO: Add invalidation for this

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
        logger.log({
            level: 'error',
            message:
                "Wrong role. The supported roles are: 'system', 'assistant', 'user', 'function', and 'tool'",
        })
        throw new Error(
            "Wrong role. The supported roles are: 'system', 'assistant', 'user', 'function', and 'tool'"
        )
    }
}

const newConversation = () => {
    return [
        {
            role: 'system',
            content:
                "You will follow the conversation and respond to the queries asked by the 'user's content. You will act as the assistant",
        },
    ]
}

const sendMessage = async (message, ipAddress, res) => {
    // No ip, create a new conversation
    if (!conversationMap[ipAddress]) {
        conversationMap[ipAddress] = newConversation()
    }
    addToConversation('user', message, ipAddress)
    const stream = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: conversationMap[ipAddress],
        stream: true,
    })
    let combinedChunks = ''
    for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content || ''
        res.write(`data: ${content}\n\n`) // Send data as SSE message
        combinedChunks += content
    }
    addToConversation('assistant', combinedChunks, ipAddress)
    logger.info('Conversation Details', {
        details: conversationMap[ipAddress],
    })
}

module.exports = {
    sendMessage
}

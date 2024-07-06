var express = require('express')
var router = express.Router()
var openAIService = require('../service/openAIService')

router.post('/', async (req, res, next) => {
    try {
        const { message } = req.body
        const ipAddress = req.ip
        if (!message) {
            return res
                .status(400)
                .json({ message: 'Missing message in the request body' })
        }
        // Set headers for SSE
        res.setHeader('Cache-Control', 'no-cache')
        res.setHeader('Content-Type', 'text/event-stream')
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('Connection', 'keep-alive')
        res.flushHeaders() // Flush headers to establish SSE with client
        await openAIService.sendMessage(message, ipAddress, res)
        res.end()
    } catch (e) {
        console.error(e)
        res.status(500).json({ error: e.message })
    }
})

module.exports = router

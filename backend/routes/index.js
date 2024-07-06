var express = require('express')
var router = express.Router()
var openAIService = require('../service/openAIService');
/* GET home page. */
router.post('/', async (req, res, next) => {
    try {
        const {message} = req.body;
        const clientIp = req.ip;
        if(!message){
          res.status(500).json({
            message: "Missing message in the request body"
          });
        }
        const botMessage = await openAIService.openaiSendMessage(message, clientIp);
        res.status(200).json({
          message: botMessage
        })
    } catch (e) {
        console.log(e);
        res.status(500).json(e)
    }
})

module.exports = router

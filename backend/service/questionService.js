const { questionData } = require('../utils/questions')
const getFAQ = () =>{
    const res = []
    for (let i = 0; i < questionData.length; i++) {
        res.push(questionData[i].question)
    }
    return res;
}

module.exports = {getFAQ};
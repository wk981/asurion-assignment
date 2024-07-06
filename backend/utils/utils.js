const generatePrompt = (data) => {
    const res = []
    for (let i = 0; i < data.length; i++) {
        const temp = {
            role: 'system',
            content: `If user askes ${data[i].question}. Answer them with this: ${data[i].answer}`,
        }
        res.push(temp)
    }
    return res
}

module.exports = { generatePrompt }

const service = require("../services/faqService");

exports.getFaq = (req, res, next) => {

    const token = req.headers['x-access-token'];
    
    try {
        service.getFaq(token, function(response) {
            return res.status(200).json(response);
        });  
    }catch (err){
        if(err.message === "NotFound") {
            return res.status(404).json({ message: 'FAQ not found.' });
        }
        
        return res.status(500).send("Erro Requisição getUser " + err);
    }
}
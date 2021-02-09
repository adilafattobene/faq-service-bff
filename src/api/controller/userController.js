const client = require("../clients/accountServiceClient");
const service = require("../services/userService")

exports.getUser = (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });
  
  try {
    
      service.getUser(token, req.params.id, function(response) {
      return res.status(201).json(response);
    });  
  } catch (err){
    if(err.message === "NotFound") {
      return res.status(404).json({ message: 'User not found.' });
    }
    
    return res.status(500).send("Erro Requisição getUser " + err);
  }
};

exports.createUser = (req, res, next) => {

  const token = req.headers['x-access-token'];
  if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });

  try {
    
      service.createUser(token, req.body, function(response) {
        return res.status(201).json(response);
      });
      
  } catch (err){
      if(err.name === "JsonWebTokenError"){
        return res.status(401).json({ auth: false, message: 'Invalid token.' });
      }

      if(err.message === "Unauthorized") {
        return res.status(401).json({ auth: false, message: 'Unauthorized.' });
      };

      if(err.message === "MissingProfileError") {
        return res.status(401).json({ auth: false, message: 'Missing profile to create a new user.' });
      };

      if(err.message === "NotPermitedError") {
        return res.status(403).json({ auth: false, message: 'Unauthorized to create a new user.' });
      };
      
      console.log(err)

      return res.status(500).send("Erro Requisição createUser " + err);
  }
};

exports.changeUser = (req, res, next) => {
    //TODO
    //receber a informação e passar para o service account
    let userChanged = client.changeUser;
  
    res.send("Requisição changeUser");
};
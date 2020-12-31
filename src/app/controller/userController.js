exports.getUser = (req, res, next) => {
    //TODO
    //Verificar se está autenticado
    //Buscar user
    //Criptografar
    //Retornar ao front
    res.send("Requisição getUserById: " +  req.params.id)
}

exports.createUser = (req, res, next) => {
    //TODO
    //receber a informação e passar para o service account
    
    res.send("Requisição createUser");
}
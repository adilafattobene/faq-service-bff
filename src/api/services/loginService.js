const hashService = require ("../services/hashService");
const jwtService = require ("../services/jwtService");
const accountClient = require("../clients/accountServiceClient");

//TODO
exports.getLogin = async (login) => {
    
    accountClient.getUserPassword();
    
    return { 
        email: "email",
        jwtToken: "token",
    };
}

//TODO
exports.createLogin = async (login) => {

    hashService.hashingPassword(login.password, function (hashedPassword) {
        if (!hashedPassword) {
            //TODO
            throw Error("Error during hash password");
        }
        
        let loginHashed = {
            email: login.email,
            password: hashedPassword
        }

        const userLogin = accountClient.createUserLogin(loginHashed);
        
        //TODO
        const payload = { login };
        
        //TODO
        const jwtToken = jwtService.createJwtToken();

        return { 
            email: userLogin.email,
            jwtToken: jwtToken,
        };
        
    });
}

//TODO
exports.checkToken = async (login) => {
    //TODO

    //Buscar userPass
    let user = client.getUserPassword;

    return { 
        email: "email",
        jwtToken: "token",
    };
}
const hashService = require ("../services/hashService");
const jwtService = require ("../services/jwtService");
const accountClient = require("../clients/accountServiceClient");

exports.createLogin = async (login) => {

    hashService.hashingPassword(login.password, function (hashedPassword) {
        if (!hashedPassword) {
            //TODO
            return "error"
        }
        let loginHashed = {
            email: login.email,
            password: hashedPassword
        }

        const userLogin = accountClient.createUserLogin(loginHashed);
        
        //TODO
        const jwtToken = jwtService.createJwtToken();

        return { 
            email: userLogin.email,
            jwtToken: jwtToken,
        };
        
    });
}
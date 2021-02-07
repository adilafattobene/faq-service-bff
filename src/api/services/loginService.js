const hashService = require ("../services/hashService");
const jwtService = require ("../services/jwtService");
const accountClient = require("../clients/accountServiceClient");

exports.getLoginByEmail = (login) => {
    
    const response = accountClient.getUser(login.email);

    if (response){
        const userEmail = response.email;
        const userProfile = response.profile;

        const jwtPayload = { userEmail , userProfile };

        const jwtToken = jwtService.createJwtToken(jwtPayload);
        
        return { 
                auth: true,
                token: jwtToken
            };
    }
    
    throw Error("Error during getting login");
}

exports.createLogin = async (login, next) => {

    hashService.hashingPassword(login.password, function (hashedPassword) {
        if (!hashedPassword) {
            throw Error("Error during hash password");
        }
        
        let loginHashed = {
            email: login.login,
            password: hashedPassword
        }

        const response = accountClient.createUserLogin(loginHashed);
        
        if(response){
            const userEmail = response.email;
            const userProfile = response.profile;

            const jwtPayload = { userEmail , userProfile };

            const jwtToken = jwtService.createJwtToken(jwtPayload);
            
            return next({ 
                    auth: true,
                    token: jwtToken
                });
        }

            
        throw Error("Error during creating login");
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
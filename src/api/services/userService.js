const accountClient = require("../clients/accountServiceClient");
const jwtService = require ("../services/jwtService");
const hashService = require ("../services/hashService");

exports.getUser = (token, userId, next ) => {

    try{
        jwtService.verifyToken( token, function( response ) {

            let user = accountClient.getUser( userId );

            if( user ) {
                next( user );
            } else {
                throw Error( "NotFound" );
            }
        });
    }catch(err){
        throw err;
    }
};

exports.createUser = ( token, user, next ) => {
    
    let newerUser = { ...user };
    
    try{
        jwtService.verifyToken( token, function(response) {
            if(hasPermissionToCreateNewProfile(response.userProfile) && isNewerUserProfileValid(user.profile)) {

                hashService.hashingPassword(newerUser.password, function (hashedPassword) {
                    if (!hashedPassword) {
                        throw Error("Error during hash password");
                    }
                    
                    const userCreated = accountClient.createUser(copyUserWIthPasswordHashed(hashedPassword, user));
        
                    next(userCreated);
                });
            } else {
                throw Error("Unauthorized");
            }
        });
    } catch (err) {
        throw err;
    }
    
};

const isNewerUserProfileValid = ( newerUserProfile ) => {

    if(!newerUserProfile){
        throw Error("MissingProfileError");
    }

    if(newerUserProfile != "OWNER") {
        return true;
    };
    
    return false;
}

const hasPermissionToCreateNewProfile = ( profile ) => {

    if(profile != "OWNER") {
        throw Error("NotPermitedError");
    };
    
    return true;
}

const copyUserWIthPasswordHashed = ( passwordHashed, user) => {

    const newerUserWithPasswordHashed = { ...user };

    newerUserWithPasswordHashed.password = passwordHashed;
    
    return newerUserWithPasswordHashed;
}

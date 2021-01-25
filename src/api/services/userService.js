const client = require("../clients/accountServiceClient");

exports.getUserPassword = () => {
    return client.getUserPassword("email@teste");
}
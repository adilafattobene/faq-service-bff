
exports.createJwtToken = async (payload) => {
    //TODO Levar para o .env
    let secret = "secret";

    const token = jwt.sign(payload, secret, {
        expiresIn: "1h",
    });
}

exports.createJwtToken = async () => {
    //TODO
    
}

// isCorrectPassword(psw, results[0].psw, function (err, same) {
//     if (err) {
//       return res.status(500).send({
//         code: "ERROR",
//         usuario: null,
//         message:
//           "Ocorreu algum erro realizar o login: [" + err.message + "].",
//       });
//     } else if (!same) {
//       return res.status(401).send({
//         code: "ERROR",
//         usuario: null,
//         message: "Email ou senha incorretos.",
//       });
//     }

//     const payload = { email };
//     const token = jwt.sign(payload, "secret", {
//       expiresIn: "1h",
//     });

//     console.log(token);
//     return res.status(200).send({
//       code: "OK",
//       token: token,
//       message: "Logado com sucesso.",
//     });
//   });

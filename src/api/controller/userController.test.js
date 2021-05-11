const service = require("../services/userService");
const serviceJwt = require("../services/jwtService");
const controller = require("./userController");

describe("getUser unit tests", () => {
  test("should return 200", async () => {
    const user = {
      id: "asd",
      name: "blabla",
    };

    jest.spyOn(service, "getUser").mockResolvedValue(user);

    const res = {};
    res.send = jest.fn().mockReturnValue(res);
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn();

    const a = await controller.getUser(
      { headers: { "x-access-token": "blabla" }, params: { id: "aaaaaa" } },
      res
    );

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(user);
  });

  test("should return 401 when it does not receive token", async () => {
    const res = {};
    res.send = jest.fn().mockReturnValue(res);
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);

    await controller.getUser(
      { headers: { other_header: "blabla" }, params: { id: "aaaaaa" } },
      res
    );

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      auth: false,
      message: "No token provided.",
    });
  });

  test("should return 404 when when user is not found", async () => {
    jest.spyOn(service, "getUser").mockRejectedValue(new Error("not_found"));

    const res = {};
    res.send = jest.fn().mockReturnValue(res);
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);

    await controller.getUser(
      { headers: { "x-access-token": "blabla" }, params: { id: "aaaaaa" } },
      res
    );

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "User not found." });
  });

  test("should return 401 when token is expired", async () => {
    let error = new Error();
    error.name = "TokenExpiredError";

    jest.spyOn(service, "getUser").mockRejectedValue(error);

    const res = {};
    res.send = jest.fn().mockReturnValue(res);
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);

    await controller.getUser(
      { headers: { "x-access-token": "blabla" }, params: { id: "aaaaaa" } },
      res
    );

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Expired token." });
  });

  test("should return 403 when user token is not authorized to request the resource", async () => {
    let error = new Error("not_authorized");

    jest.spyOn(service, "getUser").mockRejectedValue(error);

    const res = {};
    res.send = jest.fn().mockReturnValue(res);
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);

    await controller.getUser(
      { headers: { "x-access-token": "blabla" }, params: { id: "aaaaaa" } },
      res
    );

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({
      message: "Not authorized to request this resource.",
    });
  });

  test("should return 401 when token is invalid", async () => {
    let error = new Error();
    error.name = "JsonWebTokenError";
    error.message = "invalid token";

    jest.spyOn(service, "getUser").mockRejectedValue(error);

    const res = {};
    res.send = jest.fn().mockReturnValue(res);
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);

    await controller.getUser(
      { headers: { "x-access-token": "blabla" }, params: { id: "aaaaaa" } },
      res
    );

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Invalid token." });
  });

  test("should return 401 when token is malformed", async () => {
    let error = new Error();
    error.name = "JsonWebTokenError";
    error.message = "jwt malformed";

    jest.spyOn(service, "getUser").mockRejectedValue(error);

    const res = {};
    res.send = jest.fn().mockReturnValue(res);
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);

    await controller.getUser(
      { headers: { "x-access-token": "blabla" }, params: { id: "aaaaaa" } },
      res
    );

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Invalid token." });
  });

  test("should return 500 when occur a jwt error", async () => {
    let error = new Error();
    error.name = "JsonWebTokenError";
    error.message = "Other jwt error";

    jest.spyOn(service, "getUser").mockRejectedValue(error);

    const res = {};
    res.send = jest.fn().mockReturnValue(res);
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);

    await controller.getUser(
      { headers: { "x-access-token": "blabla" }, params: { id: "aaaaaa" } },
      res
    );

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "Erro durante validação do token na requisição getUser.",
    });
  });

  test("should return 500", async () => {
    jest.spyOn(service, "getUser").mockRejectedValue(new Error("Other error"));

    const res = {};
    res.send = jest.fn().mockReturnValue(res);
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);

    await controller.getUser(
      { headers: { "x-access-token": "blabla" }, params: { id: "aaaaaa" } },
      res
    );

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "Something is wrong - getUser.",
    });
  });
});

describe("getUsersById unit tests", () => {
  test("should return 200", async () => {
    const users = [
      {
        id: "asd",
        name: "blabla",
      },
    ];

    jest.spyOn(service, "getUsersById").mockResolvedValue(users);

    const res = {};
    res.send = jest.fn().mockReturnValue(res);
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn();

    const a = await controller.getUsersById(
      { headers: { "x-access-token": "blabla" }, params: { id: "aaaaaa" } },
      res
    );

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(users);
  });

  test("should return 401 when it does not receive token", async () => {
    const res = {};
    res.send = jest.fn().mockReturnValue(res);
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);

    await controller.getUsersById(
      { headers: { other_header: "blabla" }, params: { id: "aaaaaa" } },
      res
    );

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      auth: false,
      message: "No token provided.",
    });
  });

  test("should return 404 when when user is not found", async () => {
    jest
      .spyOn(service, "getUsersById")
      .mockRejectedValue(new Error("not_found"));

    const res = {};
    res.send = jest.fn().mockReturnValue(res);
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);

    await controller.getUsersById(
      { headers: { "x-access-token": "blabla" }, params: { id: "aaaaaa" } },
      res
    );

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "User not found." });
  });

  test("should return 401 when token is expired", async () => {
    let error = new Error();
    error.name = "TokenExpiredError";

    jest.spyOn(service, "getUsersById").mockRejectedValue(error);

    const res = {};
    res.send = jest.fn().mockReturnValue(res);
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);

    await controller.getUsersById(
      { headers: { "x-access-token": "blabla" }, params: { id: "aaaaaa" } },
      res
    );

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Expired token." });
  });

  test("should return 403 when user token is not authorized to request the resource", async () => {
    let error = new Error("not_authorized");

    jest.spyOn(service, "getUsersById").mockRejectedValue(error);

    const res = {};
    res.send = jest.fn().mockReturnValue(res);
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);

    await controller.getUsersById(
      { headers: { "x-access-token": "blabla" }, params: { id: "aaaaaa" } },
      res
    );

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({
      message: "Not authorized to request this resource.",
    });
  });

  test("should return 401 when token is invalid", async () => {
    let error = new Error();
    error.name = "JsonWebTokenError";
    error.message = "invalid token";

    jest.spyOn(service, "getUsersById").mockRejectedValue(error);

    const res = {};
    res.send = jest.fn().mockReturnValue(res);
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);

    await controller.getUsersById(
      { headers: { "x-access-token": "blabla" }, params: { id: "aaaaaa" } },
      res
    );

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Invalid token." });
  });

  test("should return 401 when token is malformed", async () => {
    let error = new Error();
    error.name = "JsonWebTokenError";
    error.message = "jwt malformed";

    jest.spyOn(service, "getUsersById").mockRejectedValue(error);

    const res = {};
    res.send = jest.fn().mockReturnValue(res);
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);

    await controller.getUsersById(
      { headers: { "x-access-token": "blabla" }, params: { id: "aaaaaa" } },
      res
    );

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Invalid token." });
  });

  test("should return 500 when occur a jwt error", async () => {
    let error = new Error();
    error.name = "JsonWebTokenError";
    error.message = "Other jwt error";

    jest.spyOn(service, "getUsersById").mockRejectedValue(error);

    const res = {};
    res.send = jest.fn().mockReturnValue(res);
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);

    await controller.getUsersById(
      { headers: { "x-access-token": "blabla" }, params: { id: "aaaaaa" } },
      res
    );

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "Erro durante validação do token na requisição getUser.",
    });
  });

  test("should return 500", async () => {
    jest
      .spyOn(service, "getUsersById")
      .mockRejectedValue(new Error("Other error"));

    const res = {};
    res.send = jest.fn().mockReturnValue(res);
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);

    await controller.getUsersById(
      { headers: { "x-access-token": "blabla" }, params: { id: "aaaaaa" } },
      res
    );

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "Something is wrong - getUsers.",
    });
  });
});

describe("createUser unit tests", () => {
  test("should return 201", async () => {
    const user = {
      id: "asd",
      name: "blabla",
    };

    jest.spyOn(service, "createUser").mockResolvedValue(user);

    const token = "token145687IssoAe";

    jest.spyOn(serviceJwt, "createJwtToken").mockReturnValue(token);

    const res = {};
    res.send = jest.fn().mockReturnValue(res);
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn();

    const body = {
      id: "asd",
      name: "blabla",
    };

    await controller.createUser(
      { headers: { "other-header": "olá_mundo" }, body: body },
      res
    );

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ token: token });
  });

  test("should return 400 when it receive a token", async () => {
    const users = [
      {
        id: "asd",
        name: "blabla",
      },
    ];

    jest.spyOn(service, "createUser").mockResolvedValue(users);

    const res = {};
    res.send = jest.fn().mockReturnValue(res);
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn();

    const body = {
      id: "asd",
      name: "blabla",
    };

    const a = await controller.createUser(
      { headers: { "x-access-token": "blabla" }, body: body },
      res
    );

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      auth: false,
      message: "A token was provided but it is not required.",
    });
  });

  test("should return 404 when when user is not found", async () => {
    jest
      .spyOn(service, "createUser")
      .mockRejectedValue(new Error("conflict_error"));

    const res = {};
    res.send = jest.fn().mockReturnValue(res);
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);

    const body = {
      id: "asd",
      name: "blabla",
    };

    await controller.createUser(
      { headers: { "other-header": "olá_mundo" }, body: body },
      res
    );

    expect(res.status).toHaveBeenCalledWith(409);
    expect(res.json).toHaveBeenCalledWith({ message: "Conflicted user." });
  });

  test("should return 500", async () => {
    jest
      .spyOn(service, "createUser")
      .mockRejectedValue(new Error("Other error"));

    const res = {};
    res.send = jest.fn().mockReturnValue(res);
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);

    const body = {
      id: "asd",
      name: "blabla",
    };

    await controller.createUser(
      { headers: { "other-header": "olá_mundo" }, body: body },
      res
    );

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "Something is wrong - createUser.",
    });
  });
});

describe("createChild unit tests", () => {
  test("should return 201", async () => {
    const user = {
      id: "asd",
      name: "blabla",
    };

    jest.spyOn(service, "createChild").mockResolvedValue(user);

    const token = "token145687IssoAe";

    jest.spyOn(serviceJwt, "createJwtToken").mockReturnValue(token);

    const res = {};
    res.send = jest.fn().mockReturnValue(res);
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn();

    const body = {
      id: "asd",
      name: "blabla",
    };

    await controller.createChild(
      { headers: { "x-access-token": "blabla" }, body: body,  params: { id: "aaaaaa" } },
      res
    );

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(user);
  });

  test("should return 401 when it does not receive token", async () => {
    const res = {};
    res.send = jest.fn().mockReturnValue(res);
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);

    const body = {
      id: "asd",
      name: "blabla",
    };

    await controller.createChild(
      { headers: { "other-header": "blabla" }, body: body,  params: { id: "aaaaaa" } },
      res
    );

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      auth: false,
      message: "No token provided.",
    });
  });

  test("should return 401 when token is expired", async () => {
    let error = new Error();
    error.name = "TokenExpiredError";

    jest.spyOn(service, "createChild").mockRejectedValue(error);

    const res = {};
    res.send = jest.fn().mockReturnValue(res);
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);

    const body = {
      id: "asd",
      name: "blabla",
    };
    
    await controller.createChild(
      { headers: { "x-access-token": "blabla" }, body: body,  params: { id: "aaaaaa" } },
      res
    );

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Expired token." });
  });

  test("should return 401 when token is invalid", async () => {
    let error = new Error();
    error.name = "JsonWebTokenError";
    error.message = "invalid token";

    jest.spyOn(service, "createChild").mockRejectedValue(error);

    const res = {};
    res.send = jest.fn().mockReturnValue(res);
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);

    const body = {
      id: "asd",
      name: "blabla",
    };
    
    await controller.createChild(
      { headers: { "x-access-token": "blabla" }, body: body,  params: { id: "aaaaaa" } },
      res
    );

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Invalid token." });
  });

  test("should return 401 when token is malformed", async () => {
    let error = new Error();
    error.name = "JsonWebTokenError";
    error.message = "jwt malformed";

    jest.spyOn(service, "createChild").mockRejectedValue(error);

    const res = {};
    res.send = jest.fn().mockReturnValue(res);
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);

    const body = {
      id: "asd",
      name: "blabla",
    };
    
    await controller.createChild(
      { headers: { "x-access-token": "blabla" }, body: body,  params: { id: "aaaaaa" } },
      res
    );

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Invalid token." });
  });

  test("should return 401 when profile received is invalid", async () => {
    let error = new Error();
    error.message = "invalid_profile";

    jest.spyOn(service, "createChild").mockRejectedValue(error);

    const res = {};
    res.send = jest.fn().mockReturnValue(res);
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);

    const body = {
      id: "asd",
      name: "blabla",
    };
    
    await controller.createChild(
      { headers: { "x-access-token": "blabla" }, body: body,  params: { id: "aaaaaa" } },
      res
    );

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      auth: false,
      message: "Missing profile to create a new user.",
    });
  });

  test("should return 401 when profile received is invalid", async () => {
    let error = new Error();
    error.message = "unauthorized_profile";

    jest.spyOn(service, "createChild").mockRejectedValue(error);

    const res = {};
    res.send = jest.fn().mockReturnValue(res);
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);

    const body = {
      id: "asd",
      name: "blabla",
    };
    
    await controller.createChild(
      { headers: { "x-access-token": "blabla" }, body: body,  params: { id: "aaaaaa" } },
      res
    );

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      auth: false,
      message: "Unauthorized profile to create a new user.",
    });
  });

  test("should return 401 when profile received is invalid", async () => {
    let error = new Error();
    error.message = "unauthorized_token";

    jest.spyOn(service, "createChild").mockRejectedValue(error);

    const res = {};
    res.send = jest.fn().mockReturnValue(res);
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);

    const body = {
      id: "asd",
      name: "blabla",
    };
    
    await controller.createChild(
      { headers: { "x-access-token": "blabla" }, body: body,  params: { id: "aaaaaa" } },
      res
    );

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      auth: false,
      message: "Unauthorized token to create a new user.",
    });
  });

  test("should return 500 when occur a jwt error", async () => {
    let error = new Error();
    error.name = "JsonWebTokenError";
    error.message = "Other jwt error";

    jest.spyOn(service, "createChild").mockRejectedValue(error);

    const res = {};
    res.send = jest.fn().mockReturnValue(res);
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);

    const body = {
      id: "asd",
      name: "blabla",
    };
    
    await controller.createChild(
      { headers: { "x-access-token": "blabla" }, body: body,  params: { id: "aaaaaa" } },
      res
    );

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "Erro durante validação do token na requisição createChild.",
    });
  });

  test("should return 500", async () => {
    jest
      .spyOn(service, "createChild")
      .mockRejectedValue(new Error("Other error"));

    const res = {};
    res.send = jest.fn().mockReturnValue(res);
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);

    const body = {
      id: "asd",
      name: "blabla",
    };
    
    await controller.createChild(
      { headers: { "x-access-token": "blabla" }, body: body,  params: { id: "aaaaaa" } },
      res
    );

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "Something is wrong - createChild." });
  });
});

const service = require("../services/userService");
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

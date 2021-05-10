const service = require("../services/loginService");
const controller = require("./loginController");

describe("getLogin unit tests", () => {
  test("should return 200", async () => {
    const response = {
      auth: true,
      token: "jwt_token",
    };

    jest.spyOn(service, "getLogin").mockResolvedValue(response);

    const res = {};
    res.send = jest.fn().mockReturnValue(res);
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn();

    await controller.getLogin(
      {
        headers: { "x-access-token": "blabla" },
        body: {
          userName: "morganasilva",
          password: "somethinklikethis",
        },
      },
      res
    );

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(response);
  });

  test("should return 404 when password is wrong password", async () => {
    jest
      .spyOn(service, "getLogin")
      .mockRejectedValue(new Error("invalid_password"));

    const res = {};
    res.send = jest.fn().mockReturnValue(res);
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);

    await controller.getLogin(
      {
        headers: { "x-access-token": "blabla" },
        body: {
          userName: "morganasilva",
          password: "somethinklikethis",
        },
      },
      res
    );

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ message: "Invalid Password." });
  });

  test("should return 500", async () => {
    jest.spyOn(service, "getLogin").mockRejectedValue(new Error("OtherError"));

    const res = {};
    res.send = jest.fn().mockReturnValue(res);
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);

    await controller.getLogin(
      {
        headers: { "x-access-token": "blabla" },
        body: {
          userName: "morganasilva",
          password: "somethinklikethis",
        },
      },
      res
    );

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "Something is wrong - getLogin.",
    });
  });
});

const service = require("../services/profileService");
const controller = require("./profileController");

describe("getProfiles unit tests", () => {
  test("should return 200", async () => {
    const profiles = [
      {
        id: "fcec55dc-9d24-4c0d-99ad-c99960660f2c",
        description: "OWNER",
      },
      {
        id: "b2e2e9a8-0497-466d-9c32-787f11989431",
        description: "CHILD",
      },
      {
        id: "38f527b9-f82d-4fde-8859-aecf6bb0adf7",
        description: "ADM",
      },
    ];

    jest.spyOn(service, "getProfiles").mockResolvedValue(profiles);

    const res = {};
    res.send = jest.fn().mockReturnValue(res);
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn();

    await controller.getProfiles(
      { headers: { "x-access-token": "blabla" } },
      res
    );

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(profiles);
  });

  test("should return 401 when it does not receive token", async () => {
    const res = {};
    res.send = jest.fn().mockReturnValue(res);
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);

    await controller.getProfiles({ headers: { other_header: "blabla" } }, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      auth: false,
      message: "No token provided.",
    });
  });

  test("should return 404", async () => {
    jest
      .spyOn(service, "getProfiles")
      .mockRejectedValue(new Error("resource_not_found_error"));

    const res = {};
    res.send = jest.fn().mockReturnValue(res);
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);

    await controller.getProfiles(
      { headers: { "x-access-token": "blabla" } },
      res
    );

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "Profiles not found." });
  });

  test("should return 401 when token is expired", async () => {
    let error = new Error();
    error.name = "TokenExpiredError";

    jest.spyOn(service, "getProfiles").mockRejectedValue(error);

    const res = {};
    res.send = jest.fn().mockReturnValue(res);
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);

    await controller.getProfiles(
      { headers: { "x-access-token": "blabla" } },
      res
    );

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Expired token." });
  });

  test("should return 403 when user token is not authorized to request the resource", async () => {
    let error = new Error("not_authorized");

    jest.spyOn(service, "getProfiles").mockRejectedValue(error);

    const res = {};
    res.send = jest.fn().mockReturnValue(res);
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);

    await controller.getProfiles(
      { headers: { "x-access-token": "blabla" } },
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

    jest.spyOn(service, "getProfiles").mockRejectedValue(error);

    const res = {};
    res.send = jest.fn().mockReturnValue(res);
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);

    await controller.getProfiles(
      { headers: { "x-access-token": "blabla" } },
      res
    );

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Invalid token." });
  });

  test("should return 401 when token is malformed", async () => {
    let error = new Error();
    error.name = "JsonWebTokenError";
    error.message = "jwt malformed";

    jest.spyOn(service, "getProfiles").mockRejectedValue(error);

    const res = {};
    res.send = jest.fn().mockReturnValue(res);
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);

    await controller.getProfiles(
      { headers: { "x-access-token": "blabla" } },
      res
    );

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Invalid token." });
  });

  test("should return 500 when occur a jwt error", async () => {
    let error = new Error();
    error.name = "JsonWebTokenError";
    error.message = "Other jwt error";

    jest.spyOn(service, "getProfiles").mockRejectedValue(error);

    const res = {};
    res.send = jest.fn().mockReturnValue(res);
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);

    await controller.getProfiles(
      { headers: { "x-access-token": "blabla" } },
      res
    );

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "Erro durante validação do token na requisição getUser.",
    });
  });

  test("should return 500", async () => {
    jest
      .spyOn(service, "getProfiles")
      .mockRejectedValue(new Error("Other error"));

    const res = {};
    res.send = jest.fn().mockReturnValue(res);
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);

    await controller.getProfiles(
      { headers: { "x-access-token": "blabla" } },
      res
    );

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "Something is wrong - profiles is not found.",
    });
  });
});

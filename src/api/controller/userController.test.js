const service = require("../services/userService");
const controller = require("./userController");

describe("get user unit test", () => {
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
});

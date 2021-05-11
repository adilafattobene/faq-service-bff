const hashService = require("./hashService");
const jwtService = require("./jwtService");
const client = require("../clients/accountServiceClient");
const service = require("./loginService");

describe("getLogin unit tests", () => {
  test("should return a login token", async () => {
    const response = {
      id: "92e4d6f9-2113-462e-bef2-eb373add5eca",
      password: "$2b$10$TGyYor9FNcqwJVTaFtpAEOCa6prwacfpCnwy/lhKX1aW.ClbU.cB6",
      userName: "teste_criação_dsfdsaddf",
      profile: {
        id: "fcec55dc-9d24-4c0d-99ad-c99960660f2c",
        description: "OWNER",
      },
    };

    jest.spyOn(client, "getUserLoginByUserName").mockResolvedValue(response);
    jest.spyOn(hashService, "comparePassword").mockResolvedValue(true);
    jest
      .spyOn(jwtService, "createJwtToken")
      .mockReturnValue("token145687IssoAe");

    const login = await service.getLogin({
      userName: "morganasilva",
      password: "somethinklikethis",
    });

    expect(login).toStrictEqual({ auth: true, token: "token145687IssoAe" });
  });

  test("should return a error when password is wrong", async () => {
    const response = {
      id: "92e4d6f9-2113-462e-bef2-eb373add5eca",
      password: "$2b$10$TGyYor9FNcqwJVTaFtpAEOCa6prwacfpCnwy/lhKX1aW.ClbU.cB6",
      userName: "teste_criação_dsfdsaddf",
      profile: {
        id: "fcec55dc-9d24-4c0d-99ad-c99960660f2c",
        description: "OWNER",
      },
    };

    jest.spyOn(client, "getUserLoginByUserName").mockResolvedValue(response);
    jest.spyOn(hashService, "comparePassword").mockResolvedValue(false);

    await expect(
      service.getLogin({
        userName: "morganasilva",
        password: "somethinklikethis",
      })
    ).rejects.toThrow(Error);
  });

  test("should return a error when client fails", async () => {
    jest.spyOn(client, "getUserLoginByUserName").mockRejectedValue(new Error());

    await expect(
      service.getLogin({
        userName: "morganasilva",
        password: "somethinklikethis",
      })
    ).rejects.toThrow(Error);
  });

  test("should return a error when jwt createToken fails", async () => {
    const response = {
      id: "92e4d6f9-2113-462e-bef2-eb373add5eca",
      password: "$2b$10$TGyYor9FNcqwJVTaFtpAEOCa6prwacfpCnwy/lhKX1aW.ClbU.cB6",
      userName: "teste_criação_dsfdsaddf",
      profile: {
        id: "fcec55dc-9d24-4c0d-99ad-c99960660f2c",
        description: "OWNER",
      },
    };

    jest.spyOn(client, "getUserLoginByUserName").mockResolvedValue(response);
    jest.spyOn(hashService, "comparePassword").mockResolvedValue(true);
    jest.spyOn(jwtService, "createJwtToken").mockImplementation(() => {
      throw new Error();
    });

    await expect(
      service.getLogin({
        userName: "morganasilva",
        password: "somethinklikethis",
      })
    ).rejects.toThrow(Error);
  });
});

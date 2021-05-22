const client = require("../clients/accountServiceClient");
const jwtService = require("./jwtService");
const service = require("./userService");
const hashService = require("../services/hashService");

describe("getUser unit tests", () => {
  test("should return an user", async () => {
    const jwtToken = {
      profileId: "fcec55dc-9d24-4c0d-99ad-c99960660f2c",
      userId: "27bc9743-1923-4ade-b364-04a0805175c1",
    };

    const user = {
      id: "27bc9743-1923-4ade-b364-04a0805175c1",
      name: "Name of test",
      login: {
        userName: "UserNameOfTest",
        profile: {
          description: "OWNER",
        },
      },
      profile: "OWNER",
    };
    jest.spyOn(jwtService, "verifyToken").mockResolvedValue(jwtToken);
    jest.spyOn(client, "getUser").mockResolvedValue(user);

    await expect(
      service.getUser("thisIsAValidadeToken", user.id)
    ).resolves.toStrictEqual(user);
  });

  test("should return a not_authorized error when token has invalid user", async () => {
    const jwtToken = {
      profileId: "fcec55dc-9d24-4c0d-99ad-c99960660f2c",
      userId: "invalid_id",
    };

    jest.spyOn(jwtService, "verifyToken").mockResolvedValue(jwtToken);

    await expect(
      service.getUser(
        "thisIsAValidadeToken",
        "27bc9743-1923-4ade-b364-04a0805175c1"
      )
    ).rejects.toThrow(Error("not_authorized"));
  });

  test("should return an error when token has invalid token", async () => {
    jest
      .spyOn(jwtService, "verifyToken")
      .mockRejectedValue(new Error("one jwt_error"));

    await expect(
      service.getUser(
        "thisIsAnInvalidToken",
        "27bc9743-1923-4ade-b364-04a0805175c1"
      )
    ).rejects.toThrow(Error);
  });

  test("should return an not_authorized error when client request return an error", async () => {
    const jwtToken = {
      profileId: "fcec55dc-9d24-4c0d-99ad-c99960660f2c",
      userId: "userId",
    };

    jest.spyOn(jwtService, "verifyToken").mockResolvedValue(jwtToken);
    jest
      .spyOn(client, "getUser")
      .mockRejectedValue(new Error("one client_error"));

    await expect(service.getUser("thisIsAValidadeToken")).rejects.toThrow(
      Error
    );
  });
});

describe("getUsersById unit tests", () => {
  test("should return an user", async () => {
    const jwtToken = {
      profileId: "fcec55dc-9d24-4c0d-99ad-c99960660f2c",
      userId: "111067da-b37e-11eb-8529-0242ac130003",
    };

    const user = [
      {
        id: "2f19292c-e1ae-4fee-9600-e264c694e9f2",
        name: "Name of test",
        login: {
          userName: "UserNameOfTest",
          profile: {
            id: "fcec55dc-9d24-4c0d-99ad-c99960660f2c",
            description: "CHILD",
          },
        },
      },
      {
        id: "19e87dc0-b37e-11eb-8529-0242ac130003",
        name: "Name of test",
        login: {
          userName: "UserNameOfTest",
          profile: {
            id: "20fb0e0b-966a-48ac-bff5-4ddece649000",
            description: "CHILD",
          },
        },
      },
    ];

    jest.spyOn(jwtService, "verifyToken").mockResolvedValue(jwtToken);
    jest.spyOn(client, "getUsersById").mockResolvedValue(user);

    await expect(
      service.getUsersById(
        "thisIsAValidadeToken",
        "111067da-b37e-11eb-8529-0242ac130003"
      )
    ).resolves.toBe(user);
  });

  test("should return a not_authorized error when token has invalid user", async () => {
    const jwtToken = {
      profileId: "fcec55dc-9d24-4c0d-99ad-c99960660f2c",
      userId: "invalid_id",
    };

    jest.spyOn(jwtService, "verifyToken").mockResolvedValue(jwtToken);

    await expect(
      service.getUsersById(
        "thisIsAValidadeToken",
        "27bc9743-1923-4ade-b364-04a0805175c1"
      )
    ).rejects.toThrow(Error("not_authorized"));
  });

  test("should return an error when token has invalid token", async () => {
    jest
      .spyOn(jwtService, "verifyToken")
      .mockRejectedValue(new Error("one jwt_error"));

    await expect(
      service.getUsersById(
        "thisIsAnInvalidToken",
        "27bc9743-1923-4ade-b364-04a0805175c1"
      )
    ).rejects.toThrow(Error);
  });

  test("should return an not_authorized error when client request return an error", async () => {
    const jwtToken = {
      profileId: "fcec55dc-9d24-4c0d-99ad-c99960660f2c",
      userId: "userId",
    };

    jest.spyOn(jwtService, "verifyToken").mockResolvedValue(jwtToken);
    jest
      .spyOn(client, "getUsersById")
      .mockRejectedValue(new Error("one client_error"));

    await expect(service.getUsersById("thisIsAValidadeToken")).rejects.toThrow(
      Error
    );
  });
});

describe("createUser unit tests", () => {
  test("should create an user", async () => {
    const user = {
      name: "Name of test",
      companyName: "Companny name of test",
      password: "UserPasswordOfTest",
      userName: "UserNameOfTest",
    };

    const userCreated = {
      id: "27bc9743-1923-4ade-b364-04a0805175c1",
      name: "Name of test",
      login: {
        userName: "UserNameOfTest",
        profile: {
          id: "fcec55dc-9d24-4c0d-99ad-c99960660f2c",
          description: "OWNER",
        },
      },
    };
    jest
      .spyOn(hashService, "hashingPasswordAsync")
      .mockResolvedValue("passwordHashed");
    jest.spyOn(client, "createUser").mockResolvedValue(userCreated);

    await expect(service.createUser(user)).resolves.toBe(userCreated);
  });

  test("should return an error when create user fails", async () => {
    const user = {
      name: "Name of test",
      companyName: "Companny name of test",
      password: "UserPasswordOfTest",
      userName: "UserNameOfTest",
    };

    jest
      .spyOn(hashService, "hashingPasswordAsync")
      .mockResolvedValue("passwordHashed");
    jest
      .spyOn(client, "createUser")
      .mockRejectedValue(new Error("client_error"));

    await expect(service.createUser(user)).rejects.toThrow(Error);
  });

  test("should return an error when hash password fails", async () => {
    const user = {
      name: "Name of test",
      companyName: "Companny name of test",
      password: "UserPasswordOfTest",
      userName: "UserNameOfTest",
    };

    jest
      .spyOn(hashService, "hashingPasswordAsync")
      .mockRejectedValue(new Error("hash_error"));

    await expect(service.createUser(user)).rejects.toThrow(Error);
  });
});

describe("createChild unit tests", () => {
  test("should create an child", async () => {
    const jwtToken = {
      profileId: "fcec55dc-9d24-4c0d-99ad-c99960660f2c",
      userId: "27bc9743-1923-4ade-b364-04a0805175c1",
    };

    const user = {
      userName: "UserNameOfTest",
      id: "27bc9743-1923-4ade-b364-04a0805175c1",
      name: "Name of test",
      profileId: "acec55dc-9d24-4c0d-99ad-c99960660f2c",
      password: "password",
    };

    const userChild = {
      id: "27bc9743-1923-4ade-b364-04a0805175c1",
      name: "Name of test",
      login: {
        userName: "UserNameOfTest",
        profile: {
          id: "fcec55dc-9d24-4c0d-99ad-c99960660f2c",
          description: "OWNER",
        },
      },
    };

    jest.spyOn(jwtService, "verifyToken").mockResolvedValue(jwtToken);
    jest
      .spyOn(hashService, "hashingPasswordAsync")
      .mockResolvedValue("PasswordHassing");
    jest.spyOn(client, "createUserChild").mockResolvedValue(userChild);

    await expect(
      service.createChild(
        "thisIsAValidadeToken",
        user,
        "27bc9743-1923-4ade-b364-04a0805175c1"
      )
    ).resolves.toBe(userChild);
  });

  test("should return an error when token has invalid token", async () => {
    const jwtToken = {
      profileId: "fcec55dc-9d24-4c0d-99ad-c99960660f2c",
      userId: "invalid_id",
    };

    const user = {
      userName: "UserNameOfTest",
      id: "27bc9743-1923-4ade-b364-04a0805175c1",
      name: "Name of test",
      profileId: "acec55dc-9d24-4c0d-99ad-c99960660f2c",
      password: "password",
    };

    jest.spyOn(jwtService, "verifyToken").mockResolvedValue(jwtToken);

    await expect(
      service.createChild(
        "thisIsAValidadeToken",
        user,
        "27bc9743-1923-4ade-b364-04a0805175c1"
      )
    ).rejects.toThrow(Error("unauthorized_token"));
  });

  test("should return an error when unauthorized profile", async () => {
    const jwtToken = {
      profileId: "fcec55dc-9d24-4c0d-99ad-c99960660f2c",
      userId: "27bc9743-1923-4ade-b364-04a0805175c1",
    };

    const user = {
      userName: "UserNameOfTest",
      id: "27bc9743-1923-4ade-b364-04a0805175c1",
      name: "Name of test",
      profileId: "acec55dc-9d24-4c0d-99ad-c99960660f2c",
      password: "password",
    };

    await expect(
      service.createChild(
        "thisIsAValidadeToken",
        user,
        "27bc9743-1923-4ade-b364-04a0805175c1"
      )
    ).rejects.toThrow(Error("unauthorized_token"));
  });

  test("should return an error when invalid profile", async () => {
    const jwtToken = {
      profileId: "fcec55dc-9d24-4c0d-99ad-c99960660f2c",
      userId: "27bc9743-1923-4ade-b364-04a0805175c1",
    };

    const user = {
      userName: "UserNameOfTest",
      id: "27bc9743-1923-4ade-b364-04a0805175c1",
      name: "Name of test",
      profileId: "fcec55dc-9d24-4c0d-99ad-c99960660f2c",
      password: "password",
    };

    jest.spyOn(jwtService, "verifyToken").mockResolvedValue(jwtToken);
    jest
      .spyOn(hashService, "hashingPasswordAsync")
      .mockResolvedValue("PasswordHassing");

    await expect(
      service.createChild(
        "thisIsAValidadeToken",
        user,
        "27bc9743-1923-4ade-b364-04a0805175c1"
      )
    ).rejects.toThrow(Error("invalid_profile"));
  });

  test("should return an error when child does not have profileId", async () => {
    const jwtToken = {
      profileId: "fcec55dc-9d24-4c0d-99ad-c99960660f2c",
      userId: "27bc9743-1923-4ade-b364-04a0805175c1",
    };

    const user = {
      userName: "UserNameOfTest",
      id: "27bc9743-1923-4ade-b364-04a0805175c1",
      name: "Name of test",
      profileId: undefined,
      password: "password",
    };

    jest.spyOn(jwtService, "verifyToken").mockResolvedValue(jwtToken);
    jest
      .spyOn(hashService, "hashingPasswordAsync")
      .mockResolvedValue("PasswordHassing");

    await expect(
      service.createChild(
        "thisIsAValidadeToken",
        user,
        "27bc9743-1923-4ade-b364-04a0805175c1"
      )
    ).rejects.toThrow(Error("MissingProfileError"));
  });

  test("should return an error when it try to hash a password", async () => {
    const jwtToken = {
      profileId: "fcec55dc-9d24-4c0d-99ad-c99960660f2c",
      userId: "27bc9743-1923-4ade-b364-04a0805175c1",
    };

    const user = {
      userName: "UserNameOfTest",
      id: "27bc9743-1923-4ade-b364-04a0805175c1",
      name: "Name of test",
      profileId: "acec55dc-9d24-4c0d-99ad-c99960660f2c",
      password: "password",
    };

    jest.spyOn(jwtService, "verifyToken").mockResolvedValue(jwtToken);
    jest
      .spyOn(hashService, "hashingPasswordAsync")
      .mockRejectedValue(new Error("hashing_error"));

    await expect(
      service.createChild(
        "thisIsAValidadeToken",
        user,
        "27bc9743-1923-4ade-b364-04a0805175c1"
      )
    ).rejects.toThrow(Error("hashing_error"));
  });

  test("should return an error when it try to create a child", async () => {
    const jwtToken = {
      profileId: "fcec55dc-9d24-4c0d-99ad-c99960660f2c",
      userId: "27bc9743-1923-4ade-b364-04a0805175c1",
    };

    const user = {
      userName: "UserNameOfTest",
      id: "27bc9743-1923-4ade-b364-04a0805175c1",
      name: "Name of test",
      profileId: "acec55dc-9d24-4c0d-99ad-c99960660f2c",
      password: "password",
    };

    const userChild = {
      id: "27bc9743-1923-4ade-b364-04a0805175c1",
      name: "Name of test",
      login: {
        userName: "UserNameOfTest",
        profile: {
          id: "fcec55dc-9d24-4c0d-99ad-c99960660f2c",
          description: "OWNER",
        },
      },
    };

    jest.spyOn(jwtService, "verifyToken").mockResolvedValue(jwtToken);
    jest
      .spyOn(hashService, "hashingPasswordAsync")
      .mockResolvedValue("PasswordHassing");
    jest
      .spyOn(client, "createUserChild")
      .mockRejectedValue(new Error("client_error"));

    await expect(
      service.createChild(
        "thisIsAValidadeToken",
        user,
        "27bc9743-1923-4ade-b364-04a0805175c1"
      )
    ).rejects.toThrow(Error("client_error"));
  });
});

describe("getProfile", () => {
  test("should return a profile given a profileId", async () => {
    const profile = {
      id: "fcec55dc-9d24-4c0d-99ad-c99960660f2c",
      description: "OWNER",
    };

    jest.spyOn(client, "getProfile").mockResolvedValue(profile);

    await expect(
      service.getProfile("fcec55dc-9d24-4c0d-99ad-c99960660f2c")
    ).resolves.toBe(profile);
  });

  test("should return an error when it try to invalid profile", async () => {
    jest
      .spyOn(client, "getProfile")
      .mockRejectedValue(new Error("client_error"));

    await expect(service.getProfile("invalid")).rejects.toThrow(
      Error("client_error")
    );
  });
});

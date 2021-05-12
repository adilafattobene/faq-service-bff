const client = require("./accountServiceClient");
const axios = require("axios");

var MockAdapter = require("axios-mock-adapter");

var mock = new MockAdapter(axios);

describe("getUser unit test", () => {
  afterEach(() => mock.resetHandlers());

  test("should return an user given an userId", async () => {
    const user = {
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

    mock
      .onGet("http://localhost:8080/user/27bc9743-1923-4ade-b364-04a0805175c1")
      .reply(200, { user: user });

    const response = await client.getUser(
      "27bc9743-1923-4ade-b364-04a0805175c1"
    );

    expect(response.user).toEqual(user);
  });

  test("should throw an error when accountService request fail", async () => {
    mock
      .onGet("http://localhost:8080/user/00000000-0000-0000-0000-000000000000")
      .reply(400);

    await expect(
      client.getUser("00000000-0000-0000-0000-000000000000")
    ).rejects.toThrow(Error);
  });
});

describe("getUsersById unit test", () => {
  afterEach(() => mock.resetHandlers());

  test("should return an user list given an userId", async () => {
    const user = [
      {
        id: "27bc9743-1923-4ade-b364-04a0805175c1",
        name: "teste post ownerrrrrr bff",
        login: {
          userName: "teste post ownerrrrrr bff",
          profile: {
            id: "fcec55dc-9d24-4c0d-99ad-c99960660f2c",
            description: "OWNER",
          },
        },
      },
    ];

    mock
      .onGet(
        "http://localhost:8080/user/27bc9743-1923-4ade-b364-04a0805175c1/users"
      )
      .reply(200, user);

    const response = await client.getUsersById(
      "27bc9743-1923-4ade-b364-04a0805175c1"
    );

    const userResponse = [
      {
        id: user[0].id,
        name: user[0].name,
        userName: user[0].login.userName,
        profile: user[0].login.profile.description,
      },
    ];

    expect(response).toEqual(userResponse);
  });

  test("should throw an error when accountService request fail", async () => {
    mock
      .onGet(
        "http://localhost:8080/user/00000000-0000-0000-0000-000000000000/users"
      )
      .reply(400);

    await expect(
      client.getUsersById("00000000-0000-0000-0000-000000000000")
    ).rejects.toThrow(Error);
  });
});

describe("getUserLoginByUserName unit test", () => {
  afterEach(() => mock.resetHandlers());

  test("should return an user login given an userName", async () => {
    const userLogin = {
      id: "92e4d6f9-2113-462e-bef2-eb373add5eca",
      password: "$2b$10$TGyYor9FNcqwJVTaFtpAEOCa6prwacfpCnwy/lhKX1aW.ClbU.cB6",
      userName: "UserNameofTest",
      profile: {
        id: "fcec55dc-9d24-4c0d-99ad-c99960660f2c",
        description: "OWNER",
      },
    };

    mock
      .onGet("http://localhost:8080/login/user?userName=UserNameofTest")
      .reply(200, { userLogin: userLogin });

    const response = await client.getUserLoginByUserName("UserNameofTest");

    expect(response.userLogin).toEqual(userLogin);
  });

  test("should throw an error when accountService request fail", async () => {
    mock
      .onGet("http://localhost:8080/login/user?userName=InvalidUserNameofTest")
      .reply(400);

    await expect(
      client.getUserLoginByUserName("InvalidUserNameofTest")
    ).rejects.toThrow(Error);
  });
});

describe("createUserChild unit test", () => {
  afterEach(() => mock.resetHandlers());
  test("should create an user child when it receive a userBody and given an userId", async () => {
    const user = {
      name: "teste criação filho",
      login: {
        userName: "criacaoFilho",
        password: "testeCriacaoFilho",
        profile: {
          id: "61cfce77-0e67-4a86-ba19-afe0c91eceb1",
        },
      },
    };
    const userResponse = {
      id: "27bc9743-1923-4ade-b364-04a0805175c1",
      name: "Name Of Test",
      login: {
        userName: "UserNameofTest",
        profile: {
          id: "fcec55dc-9d24-4c0d-99ad-c99960660f2c",
          description: "OWNER",
        },
      },
    };

    mock
      .onPost("http://localhost:8080/user/27bc9743-1923-4ade-b364-04a0805175c1")
      .reply(201, userResponse);

    const response = await client.createUserChild(
      "27bc9743-1923-4ade-b364-04a0805175c1",
      user
    );

    expect(response).toEqual(userResponse);
  });

  test("should throw an error when accountService request fail", async () => {
    const user = {
      name: "Name of test",
      companyName: "Companny name of test",
      password: "UserPasswordOfTest",
      userName: "UserNameOfTest",
    };

    mock
      .onPost("http://localhost:8080/user/00000000-0000-0000-0000-000000000000")
      .reply(400);

    await expect(
      client.createUserChild("00000000-0000-0000-0000-000000000000", user)
    ).rejects.toThrow(Error);
  });
});

describe("createUser unit test", () => {
  afterEach(() => mock.resetHandlers());
  test("should create an user when it receive a userBody and given an userId", async () => {
    const user = {
      name: "Name of test",
      login: {
        userName: "UserNameOfTest",
        password: "thisIsaGreatPassword",
      },
      company: {
        name: "teste post ownerrrrrr bff",
      },
    };

    const userResponse = {
      id: "27bc9743-1923-4ade-b364-04a0805175c1",
      name: "Name Of Test",
      login: {
        userName: "UserNameofTest",
        profile: {
          id: "fcec55dc-9d24-4c0d-99ad-c99960660f2c",
          description: "OWNER",
        },
      },
    };

    mock.onPost("http://localhost:8080/user").reply(400);

    await expect(client.createUser(user)).rejects.toThrow(Error);
  });
});

describe("getProfile unit test", () => {
  afterEach(() => mock.resetHandlers());

  test("should return a profile given a profileId", async () => {
    const profile = {
      id: "fcec55dc-9d24-4c0d-99ad-c99960660f2c",
      description: "OWNER",
    };

    mock
      .onGet(
        "http://localhost:8080/profile/27bc9743-1923-4ade-b364-04a0805175c1"
      )
      .reply(200, profile);

    const response = await client.getProfile(
      "27bc9743-1923-4ade-b364-04a0805175c1"
    );

    expect(response).toEqual(profile);
  });

  test("should throw an error when accountService request fail", async () => {
    mock
      .onGet(
        "http://localhost:8080/profile/00000000-0000-0000-0000-000000000000"
      )
      .reply(400);

    await expect(
      client.getProfile("00000000-0000-0000-0000-000000000000")
    ).rejects.toThrow(Error);
  });
});

describe("getProfiles unit test", () => {
  afterEach(() => mock.resetHandlers());

  test("should return a profile list", async () => {
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

    mock.onGet("http://localhost:8080/profile").reply(200, profiles);

    const response = await client.getProfiles();

    expect(response).toEqual(profiles);
  });

  test("should throw an error when accountService request fail", async () => {
    mock.onGet("http://localhost:8080/profiles").reply(400);

    await expect(client.getProfiles()).rejects.toThrow(Error);
  });
});

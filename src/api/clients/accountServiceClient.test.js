const client = require("./accountServiceClient");
const axios = require("axios");

var MockAdapter = require("axios-mock-adapter");

var mock = new MockAdapter(axios);

describe("getUser unit test", () => {
  afterEach(() => mock.resetHandlers());

  test("should return an user given an userId", async () => {
    const user = {
      id: "27bc9743-1923-4ade-b364-04a0805175c1",
      name: "teste post ownerrrrrr bff",
      company: {
        id: "27bc9743-1923-4ade-b364-04a0805175c1",
        name: "teste post ownerrrrrr bff",
      },
    };

    //TODO
  });

  test("should throw an error when accountService request fail", async () => {
    //TODO
  });
});

describe("getUsersById unit test", () => {
  afterEach(() => mock.resetHandlers());

  test("should return an user list given an userId", async () => {
    const users = [
      {
        id: "458c9743-1923-4ade-b364-04a0805458pi",
        name: "teste post ownerrrrrr bff",
        company: {
          id: "27bc9743-1923-4ade-b364-04a0805175c1",
          name: "teste post ownerrrrrr bff",
        },
      },
    ];

    //TODO
  });

  test("should throw an error when accountService request fail", async () => {
    //TODO
  });
});

describe("createUserChild unit test", () => {
  afterEach(() => mock.resetHandlers());

  test("should return an user when it receive a userBody and given a n userId", async () => {
    const user = {
      id: "27bc9743-1923-4ade-b364-04a0805175c1",
      name: "teste post ownerrrrrr bff",
      company: {
        id: "27bc9743-1923-4ade-b364-04a0805175c1",
        name: "teste post ownerrrrrr bff",
      },
    };

    //TODO
  });

  test("should throw an error when accountService request fail", async () => {
    //TODO
  });
});

describe("createUser unit test", () => {
  afterEach(() => mock.resetHandlers());

  test("should return an user when it receive a userBody", async () => {
    const user = {
      id: "27bc9743-1923-4ade-b364-04a0805175c1",
      name: "teste post ownerrrrrr bff",
      company: {
        id: "27bc9743-1923-4ade-b364-04a0805175c1",
        name: "teste post ownerrrrrr bff",
      },
    };

    //TODO
  });

  test("should throw an error when accountService request fail", async () => {
    //TODO
  });
});

describe("changeUser unit test", () => {
  afterEach(() => mock.resetHandlers());

  test("should return an user when it receive a user to change it", async () => {
    const user = {
      id: "27bc9743-1923-4ade-b364-04a0805175c1",
      name: "teste post ownerrrrrr bff",
      company: {
        id: "27bc9743-1923-4ade-b364-04a0805175c1",
        name: "teste post ownerrrrrr bff",
      },
    };

    //TODO
  });

  test("should throw an error when accountService request fail", async () => {
    //TODO
  });
});

describe("getProfile unit test", () => {
  afterEach(() => mock.resetHandlers());

  test("should return a profile given a profileId", async () => {
    const profile = {
      id: "fcec55dc-9d24-4c0d-99ad-c99960660f2c",
      description: "OWNER",
    };

    //TODO
  });

  test("should throw an error when accountService request fail", async () => {
    //TODO
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

    //TODO
  });

  test("should throw an error when accountService request fail", async () => {
    //TODO
  });
});


describe("getUserLoginByUserName unit test", () => {
  afterEach(() => mock.resetHandlers());

  test("should return an user login given an userName", async () => {
    const userLogin = {
      id: "92e4d6f9-2113-462e-bef2-eb373add5eca",
      password: "$2b$10$TGyYor9FNcqwJVTaFtpAEOCa6prwacfpCnwy/lhKX1aW.ClbU.cB6",
      userName: "teste_criação_dsfdsaddf",
      profile: {
        id: "fcec55dc-9d24-4c0d-99ad-c99960660f2c",
        description: "OWNER",
      },
    };

    //TODO
  });

  test("should throw an error when accountService request fail", async () => {
    //TODO
  });
});

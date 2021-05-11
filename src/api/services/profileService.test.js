const client = require("../clients/accountServiceClient");
const jwtService = require("./jwtService");
const service = require("./profileService");

describe("getProfiles unit tests", () => {
  test("should return a profile list", async () => {
    const jwtToken = {
      profileId: "fcec55dc-9d24-4c0d-99ad-c99960660f2c",
      userId: "userId",
    };

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

    jest.spyOn(jwtService, "verifyToken").mockResolvedValue(jwtToken);
    jest.spyOn(client, "getProfiles").mockResolvedValue(profiles);

    await expect(service.getProfiles("thisIsAValidadeToken")).resolves.toBe(
      profiles
    );
  });

  test("should return an not_authorized error when token has invalid profile", async () => {
    const jwtToken = {
      profileId: "other_token",
      userId: "userId",
    };

    jest.spyOn(jwtService, "verifyToken").mockResolvedValue(jwtToken);

    await expect(service.getProfiles("thisIsAValidadeToken")).rejects.toThrow(
      Error("not_authorized")
    );
  });

  test("should return an not_authorized error when jtw verify returns error", async () => {
    jest
      .spyOn(jwtService, "verifyToken")
      .mockRejectedValue(new Error("one jwt_error"));

    await expect(service.getProfiles("thisIsAValidadeToken")).rejects.toThrow(
      Error
    );
  });

  test("should return an not_authorized error when client request return an error", async () => {
    const a = {
      profileId: "fcec55dc-9d24-4c0d-99ad-c99960660f2c",
      userId: "userId",
    };

    jest.spyOn(jwtService, "verifyToken").mockResolvedValue(a);
    jest
      .spyOn(client, "getProfiles")
      .mockRejectedValue(new Error("one client_error"));

    await expect(service.getProfiles("thisIsAValidadeToken")).rejects.toThrow(
      Error
    );
  });
});

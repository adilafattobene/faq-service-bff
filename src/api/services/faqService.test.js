const cmsClient = require("../clients/cmsServiceClient");
const jwtService = require("./jwtService");
const userService = require("./userService");
const service = require("./faqService");

describe("getFaqs unit tests", () => {
  test("should return a faq list when it does not receive a token", async () => {
    const faqs = [
      {
        id: 1,
        slug: "como-se-cadastrar",
        title: "Como se cadastrar",
        subtitle: null,
        content: "Isso ai",
        active: true,
        type: "public",
        createdAt: null,
        modifiedAt: null,
        user: null,
        published_at: "2021-04-06T22:43:13.610Z",
        created_at: "2021-04-06T22:43:09.919Z",
        updated_at: "2021-04-06T22:43:13.665Z",
        created_for: null,
      },
    ];

    jest.spyOn(cmsClient, "getFaqs").mockResolvedValue(faqs);

    await expect(service.getFaqs(undefined)).resolves.toBe(faqs);
  });

  test("should return a faq list when it receive a token", async () => {
    const jwtToken = {
      profileId: "fcec55dc-9d24-4c0d-99ad-c99960660f2c",
      userId: "userId",
    };

    const profile = {
      id: "fcec55dc-9d24-4c0d-99ad-c99960660f2c",
      description: "OWNER",
    };

    const faqs = [
      {
        id: 1,
        slug: "como-se-cadastrar",
        title: "Como se cadastrar",
        subtitle: null,
        content: "Isso ai",
        active: true,
        type: "owner",
        createdAt: null,
        modifiedAt: null,
        user: null,
        published_at: "2021-04-06T22:43:13.610Z",
        created_at: "2021-04-06T22:43:09.919Z",
        updated_at: "2021-04-06T22:43:13.665Z",
        created_for: null,
      },
    ];

    jest.spyOn(jwtService, "verifyToken").mockResolvedValue(jwtToken);
    jest.spyOn(userService, "getProfile").mockResolvedValue(profile);
    jest.spyOn(cmsClient, "getFaqs").mockResolvedValue(faqs);

    await expect(service.getFaqs("thisIsAValidadeToken")).resolves.toBe(faqs);
  });

  test("should return an error when verify token fails", async () => {
    jest
      .spyOn(jwtService, "verifyToken")
      .mockRejectedValue(new Error("a jwt_error"));

    await expect(service.getFaqs("thisIsAValidadeToken")).rejects.toThrow(
      Error
    );
  });

  test("should return an error when userService fails", async () => {
    const jwtToken = {
      profileId: "fcec55dc-9d24-4c0d-99ad-c99960660f2c",
      userId: "userId",
    };

    jest.spyOn(jwtService, "verifyToken").mockResolvedValue(jwtToken);
    jest
      .spyOn(userService, "getProfile")
      .mockRejectedValue(new Error("an user_service error"));

    await expect(service.getFaqs("thisIsAValidadeToken")).rejects.toThrow(
      Error
    );
  });

  test("should return an error when client request fails", async () => {
    const jwtToken = {
      profileId: "fcec55dc-9d24-4c0d-99ad-c99960660f2c",
      userId: "userId",
    };

    const faqs = [
      {
        id: 1,
        slug: "como-se-cadastrar",
        title: "Como se cadastrar",
        subtitle: null,
        content: "Isso ai",
        active: true,
        type: "owner",
        createdAt: null,
        modifiedAt: null,
        user: null,
        published_at: "2021-04-06T22:43:13.610Z",
        created_at: "2021-04-06T22:43:09.919Z",
        updated_at: "2021-04-06T22:43:13.665Z",
        created_for: null,
      },
    ];

    jest.spyOn(jwtService, "verifyToken").mockResolvedValue(jwtToken);
    jest.spyOn(userService, "getProfile").mockResolvedValue(faqs);
    jest
      .spyOn(cmsClient, "getFaqs")
      .mockRejectedValue(new Error("a cms_client_error error"));

    await expect(service.getFaqs("thisIsAValidadeToken")).rejects.toThrow(
      Error
    );
  });
});

describe("getFaqBySlug unit tests", () => {
  test("should return a faq when it receives a slug but does not receive a token", async () => {
    const faq = {
      id: 1,
      slug: "como-se-cadastrar",
      title: "Como se cadastrar",
      subtitle: null,
      content: "Isso ai",
      active: true,
      type: "public",
      createdAt: null,
      modifiedAt: null,
      user: null,
      published_at: "2021-04-06T22:43:13.610Z",
      created_at: "2021-04-06T22:43:09.919Z",
      updated_at: "2021-04-06T22:43:13.665Z",
      created_for: null,
    };

    jest.spyOn(cmsClient, "getFaqBySlug").mockResolvedValue(faq);

    await expect(
      service.getFaqBySlug(undefined, "como-se-cadastrar")
    ).resolves.toBe(faq);
  });

  test("should return a faq list when it receives a slug and token", async () => {
    const jwtToken = {
      profileId: "fcec55dc-9d24-4c0d-99ad-c99960660f2c",
      userId: "userId",
    };

    const profile = {
      id: "fcec55dc-9d24-4c0d-99ad-c99960660f2c",
      description: "OWNER",
    };

    const faq = {
      id: 1,
      slug: "como-se-cadastrar",
      title: "Como se cadastrar",
      subtitle: null,
      content: "Isso ai",
      active: true,
      type: "owner",
      createdAt: null,
      modifiedAt: null,
      user: null,
      published_at: "2021-04-06T22:43:13.610Z",
      created_at: "2021-04-06T22:43:09.919Z",
      updated_at: "2021-04-06T22:43:13.665Z",
      created_for: null,
    };
    jest.spyOn(jwtService, "verifyToken").mockResolvedValue(jwtToken);
    jest.spyOn(userService, "getProfile").mockResolvedValue(profile);
    jest.spyOn(cmsClient, "getFaqBySlug").mockResolvedValue(faq);

    await expect(
      service.getFaqBySlug("thisIsAValidadeToken", "como-se-cadastrar")
    ).resolves.toBe(faq);
  });

  test("should return an error when verify token fails", async () => {
    jest
      .spyOn(jwtService, "verifyToken")
      .mockRejectedValue(new Error("a jwt_error"));

    await expect(
      service.getFaqBySlug("thisIsAValidadeToken", "como-se-cadastrar")
    ).rejects.toThrow(Error);
  });

  test("should return an error when userService fails", async () => {
    const jwtToken = {
      profileId: "fcec55dc-9d24-4c0d-99ad-c99960660f2c",
      userId: "userId",
    };

    jest.spyOn(jwtService, "verifyToken").mockResolvedValue(jwtToken);
    jest
      .spyOn(userService, "getProfile")
      .mockRejectedValue(new Error("an user_service error"));

    await expect(
      service.getFaqBySlug("thisIsAValidadeToken", "como-se-cadastrar")
    ).rejects.toThrow(Error);
  });

  test("should return an error when client request fails", async () => {
    const jwtToken = {
      profileId: "fcec55dc-9d24-4c0d-99ad-c99960660f2c",
      userId: "userId",
    };

    const faq = {
      id: 1,
      slug: "como-se-cadastrar",
      title: "Como se cadastrar",
      subtitle: null,
      content: "Isso ai",
      active: true,
      type: "owner",
      createdAt: null,
      modifiedAt: null,
      user: null,
      published_at: "2021-04-06T22:43:13.610Z",
      created_at: "2021-04-06T22:43:09.919Z",
      updated_at: "2021-04-06T22:43:13.665Z",
      created_for: null,
    };

    jest.spyOn(jwtService, "verifyToken").mockResolvedValue(jwtToken);
    jest.spyOn(userService, "getProfile").mockResolvedValue(faq);
    jest
      .spyOn(cmsClient, "getFaqBySlug")
      .mockRejectedValue(new Error("a cms_client_error error"));

    await expect(
      service.getFaqBySlug("thisIsAValidadeToken", "como-se-cadastrar")
    ).rejects.toThrow(Error);
  });

  test("should return an error when it does not receive a slug", async () => {
    await expect(
      service.getFaqBySlug("thisIsAValidadeToken", undefined)
    ).rejects.toThrow(Error("slug_required"));
  });
});

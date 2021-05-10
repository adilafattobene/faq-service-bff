const controller = require("./faqController");

const service = require("../services/faqService");

describe("getFaq unit test", () => {
  test("should return 200", async () => {
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

    jest.spyOn(service, "getFaqs").mockResolvedValue(faqs);

    const res = {};
    res.send = jest.fn().mockReturnValue(res);
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn();

    await controller.getFaqs(
      { headers: { "x-access-token": "blabla" } },
      res
    );

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(faqs);
  });

  test("should return 404", async () => {
    jest.spyOn(service, "getFaqs").mockRejectedValue(new Error("NotFound"));

    const res = {};
    res.send = jest.fn().mockReturnValue(res);
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);

    await controller.getFaqs(
      { headers: { "x-access-token": "blabla" } },
      res
    );

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "FAQ not found." });
  });

  test("should return 500", async () => {
    jest.spyOn(service, "getFaqs").mockRejectedValue(new Error("OtherError"));

    const res = {};
    res.send = jest.fn().mockReturnValue(res);
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);

    await controller.getFaqs(
      { headers: { "x-access-token": "blabla" } },
      res
    );

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "Something is wrong - FAQ not found.",
    });
  });
});

describe("getFaqBySlug unit test", () => {
  test("should return 200", async () => {
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

    jest.spyOn(service, "getFaqBySlug").mockResolvedValue(faq);

    const res = {};
    res.send = jest.fn().mockReturnValue(res);
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn();

    await controller.getFaqBySlug(
      {
        headers: { "x-access-token": "blabla" },
        params: { slug: "como-se-cadastrar" },
      },
      res
    );

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(faq);
  });

  test("should return 404", async () => {
    jest
      .spyOn(service, "getFaqBySlug")
      .mockRejectedValue(new Error("NotFound"));

    const res = {};
    res.send = jest.fn().mockReturnValue(res);
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);

    await controller.getFaqBySlug(
      {
        headers: { "x-access-token": "blabla" },
        params: { slug: "como-se-cadastrar" },
      },
      res
    );

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "FAQ not found." });
  });

  test("should return 500", async () => {
    jest
      .spyOn(service, "getFaqBySlug")
      .mockRejectedValue(new Error("OtherError"));

    const res = {};
    res.send = jest.fn().mockReturnValue(res);
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);

    await controller.getFaqBySlug(
      {
        headers: { "x-access-token": "blabla" },
        params: { slug: "como-se-cadastrar" },
      },
      res
    );

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "Something is wrong - FAQ not found.",
    });
  });
});

const client = require("./cmsServiceClient");
const axios = require("axios");

var MockAdapter = require("axios-mock-adapter");

// This sets the mock adapter on the default instance
var mock = new MockAdapter(axios);

describe("getFaqs unit tests", () => {
  afterEach(() => mock.resetHandlers());

  test("should return all faqs when it receive a profile", async () => {
    const faqs = [
      {
        id: 1,
        slug: "como-se-cadastrastra",
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

    mock.onGet("http://localhost:1337/faqs?type=PUBLIC").reply(200, {
      faqs: faqs,
    });

    const a = await client.getFaqs("public");

    expect(a.faqs).toEqual(faqs);
  });

  test("should throw an error when cms request fail", async () => {
    mock.onGet("http://localhost:1337/faqs?type=PUBLIC").reply(400);

    await expect(client.getFaqs("public")).rejects.toThrow(Error);
  });
});

describe("getFaqById unit tests", () => {
  afterEach(() => mock.resetHandlers());

  test("should return a faq when it receive a slug", async () => {
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

    mock
      .onGet("http://localhost:1337/faqs?type=PUBLIC&slug=como-se-cadastrar")
      .reply(200, {
        faq: faq,
      });

    const response = await client.getFaqBySlug("public", "como-se-cadastrar");

    expect(response.faq).toEqual(faq);
  });

  test("should throw an error when cms request fail", async () => {
    mock
      .onGet("http://localhost:1337/faqs?type=PUBLIC&slug=como-se-cadastrar")
      .reply(400);

    await expect(
      client.getFaqBySlug("public", "como-se-cadastrar")
    ).rejects.toThrow(Error);
  });
});

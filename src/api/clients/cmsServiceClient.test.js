const client = require("./cmsServiceClient");
const axios = require("axios");

var MockAdapter = require("axios-mock-adapter");

// This sets the mock adapter on the default instance
var mock = new MockAdapter(axios);

describe("get faqs unit tests", () => {
  afterEach(() => mock.resetHandlers());

  test("get user should return a user when it receive a userId", async () => {
    // Mock any GET request
    // arguments for reply are (status, data, headers)
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

    mock.onGet("http://localhost:1337/faqs?type=public").reply(200, {
      faqs: faqs,
    });

    const a = await client.getFaq("public");

    expect(a.faqs).toEqual(faqs);
  });
});
